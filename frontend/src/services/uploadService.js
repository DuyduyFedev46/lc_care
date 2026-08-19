// Upload Service — Gọi Cloud Run backend (OCR + AI summary)
import i18n from "../i18n";
const API_BASE = "https://lc-care-api-675411800433.asia-southeast1.run.app/api";

const DOC_TYPES = {
  rx: "prescription",
  lab: "lab_result",
  book: "medical_book",
  echo: "ultrasound",
  vacc: "vaccination",
};

const DOC_TYPE_LABELS = {
  rx: "Đơn thuốc",
  lab: "Kết quả xét nghiệm",
  book: "Sổ khám bệnh",
  echo: "Giấy siêu âm",
  vacc: "Sổ tiêm chủng",
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadDocument(file, docTypeId) {
  const base64 = await fileToBase64(file);

  const res = await fetch(`${API_BASE}/ai/ocr-extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      docType: DOC_TYPES[docTypeId] || "prescription",
      image: base64,
      lang: i18n.language || "vi",
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Upload failed: ${res.status}`);
  }
  const data = await res.json();
  // Normalize response to match expected shape
  return {
    raw_text: data.text || "",
    medications: data.medications || [],
    metrics: data.metrics || {},
  };
}

export async function getAISummary(ocrResult, docTypeId) {
  const res = await fetch(`${API_BASE}/ai/ocr-summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      doc_type: DOC_TYPES[docTypeId] || "prescription",
      doc_type_label: DOC_TYPE_LABELS[docTypeId] || "Giấy tờ",
      raw_text: ocrResult.raw_text || "",
      medications: ocrResult.medications || [],
      metrics: ocrResult.metrics || {},
      lang: i18n.language || "vi",
    }),
  });
  if (!res.ok) throw new Error(`AI summary failed: ${res.status}`);
  const data = await res.json();
  return data.text;
}
