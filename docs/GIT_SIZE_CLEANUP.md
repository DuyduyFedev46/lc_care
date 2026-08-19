# Git Size Cleanup — 2026-08-20

## Kết quả

| Chỉ số | Trước | Sau |
|---|---|---|
| Kích thước `.git` | 223 MB | **1.7 MB** |
| Số commit | 68 | 1 (`f0f159d`) |
| File trong tree | ~350 | 300 |

## Đã làm gì

1. **Untrack toàn bộ assets + file thuyết trình** (giữ nguyên trên ổ đĩa, chỉ bỏ khỏi git):
   - `frontend/public/assets/` (~66 MB)
   - `docs/assets/` (~4.5 MB)
   - `Long Chau Care .pptx` (28.9 MB, ở gốc repo)
   - `preBodFeedback/Trang chủ.png` (20.6 MB)
   - `preBodFeedback/LC-Gamification-Vun-cay-vuon-khoe.pptx` (5.1 MB)
   - `preBodFeedback/*_files/`, `~$*` (lock file Office)
2. **Backup trước khi untrack**: `~/Downloads/lc_care_assets_backup.zip` (120 MB)
   — chứa đủ assets + 3 file thuyết trình.
3. **Squash 68 commits → 1 commit** (checkout --orphan) — pack lịch sử 167 MB chứa
   toàn bộ phiên bản ảnh cũ, giữ lịch sử thì không thể <100 MB.
4. `git reflog expire --expire=now --all && git gc --prune=now --aggressive`

## Bẫy đã gặp (để lần sau không mắc)

- **`refs/remotes/origin/main` giữ lịch sử cũ**: remote-tracking ref vẫn trỏ commit cũ
  nên `git gc` không prune được gì. Phải `git update-ref -d refs/remotes/origin/main`
  trước khi gc.
- **Không dùng dấu ngoặc kép trong `.gitignore`** — gitignore không hiểu quotes,
  pattern `"Long Chau Care .pptx"` khớp tên file có cả dấu nháy, không khớp file thật.
  Tên file có dấu cách cứ viết trần.
- **`git check-ignore` mặc định bỏ qua file đang tracked** — dùng `--no-index` để test pattern.

## Lưu ý cho tương lai

- Clone repo từ GitHub sẽ **không có assets** — app không chạy được nếu không giải nén
  backup zip vào đúng chỗ (`frontend/public/assets/`, `docs/assets/`).
- Muốn thêm lại asset nào: xoá dòng tương ứng trong `.gitignore` rồi `git add`.
- File `~$*.pptx` là lock của PowerPoint — không bao giờ commit.
