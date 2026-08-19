// Long Chau Care — Firebase Functions: OCR via Cloud Vision
const functions = require("firebase-functions");
const express = require("express");
const Busboy = require("busboy");
const cors = require("cors");
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

// ─── Multipart parser (busboy trực tiếp — tránh conflict với Firebase rawBody) ──

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    let fileBuffer = null;
    const fields = {};

    busboy.on("file", (_fieldname, stream) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => { fileBuffer = Buffer.concat(chunks); });
    });
    busboy.on("field", (name, val) => { fields[name] = val; });
    busboy.on("finish", () => resolve({ fileBuffer, fields }));
    busboy.on("error", reject);

    // Firebase Gen1 đã buffer body vào req.rawBody
    if (req.rawBody) {
      busboy.end(req.rawBody);
    } else {
      req.pipe(busboy);
    }
  });
}

// ─── Express Apps ──────────────────────────────────────────────────────

const ocrApp = express();
ocrApp.use(cors({ origin: true }));

ocrApp.post("/", async (req, res) => {
  try {
    const { fileBuffer, fields } = await parseMultipart(req);
    if (!fileBuffer) return res.status(400).json({ error: "Missing file" });

    const docType = fields.doc_type || "prescription";

    // Run Cloud Vision
    const [result] = await client.documentTextDetection({ image: { content: fileBuffer } });
    const annotation = result.fullTextAnnotation;
    const fullText = annotation ? annotation.text : "";

    let confSum = 0, blockCount = 0;
    if (annotation) {
      for (const page of annotation.pages || []) {
        for (const block of page.blocks || []) {
          if (block.confidence) { confSum += block.confidence; blockCount++; }
        }
      }
    }
    const confidence = blockCount > 0 ? Math.round((confSum / blockCount) * 100) / 100 : 0;

    const medications = extractMedications(fullText);
    const metrics = extractMetrics(fullText);
    const patientName = extractPatientName(fullText);
    const doctorName = extractDoctorName(fullText);
    const date = extractDate(fullText);

    return res.json({
      doc_type: docType,
      raw_text: fullText,
      confidence,
      medications,
      metrics,
      patient_name: patientName,
      doctor_name: doctorName,
      date,
    });
  } catch (err) {
    console.error("OCR error:", err);
    return res.status(500).json({ error: err.message });
  }
});

const aiApp = express();
aiApp.use(cors({ origin: true }));
aiApp.use(express.json());

aiApp.post("/", (req, res) => {
  try {
    const { doc_type_label, raw_text, medications, metrics } = req.body || {};
    const summary = buildSummary(doc_type_label, raw_text || "", medications || [], metrics || {});
    return res.json({ text: summary, safe: true });
  } catch (err) {
    console.error("AI summary error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── Export ────────────────────────────────────────────────────────────

exports.ocrUpload = functions.https.onRequest(ocrApp);
exports.aiSummary = functions.https.onRequest(aiApp);

// ─── Helpers ──────────────────────────────────────────────────────────

function buildSummary(docLabel, text, meds, metrics) {
  let summary = `📋 Đã xem xong ${docLabel || "giấy tờ"} của bạn. `;
  if (meds.length > 0) {
    const names = meds.map(m => m.name || m).filter(Boolean).join(", ");
    if (names) summary += `Tìm thấy ${meds.length} thuốc: ${names}. `;
  }
  const metricKeys = Object.keys(metrics || {});
  if (metricKeys.length > 0) {
    const str = metricKeys.map(k => `${k}: ${metrics[k]}`).join(", ");
    summary += `📊 Chỉ số: ${str}. `;
  }
  summary += "Dược sĩ sẽ xem xét và tư vấn thêm cho bạn.";
  return summary;
}

function extractMedications(text) {
  const meds = [];
  const pattern = /([A-Z][a-z]+(?:[\s/][A-Z][a-z]+)*\s+\d+\s*(?:mg|g|mcg|ml|IU))/gi;
  const matches = [...text.matchAll(pattern)].slice(0, 5);
  for (const match of matches) {
    const name = match[1].trim();
    const med = { name };
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const doseMatch = text.match(new RegExp(escaped + `[.\\s]*(\\d+)\\s*(viên|gói|ống|ml|capsule|tablet)`));
    if (doseMatch) med.dosage = `${doseMatch[1]} ${doseMatch[2]}`;
    if (new RegExp(escaped + ".*?(sáng|trưa|tối|chiều)", "i").test(text)) {
      med.frequency = /tối/i.test(text) && /sáng/i.test(text) ? "Sáng & Tối" : "Sáng";
    }
    if (/sau ăn/i.test(text)) med.instruction = "Sau ăn";
    else if (/trước ăn/i.test(text)) med.instruction = "Trước ăn";
    else if (/trong bữa/i.test(text) || /trong ăn/i.test(text)) med.instruction = "Trong bữa ăn";
    meds.push(med);
  }
  return meds;
}

function extractMetrics(text) {
  const m = {};
  const patterns = {
    "HbA1c": /HbA1c[:\s]*(\d+\.?\d*\s*%?)/i,
    "HA_tam_thu": /(?:HA|huyết\s*áp)[:\s]*(\d{2,3})\s*\/\s*\d{2,3}/i,
    "HA_tam_truong": /(?:HA|huyết\s*áp)[:\s]*\d{2,3}\s*\/\s*(\d{2,3})/i,
    "glucose": /(?:glucose|đường\s*huyết)[:\s]*(\d+\.?\d*)/i,
    "cholesterol": /(?:cholesterol|mỡ\s*máu)[:\s]*(\d+\.?\d*)/i,
  };
  for (const [k, p] of Object.entries(patterns)) {
    const match = text.match(p);
    if (match) m[k] = match[1].trim();
  }
  return m;
}

function extractPatientName(text) {
  const patterns = [
    /(?:Họ\s*và\s*tên|Họ\s*tên|Bệnh\s*nhân|Khách\s*hàng)[:\s]+([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)?)/,
    /([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)\s+(?:sinh|năm|tuổi|nam|nữ)/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  return null;
}

function extractDoctorName(text) {
  const patterns = [
    /(?:BS|Bác\s*sĩ|Doctor|Dr)[.:\s]*([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)?)/,
    /([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)\s*(?:BS|Bác\s*sĩ)/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  return null;
}

function extractDate(text) {
  const m = text.match(/\d{1,2}[/-]\d{1,2}[/-]\d{4}/);
  return m ? m[0] : null;
}
