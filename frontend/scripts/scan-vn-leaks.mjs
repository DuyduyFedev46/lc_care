#!/usr/bin/env node
// scan-vn-leaks.mjs — CI gate cho yêu cầu "ZERO rò rỉ tiếng Việt" trên bản JP.
//
// Quét 2 loại:
//   1) HARD GATE (exit 1): value trong locales/ja.json còn ký tự tiếng Việt
//      → entry chưa dịch, CHẮC CHẮN lộ chữ Việt trên giao diện JP. Tín hiệu tin cậy 100%.
//   2) ADVISORY (không fail): chuỗi tiếng Việt hardcode trong source (src/**, trừ locales/).
//      Đây là danh sách rà soát — nhưng KHÔNG fail build vì phần lớn là:
//        · dữ liệu VI-fallback trong config (constants.js plants…) đã được t() che bằng defaultValue,
//        · nửa tiếng Việt hợp lệ của app song ngữ.
//      Không thể tĩnh-xác định chuỗi nào thực sự render → chỉ liệt kê để con người soi.
//
// Ký tự comment được bỏ qua (state machine tôn trọng string/template literal).
// Brand "Long Châu" + allowlist được loại trước khi đối chiếu.
//
// Dùng: node scripts/scan-vn-leaks.mjs    (exit 1 nếu ja.json còn tiếng Việt)

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");
const JA_JSON = join(SRC, "locales", "ja.json");

// Ký tự đặc trưng tiếng Việt (precomposed + combining), không xuất hiện trong romaji Nhật.
const VN_CHARS =
  "đĐ" +
  "ăĂâÂêÊôÔơƠưƯ" +
  "ĩĨũŨ" +
  "àáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ".toUpperCase() +
  "àáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ" +
  "Ạ-ỿ" + // Latin Extended Additional (toàn bộ tổ hợp dấu tiếng Việt)
  "̣̀́̃̉"; // dấu kết hợp (NFD)
const VN_RE = new RegExp(`[${VN_CHARS}]`);

// Cụm giữ nguyên tiếng Việt theo quyết định scope (loại trước khi quét).
const ALLOWLIST = [
  "Long Châu", // brand, dùng khắp nơi
  "Châu", // phần brand
  "Tiếng Việt", // endonym trong language switcher (cố ý, giống 日本語)
  "VNeID",
  "Bộ Y tế",
  "Trạm y tế",
];

function stripAllowlist(s) {
  let out = s;
  for (const a of ALLOWLIST) out = out.split(a).join("");
  return out;
}

// Trả về bản "code-only": ký tự comment được thay bằng space (giữ nguyên cột & dòng).
// String / template literal được GIỮ vì chuỗi VN hardcode chính là rò rỉ ta muốn bắt.
function blankComments(code) {
  let out = "";
  let state = "normal"; // normal | line | block | sq | dq | tpl
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const n = code[i + 1];
    const prev = code[i - 1];
    if (state === "normal") {
      if (c === "/" && n === "/") { state = "line"; out += "  "; i++; continue; }
      if (c === "/" && n === "*") { state = "block"; out += "  "; i++; continue; }
      if (c === "'") { state = "sq"; out += c; continue; }
      if (c === '"') { state = "dq"; out += c; continue; }
      if (c === "`") { state = "tpl"; out += c; continue; }
      out += c; continue;
    }
    if (state === "line") {
      if (c === "\n") { state = "normal"; out += c; } else out += c === "\t" ? "\t" : " ";
      continue;
    }
    if (state === "block") {
      if (c === "*" && n === "/") { state = "normal"; out += "  "; i++; }
      else out += c === "\n" ? "\n" : c === "\t" ? "\t" : " ";
      continue;
    }
    if (state === "sq") { out += c; if (c === "'" && prev !== "\\") state = "normal"; continue; }
    if (state === "dq") { out += c; if (c === '"' && prev !== "\\") state = "normal"; continue; }
    if (state === "tpl") { out += c; if (c === "`" && prev !== "\\") state = "normal"; continue; }
  }
  return out;
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "locales" || name === "node_modules") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if ([".js", ".jsx"].includes(extname(name))) acc.push(p);
  }
  return acc;
}

// Thuộc tính a11y (không hiển thị bằng mắt — chỉ screen reader). Tách riêng để ưu tiên thấp hơn.
const A11Y_RE = /\b(aria-label|alt|title|placeholder)\s*=/;

// ── Check 1: hardcode VN trong source ──
const sourceLeaks = []; // hiển thị bằng mắt — ưu tiên cao
const a11yLeaks = []; // aria-label/alt/title — không hiển thị bằng mắt
for (const file of walk(SRC)) {
  const code = blankComments(readFileSync(file, "utf8"));
  code.split("\n").forEach((line, idx) => {
    const cleaned = stripAllowlist(line);
    if (!VN_RE.test(cleaned)) return;
    const entry = { file: relative(ROOT, file), line: idx + 1, text: line.trim().slice(0, 120) };
    (A11Y_RE.test(line) ? a11yLeaks : sourceLeaks).push(entry);
  });
}

// ── Check 2: value tiếng Việt còn sót trong ja.json ──
const jaLeaks = [];
const ja = JSON.parse(readFileSync(JA_JSON, "utf8"));
for (const [key, val] of Object.entries(ja)) {
  if (typeof val !== "string") continue;
  if (VN_RE.test(stripAllowlist(val))) jaLeaks.push({ key, val: val.slice(0, 120) });
}

// ── Report ──
const RED = "\x1b[31m", GREEN = "\x1b[32m", YEL = "\x1b[33m", DIM = "\x1b[2m", RST = "\x1b[0m";
let failed = false;

// HARD GATE — ja.json VN
if (jaLeaks.length) {
  failed = true;
  console.log(`\n${RED}✗ [HARD] ${jaLeaks.length} entry trong ja.json còn ký tự tiếng Việt (chưa dịch):${RST}`);
  for (const l of jaLeaks) console.log(`  ${YEL}${l.key}${RST} = ${DIM}${l.val}${RST}`);
} else {
  console.log(`${GREEN}✓ [HARD] Mọi value trong ja.json đã sạch tiếng Việt.${RST}`);
}

// ADVISORY — source VN (không fail build)
const advisoryCount = sourceLeaks.length + a11yLeaks.length;
console.log(`\n${YEL}⚠ [ADVISORY] ${advisoryCount} chuỗi tiếng Việt trong source — soi tay (KHÔNG fail build):${RST}`);
console.log(`${DIM}  ${sourceLeaks.length} hiển thị + ${a11yLeaks.length} a11y. Phần lớn là VI-fallback đã được t() che,${RST}`);
console.log(`${DIM}  hoặc màn phụ ngoài luồng demo (Pharmacist/OrderFor/Calendar). Chạy với --verbose để xem chi tiết.${RST}`);
if (process.argv.includes("--verbose")) {
  for (const l of sourceLeaks) console.log(`  ${YEL}${l.file}:${l.line}${RST}  ${DIM}${l.text}${RST}`);
  for (const l of a11yLeaks) console.log(`  ${DIM}${l.file}:${l.line}  [a11y] ${l.text}${RST}`);
}

console.log();
if (failed) {
  console.log(`${RED}FAIL — ja.json còn tiếng Việt. Dịch hết trước khi demo JP.${RST}`);
  process.exit(1);
} else {
  console.log(`${GREEN}PASS — ja.json sạch tiếng Việt. (${advisoryCount} mục advisory để soi tay.)${RST}`);
}
