# Bảng dịch tổng Việt → Nhật (VI → JA) — Long Châu Care

> Bản nháp dịch để **sếp/anh review trước khi code**. Cột JA là đề xuất, anh sửa thẳng vào đây.
> Lập 2026-06-21. Nguồn: trích tự động từ `frontend/src` (882 chuỗi) + `constants.js` (16 cây) + backend + seed.
>
> **✅ CẬP NHẬT 2026-06-24 — ĐÃ TRIỂN KHAI XONG.** Toàn bộ bảng này đã được đưa vào
> `frontend/src/locales/{ja,vi}.json` qua react-i18next và wire vào code. Hai site đã deploy:
> **JP** → https://chauthuc-jp.web.app (mặc định tiếng Nhật, `VITE_DEFAULT_LANG=ja`) ·
> **VI** → https://chauthuc-5cae1.web.app. Chi tiết các đợt fix rò rỉ cuối → xem **mục 19**.

## 0. Quy ước (glossary) — giữ nhất quán toàn app
| Khái niệm | VI | JA dùng thống nhất |
|---|---|---|
| Khu vườn (tab/ẩn dụ) | Vườn | ガーデン / 庭 |
| Vườn thảo dược | Vườn thuốc | 薬草ガーデン |
| Cây (chung) | Cây | 植物 |
| Tưới cây | Tưới | 水やり |
| Tưới hộ | Tưới hộ | 水やり代行 |
| Chuỗi ngày | Streak | 連続記録 (◯日連続) |
| Thói quen | Thói quen | 習慣 |
| Dược sĩ | Dược sĩ | 薬剤師 |
| Kế hoạch chăm sóc | Care Plan | ケアプラン |
| Voucher/Quà | Voucher | クーポン |
| Huy hiệu | Huy hiệu | バッジ |
| Điểm | Điểm | ポイント |
| Hồ sơ sức khỏe | Hồ sơ | 健康記録 / プロフィール |
| Gia đình | Gia đình | 家族 |
| Brand | Long Châu Care | Long Châu Care (giữ nguyên) |

## 0b. GIỮ NGUYÊN — không dịch
- **Tên thuốc/sản phẩm**: Amlodipine 5mg, Metformin 500mg, Omega-3 Fish Oil, Panadol Extra, Accu-Chek, HbA1c, Lipid…
- **Brand/dịch vụ**: Long Châu, Long Châu Pay, LC Lab, LC Care, Google Fit.
- **Ngoài phạm vi demo (đã chốt để yên tiếng Việt)**: VNeID, Bộ Y tế, Trạm y tế phường, tham chiếu pháp lý.

---

## 1. Điều hướng & UI dùng chung (deduped — dịch 1 lần, dùng mọi nơi)
| VI | JA |
|---|---|
| Vườn | ガーデン |
| Gia đình | 家族 |
| Chăm sóc | ケア |
| Quà | ギフト |
| Điều hướng chính | メインナビ |
| Quay lại | 戻る |
| Tiếp tục → | 続ける → |
| Tiếp theo → | 次へ → |
| Đóng | 閉じる |
| Hủy / Huỷ | キャンセル |
| Xem tất cả › | すべて見る › |
| Bỏ qua | スキップ |
| Thử lại | 再試行 |
| Đang tải… | 読み込み中… |
| Đang xử lý… | 処理中… |
| Đang lưu… | 保存中… |
| Mất kết nối | 接続が切れました |
| Không thể kết nối | 接続できません |
| Hôm nay | 今日 |
| ngày | 日 |
| Cả ngày | 終日 |
| Hồ sơ của tôi | マイプロフィール |
| Chỉnh sửa | 編集 |
| Cập nhật | 更新 |
| Lưu thay đổi | 変更を保存 |
| Đăng xuất | ログアウト |
| 🔄 Làm mới | 🔄 更新 |
| Tải lại trang | ページを再読み込み |
| Đã xảy ra lỗi | エラーが発生しました |
| Chi tiết | 詳細 |

## 2. App khởi động / lỗi hệ thống (App.jsx, AppContext, Feedback)
| VI | JA |
|---|---|
| Đang kết nối Long Châu Care… | Long Châu Care に接続中… |
| Đang tải dữ liệu… | データを読み込み中… |
| Lỗi kết nối máy chủ. Vui lòng thử lại! | サーバー接続エラー。もう一度お試しください！ |
| Không thể gửi hồ sơ. Vui lòng thử lại. | 記録を送信できません。もう一度お試しください。 |
| Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối và thử lại. | サーバーに接続できません。接続を確認して再試行してください。 |

---

## 3. 16 CÂY THẢO DƯỢC (constants.js `PLANTS_DATA`)
### 3a. Tên + Hành trình (journeyLabel)
| id | name (VI) | name (JA) | journeyLabel (VI) | journeyLabel (JA) |
|---|---|---|---|---|
| ginger | Cây Gừng | ショウガ | Chăm sóc sức khỏe | 健康ケア |
| turmeric | Cây Nghệ | ウコン | Theo dõi chỉ số | 数値モニタリング |
| lemongrass | Cây Sả | レモングラス | Phòng ngừa | 予防 |
| pennywort | Cây Rau Má | ツボクサ | Khám định kỳ | 定期健診 |
| lotus | Cây Hoa Sen | 蓮（ハス） | Thai sản | 妊娠・出産 |
| perilla | Cây Tía Tô | シソ（紫蘇） | Nhi khoa | 小児ケア |
| tea | Cây Lá Trà | 緑茶 | Tuân thủ dài hạn | 長期服薬 |
| mint | Cây Bạc Hà | ハッカ | Sức khỏe nền tảng | 基礎健康 |
| basil | Cây Húng Quế | バジル | Dinh dưỡng | 栄養 |
| aloe | Cây Lô Hội | アロエ | Da liễu, Dị ứng | 皮膚・アレルギー |
| licorice | Cây Cam Thảo | カンゾウ（甘草） | Điều trị đa khoa | 総合ケア |
| bittermelon | Cây Khổ Qua | ゴーヤ | Chuyển hóa | 代謝 |
| lavender | Cây Oải Hương | ラベンダー | Thần kinh | 神経・メンタル |
| ginseng | Cây Nhân Sâm | 高麗人参 | Phục hồi | 回復 |
| eucommia | Cây Đỗ Trọng | トチュウ（杜仲） | Xương khớp | 骨・関節 |
| phyllanthus | Cây Diệp Hạ Châu | コミカンソウ | Tiêu hóa / Gan | 消化・肝臓 |

### 3b. story (1 câu mỗi cây)
| id | VI | JA |
|---|---|---|
| ginger | Vị ấm, giải cảm, đồng hành sáng tối | 体を温め、朝晩そっと寄り添う |
| turmeric | Chống viêm, kiên trì hồi phục | 炎症をしずめ、根気よく回復へ |
| lemongrass | Thanh lọc, thải độc, vận động cùng cây | 浄化・デトックス、植物と一緒に運動 |
| pennywort | Mát gan, đều đặn chăm sóc | 肝を労り、毎日こつこつケア |
| lotus | Vươn lên từ bùn, nở hoa kiêu hãnh | 泥から立ち上がり、誇らしく花開く |
| perilla | Lá lành chữa lành, bảo vệ mầm non | やさしい葉で癒し、小さな芽を守る |
| tea | Chậm rãi, kiên định, nuôi dưỡng | ゆっくり、ぶれずに、育む |
| mint | Thơm mát, tỉnh táo mỗi ngày | さわやかに、毎日すっきり |
| basil | Tăng cường đề kháng, sinh lực | 免疫と活力をチャージ |
| aloe | Dịu mát, chữa lành | しっとり鎮め、癒す |
| licorice | Điều hòa, ngọt ngào vững chắc | 調和し、やさしく支える |
| bittermelon | Đắng trước ngọt sau, cân bằng cuộc sống | 苦みのあとに甘み、暮らしを整える |
| lavender | Hương thơm thư giãn, giấc ngủ sâu | 香りでリラックス、深い眠りへ |
| ginseng | Tinh hoa đất trời, trường thọ an khang | 大地の恵み、健やかな長寿 |
| eucommia | Vững vàng như cây cổ thụ, xương chắc khỏe mỗi ngày | 大樹のように、毎日骨を丈夫に |
| phyllanthus | Mát gan, thanh nhiệt, nhẹ nhàng thải độc | 肝を冷まし、やさしくデトックス |

### 3c. whyThisPlant (lý do chọn cây — câu dài, mỗi cây)
| id | VI | JA |
|---|---|---|
| ginger | Gừng giúp lưu thông máu, ổn định huyết áp — phù hợp với hành trình chăm sóc tim mạch mỗi ngày | ショウガは血行を促し血圧を安定させます — 毎日の心血管ケアにぴったり |
| turmeric | Nghệ tượng trưng cho sự kiên nhẫn — theo dõi chỉ số đều đặn để thấy kết quả rõ rệt theo thời gian | ウコンは忍耐の象徴 — 数値を続けて記録すれば、時とともに成果が見えます |
| lemongrass | Sả thanh lọc cơ thể tự nhiên — đồng hành cùng bạn xây dựng thói quen vận động và phòng ngừa bệnh | レモングラスは体を自然に浄化 — 運動習慣づくりと予防を後押し |
| pennywort | Rau Má nhắc nhở sự đều đặn — giống như khám định kỳ, chăm sóc một chút mỗi ngày tạo nên sức khỏe lâu dài | ツボクサは継続の大切さを思い出させます — 定期健診のように、毎日少しのケアが長い健康に |
| lotus | Hoa Sen tượng trưng cho sự sinh sôi và kiên cường — đồng hành cùng mẹ bầu trong hành trình thai kỳ an toàn | 蓮は生命力と強さの象徴 — 妊婦さんの安心な妊娠期に寄り添います |
| perilla | Tía Tô là bài thuốc dân gian quen thuộc cho trẻ nhỏ — nhắc nhở bạn bảo vệ sức khỏe của bé mỗi ngày | シソは子どもに馴染み深い民間薬 — お子さまの健康を毎日見守ります |
| tea | Trà cần thời gian ủ để ngon — giống như uống thuốc đều đặn, kiên trì mỗi ngày mới thấy hiệu quả | お茶は時間をかけて美味しくなる — 服薬と同じく、毎日の継続が効果に |
| mint | Bạc Hà mang năng lượng tươi mới — phù hợp để xây dựng nền tảng sức khỏe cơ bản hàng ngày | ハッカは爽やかなエネルギー — 毎日の基礎的な健康づくりに最適 |
| basil | Húng Quế giàu dưỡng chất — nhắc bạn bổ sung dinh dưỡng đầy đủ để cơ thể luôn khỏe mạnh | バジルは栄養豊富 — しっかり栄養を補い、体を健やかに保ちます |
| aloe | Lô Hội nổi tiếng làm dịu và phục hồi da — đồng hành cùng bạn chăm sóc và bảo vệ làn da mỗi ngày | アロエは肌を鎮め回復させることで有名 — 毎日の肌ケアを後押し |
| licorice | Cam Thảo điều hòa nhiều cơ quan — phù hợp khi bạn cần chăm sóc sức khỏe toàn diện trên nhiều mặt | 甘草は多くの働きを調和 — 体全体を総合的にケアしたい方に |
| bittermelon | Khổ Qua hỗ trợ cân bằng chuyển hóa — nhắc bạn kiên trì với thói quen lành mạnh để thấy kết quả ngọt ngào | ゴーヤは代謝バランスをサポート — 健康習慣を続け、甘い成果へ |
| lavender | Oải Hương giúp an thần tự nhiên — đồng hành cùng bạn giảm stress và cải thiện giấc ngủ mỗi tối | ラベンダーは自然に心を落ち着けます — ストレス軽減と毎晩の睡眠改善に |
| ginseng | Nhân Sâm bổ khí, phục hồi sức lực — phù hợp khi bạn đang hồi phục sức khỏe sau giai đoạn khó khăn | 高麗人参は気を補い活力を回復 — つらい時期のあとの回復期に |
| eucommia | Đỗ Trọng bổ xương cốt, chắc gân cơ — nhắc bạn vận động và chăm sóc xương khớp đều đặn | 杜仲は骨と筋を丈夫に — 運動と骨・関節ケアの継続を促します |
| phyllanthus | Diệp Hạ Châu mát gan, thanh nhiệt tự nhiên — đồng hành cùng bạn bảo vệ hệ tiêu hóa và chức năng gan | コミカンソウは肝を冷まし自然に解熱 — 消化と肝機能を守ります |

### 3d. Tên dược sĩ trong dữ liệu cây (conditionVerifiedBy) → tên Nhật
| VI | JA |
|---|---|
| DS Nguyễn Thị Lan | 薬剤師 田中 彩 |
| DS Trần Thị Hoa | 薬剤師 佐藤 花 |
| DS Lê Văn Minh | 薬剤師 鈴木 健 |

---

## 4. Giai đoạn cây & Trạng thái cây
| VI | JA |
|---|---|
| Chờ duyệt | 承認待ち |
| Mầm non | 芽 |
| Cây non | 若木 |
| Trưởng thành | 成長 |
| Đang nụ | つぼみ |
| Nở hoa | 開花 |
| Đang lớn | 成長中 |
| Tạm dừng | 休止 |
| Tốt nghiệp | 卒業 |
| Hạt Nảy Mầm | 発芽 |
| Cây Non | 若木 |
| Cây Trưởng Thành | 成木 |
| Nở Hoa | 開花 |
| 0–7 ngày / 8–14 ngày / 15–29 ngày / 30+ ngày | 0〜7日 / 8〜14日 / 15〜29日 / 30日以上 |

## 5. Huy hiệu (BADGES) & Thành tích/Quest (achievements.js + catalog)
| VI | JA |
|---|---|
| Mầm Xanh — 7 ngày streak | 新芽 — 7日連続 |
| Cây Lớn — 14 ngày streak | 成長の木 — 14日連続 |
| Vườn Xanh — 30 ngày streak | みどりの庭 — 30日連続 |
| Gia đình khỏe — Cả nhà streak > 7 | 健康家族 — 家族全員7日連続 |
| Mầm Xanh Đầu Tiên 🌱 / Hoàn thành thói quen lần đầu tiên | 最初の新芽 🌱 / はじめて習慣を達成 |
| Tuần Lễ Vàng 🔥 / 7 ngày liên tiếp hoàn thành thói quen | ゴールデンウィーク 🔥 / 7日連続で習慣を達成 |
| Tháng Thói Quen 🏆 / 30 ngày kiên trì — cây bắt đầu ra hoa! | 習慣の1ヶ月 🏆 / 30日継続 — 植物が咲き始めます！ |
| Cây Lớn Mạnh 🌿 / Cây đã lên level 2 | すくすく成長 🌿 / 植物がレベル2に |
| Vườn Nhà Đầy Đủ 🏡 / Có ít nhất 1 thành viên gia đình tham gia | にぎやかな庭 🏡 / 家族が1人以上参加 |
| Người Thân Chu Đáo 💧 / Đã tưới hộ cây cho người thân | 思いやりの家族 💧 / 家族の代わりに水やり |
| Thu Hoạch Đầu Mùa 🎁 / Đổi voucher chăm sóc sức khỏe lần đầu | 初収穫 🎁 / はじめて健康クーポンを交換 |
| Tích Lũy 100 Điểm ⭐ / Có tổng cộng 100 điểm sức khỏe | 100ポイント達成 ⭐ / 健康ポイント合計100 |
| ${n}/N ngày · ${n}/N thành viên · ${n}/N voucher · ${n}/N điểm · ${n}/N lần | ${n}/N日 · ${n}/N人 · ${n}/Nクーポン · ${n}/Nポイント · ${n}/N回 |
| ĐÃ ĐẠT / HIỆN TẠI / HUY HIỆU KẾ TIẾP | 達成済み / 現在 / 次のバッジ |
| Huy Hiệu & Thành Tích / Tiến độ tổng / Tất cả huy hiệu | バッジ＆実績 / 全体の進捗 / すべてのバッジ |
| Chia sẻ / Hành trình phát triển cây 🌱 | シェア / 植物の成長ジャーニー 🌱 |

## 6. Voucher (VND → ¥)
| VI | JA |
|---|---|
| Long Châu Lab / Xét nghiệm HbA1c + Lipid máu miễn phí / Miễn phí | Long Châu Lab / HbA1c＋血中脂質検査が無料 / 無料 |
| Tiêm chủng / Giảm 50.000đ gói cúm + phế cầu / -50k | 予防接種 / インフル＋肺炎球菌パック ¥500割引 / -¥500 |
| TPCN / Giảm 30.000đ Omega-3 Fish Oil / -30k | サプリ / Omega-3 Fish Oil ¥300割引 / -¥300 |
| Xét nghiệm miễn phí / Giảm 50k Tiêm chủng / Giảm 30k Omega-3 | 検査無料 / 予防接種¥500割引 / Omega-3 ¥300割引 |
| ✅ Đủ điểm đổi (cần ${cost}đ) | ✅ 交換可能（${cost}ポイント必要） |
| Còn thiếu ${x}đ nữa / Cần thêm ${x} điểm | あと${x}ポイント |
| Thu Hoạch Quà / Thu hoạch / Thu hoạch ngay / Đã thu hoạch | ギフト収穫 / 収穫する / 今すぐ収穫 / 収穫済み |
| Xác nhận thu hoạch / Thu hoạch thành công! | 収穫の確認 / 収穫しました！ |
| Điểm chăm sóc sức khỏe của bạn đã được đổi thành voucher Long Châu. Chúc bạn sức khỏe! 💚 | 健康ポイントを Long Châu クーポンに交換しました。お大事に！💚 |
| ⭐ Điểm Của Bạn / 🏆 Quỹ Gia Đình | ⭐ あなたのポイント / 🏆 家族ファンド |
| 💧 Kiếm thêm điểm — chăm cây mỗi ngày › | 💧 ポイントを貯める — 毎日お世話 › |
| ✨ Dành Riêng Cho Bạn / Danh sách quà khả dụng | ✨ あなただけに / 利用できるギフト一覧 |
| Tất cả / Xét nghiệm / Tiêm chủng / Đã đổi / Đổi | すべて / 検査 / 予防接種 / 交換済み / 交換 |
| Quét mã tại quầy Long Châu để sử dụng | Long Châu 店頭でコードを提示してご利用ください |
| Chưa có quà khả dụng trong danh mục này. Hãy tiếp tục tích cực chăm sóc cây nhé! | このカテゴリーに利用できるギフトはまだありません。お世話を続けましょう！ |
| Voucher chỉ áp dụng tại cửa hàng Long Châu. Không áp dụng cho thuốc kê đơn. | クーポンは Long Châu 店舗のみ有効。処方薬には使えません。 |
| Đổi voucher thất bại. Vui lòng thử lại. / Có lỗi kết nối. Vui lòng thử lại. | クーポン交換に失敗しました。再試行してください。 / 接続エラー。再試行してください。 |

---

## 7. Onboarding — labels hồ sơ (profileLabels.js / HealthScan / Habits / Welcome)
| VI | JA |
|---|---|
| Giới tính / Nữ / Khác | 性別 / 女性 / その他 |
| Năm sinh | 生年 |
| Họ và Tên / Họ và tên | 氏名 |
| Chiều cao (cm) / Cân nặng (kg) | 身長 (cm) / 体重 (kg) |
| Xin chào! / Mình là ai vậy? | こんにちは！ / あなたについて教えてください |
| Chăm sóc cho / Bản thân / Gia đình / Cả hai | ケア対象 / 自分 / 家族 / 両方 |
| Tình trạng sức khỏe | 健康状態 |
| Khỏe mạnh | 健康 |
| Cần theo dõi sức khỏe | 要観察 |
| Đang dùng thuốc mãn tính | 慢性疾患で服薬中 |
| Sức khỏe tinh thần | メンタルヘルス |
| Đang hồi phục | 回復期 |
| Vận động / Rất đều đặn / Thỉnh thoảng / Khá ít vận động / Đang muốn bắt đầu | 運動 / とても定期的 / ときどき / あまり動かない / これから始めたい |
| ≥3 buổi/tuần / 1–2 buổi/tuần / Ngồi nhiều / Tìm động lực | 週3回以上 / 週1〜2回 / 座りがち / きっかけ探し中 |
| Tiểu đường / Huyết áp / Mỡ máu / Xương khớp / Tiêu hóa / Gan | 糖尿病 / 血圧 / 脂質 / 骨・関節 / 消化・肝臓 |
| Bắt đầu công việc mới / Chuyển nơi ở / Vừa chào đón em bé / Bắt đầu nghỉ hưu / Đi công tác / nước ngoài / Không có thay đổi lớn | 新しい仕事 / 引っ越し / 出産したばかり / 退職 / 出張・海外 / 大きな変化なし |
| Stress công việc / Hay thức khuya / Rượu bia / Ăn vội vàng / Hay căng thẳng / Hút thuốc / Bỏ bữa / Ngủ muộn / Sống lành mạnh / Mình đang sống lành mạnh! | 仕事のストレス / 夜更かしが多い / 飲酒 / 早食い / 緊張しがち / 喫煙 / 食事を抜く / 就寝が遅い / 健康的な生活 / 健康的に暮らしています！ |
| Nhóm quan tâm / Giai đoạn sống / Thói quen cần cải thiện | 関心グループ / ライフステージ / 改善したい習慣 |
| Khu vườn sức khỏe của bạn đang cần bổ sung dưỡng chất nào? | あなたの健康ガーデンに今いちばん必要な栄養は？ |
| Bệnh mãn tính cần theo dõi? | 観察が必要な慢性疾患は？ |
| Chia sẻ thói quen vận động để mình thiết kế lộ trình phù hợp nha! | 運動習慣を教えてください。最適なプランを設計します！ |
| Bạn có thói quen muốn cải thiện nào không? | 改善したい習慣はありますか？ |

## 7b. Onboarding — quét đơn (HealthScanStep) + loại giấy tờ
| VI | JA |
|---|---|
| Đơn thuốc / Xét nghiệm / Sổ khám / Siêu âm / Tiêm chủng | 処方箋 / 検査 / 診察手帳 / エコー / 予防接種 |
| Kết quả xét nghiệm / Sổ khám bệnh / Giấy siêu âm / Sổ tiêm chủng / Giấy tờ | 検査結果 / 診察手帳 / エコー画像 / 予防接種手帳 / 書類 |
| Chụp & tải đơn thuốc lên | 処方箋を撮影してアップロード |
| Nhắc lịch uống thuốc & kiểm tra tương tác tự động | 服薬リマインド＆相互作用の自動チェック |
| Đang phân tích đơn… | 処方箋を解析中… |
| Đã tải đơn thuốc lên / Đã quét OCR & Phân tích AI ✅ | 処方箋をアップロードしました / OCR読取＆AI解析 完了 ✅ |
| Phát hiện thuốc: | 検出された薬： |
| Xóa | 削除 |
| Chỉ chấp nhận file ảnh (JPEG, PNG) | 画像ファイル（JPEG, PNG）のみ対応 |
| File quá lớn (tối đa 10MB) | ファイルが大きすぎます（最大10MB） |
| Upload thất bại, thử lại | アップロード失敗。再試行してください |

## 7c. Onboarding — chọn cây (PlantSelectStep) + SeedPlanted
| VI | JA |
|---|---|
| Chọn cây đầu tiên bạn muốn chăm nhé! | 最初にお世話する植物を選びましょう！ |
| Chọn loại thảo dược bạn muốn tập trung chăm sóc ưu tiên lúc này. | いま優先してケアしたい薬草を選んでください。 |
| Đường huyết / Đắng trước ngọt sau | 血糖 / 苦みのあとに甘み |
| Huyết áp / Vị ấm đồng hành sáng tối | 血圧 / 朝晩寄り添う温かさ |
| Tiêu hóa / Thanh lọc nhẹ nhàng | 消化 / やさしく浄化 |
| Đang phân tích hồ sơ | 記録を解析中 |
| Hệ thống đang tổng hợp dữ liệu để thiết kế hành trình cho bạn… | あなたのジャーニーを設計するためデータを集約中… |
| Đọc dữ liệu khảo sát cá nhân | 個人アンケートの読み込み |
| Phân tích dữ liệu từ tài liệu y tế | 医療書類のデータ解析 |
| Khởi tạo bản tóm tắt sức khỏe | 健康サマリーの作成 |
| Long Châu Care phân tích: | Long Châu Care 解析中： |

## 7d. Validation (WelcomeStep / validation.js)
| VI | JA |
|---|---|
| Tên cần ít nhất 2 ký tự / Vui lòng nhập họ và tên | 名前は2文字以上で入力してください / 氏名を入力してください |
| Vui lòng chọn năm sinh / Vui lòng chọn giới tính | 生年を選択してください / 性別を選択してください |
| Năm sinh phải từ 1900 đến 2016 | 生年は1900〜2016年の範囲で |
| Chiều cao không hợp lệ (100 - 250 cm) / Cân nặng không hợp lệ (30 - 200 kg) | 身長が不正です（100〜250cm） / 体重が不正です（30〜200kg） |
| Vui lòng chọn tình trạng sức khỏe / Vui lòng chọn ít nhất một tình trạng mãn tính | 健康状態を選択してください / 慢性疾患を1つ以上選択してください |
| Vui lòng chọn mức độ vận động | 運動レベルを選択してください |
| Ngày không hợp lệ / Ngày không được ở tương lai | 日付が不正です / 未来の日付は選べません |
| Ghi chú không được vượt quá N ký tự / Tên không được vượt quá N ký tự | メモはN文字以内 / 名前はN文字以内 |
| Độ dài chu kỳ phải từ N đến M ngày | 周期はN〜M日の範囲で |

---

## 8. Garden — màn chính (GardenScreen)
### 8a. Lời chào & tiêu đề & nút
| VI | JA |
|---|---|
| Chào buổi sáng / Chào buổi chiều / Chào buổi tối | おはようございます / こんにちは / こんばんは |
| Cây sức khỏe của bạn / Cây của bạn | あなたの健康の木 / あなたの植物 |
| Cây lớn lên mỗi ngày khi bạn duy trì thói quen. Bấm vào cây để xem chi tiết! | 習慣を続けると植物が毎日成長します。タップで詳細を表示！ |
| Nhiệm vụ hôm nay | 今日のタスク |
| Hoàn thành mỗi thói quen để tưới nước cho cây và tích điểm thưởng. | 習慣を達成して植物に水をやり、ポイントを貯めましょう。 |
| Điểm & Huy hiệu | ポイント＆バッジ |
| Điểm tích lũy để đổi voucher sức khỏe Long Châu. Mở khoá huy hiệu bằng cách duy trì streak! | ポイントは Long Châu の健康クーポンに交換。連続記録でバッジを解放！ |
| Bắt đầu thôi! 🚀 | はじめましょう！🚀 |
| Tưới nước / Đã tưới / Tưới hạt hôm nay / Tưới hạt mỗi ngày | 水やり / 水やり済み / 今日の水やり / 毎日水やり |
| Hạt giống mới / Đang chờ duyệt… / Đang chờ duyệt | 新しい種 / 承認待ち… / 承認待ち |
| Cấp ${lv} — ${stage} | レベル${lv} — ${stage} |
| Ngày ${streak} tại Vườn | ガーデン${streak}日目 |
| Đã đạt cấp tối đa | 最大レベル到達 |
| 🎉 Tuyệt vời! Hoàn thành mọi nhiệm vụ hôm nay! | 🎉 お見事！今日のタスクを全て達成！ |
| Vườn gia đình / Thêm thành viên để xem vườn gia đình | 家族ガーデン / メンバーを追加して家族ガーデンを見る |
| Cột mốc vinh quang / Tiếp tục hành trình | 輝かしいマイルストーン / ジャーニーを続ける |
| Tích điểm mỗi lần hoàn thành thói quen. Đổi điểm lấy voucher sức khỏe! | 習慣達成のたびにポイント。健康クーポンと交換！ |
| Xem & đổi Voucher 🎁 | クーポンを見る・交換 🎁 |
| Tóm tắt hồ sơ | 健康記録サマリー |
| Đánh dấu / TÙY CHỈNH / Bật | 完了にする / カスタム / オン |
| Chưa có thói quen chăm sóc / Thêm thói quen của bạn / + Thêm thói quen của bạn | ケア習慣がまだありません / 習慣を追加 / ＋ 習慣を追加 |
| Tên thói quen / Thời gian (tùy chọn) / Thêm vào danh sách | 習慣の名前 / 時間（任意） / リストに追加 |
| VD: Uống trà xanh buổi sáng / VD: 08:00, Sau ăn sáng… | 例：朝に緑茶を飲む / 例：08:00、朝食後… |
| Vui lòng nhập tên thói quen | 習慣の名前を入力してください |
| Dược sĩ đang soạn Care Plan cho bạn | 薬剤師がケアプランを作成中です |
| Dược sĩ đang xem hồ sơ và chọn cây phù hợp nhất. | 薬剤師が記録を確認し、最適な植物を選んでいます。 |
| ⏱️ Dự kiến: trong vòng 2 giờ / ⏳ Dược sĩ đang xem hồ sơ (dự kiến trong 2 giờ) | ⏱️ 目安：2時間以内 / ⏳ 薬剤師が確認中（目安2時間以内） |
| ${emoji} ${name} đang chờ duyệt / Hạt giống đang chờ nảy mầm | ${emoji} ${name} は承認待ち / 種が発芽を待っています |
| Đang tải khu vườn… / Không thể kết nối | ガーデンを読み込み中… / 接続できません |

### 8b. Mascot — câu cổ vũ (GardenScreen) — giọng thân mật, dễ thương
| VI | JA |
|---|---|
| Ê, tưới hạt ${name} với mình nha! 💧 | ねえ、一緒に${name}に水やりしよ！💧 |
| ${name} đang chờ bạn tưới nè~ 🌱 | ${name}が水やりを待ってるよ〜 🌱 |
| Dược sĩ sắp chọn xong ${name} cho bạn rồi! | 薬剤師さんがもうすぐ${name}を選んでくれるよ！ |
| Bắt đầu ngày mới bằng việc tưới hạt nha 😊 | 水やりから一日を始めよう 😊 |
| Wow, ${name} nảy mầm rồi kìa! 🌱 | わあ、${name}が芽を出したよ！🌱 |
| ${name} nhỏ xíu quá, tưới thêm cho lớn nha! | ${name}まだ小さいね、もっと水やりして大きくしよう！ |
| Mầm ${name} đang cần bạn chăm sóc đó 💚 | ${name}の芽があなたのお世話を待ってるよ 💚 |
| Cố lên! Vài ngày nữa ${name} sẽ lớn thôi! | あと数日で${name}は大きくなるよ、がんばろう！ |
| ${name} lớn nhanh ghê nè! 🌿 | ${name}、ぐんぐん育ってるね！🌿 |
| Nhìn ${name} xanh tốt, vui quá ha! 😄 | ${name}が青々として嬉しいね！😄 |
| Sắp trưởng thành rồi, đừng bỏ cuộc nha! | もうすぐ成長するよ、あきらめないで！ |
| ${name} đang rất khỏe nhờ bạn đó! 💪 | あなたのおかげで${name}は元気いっぱい！💪 |
| ${name} trưởng thành rồi nè! Giỏi quá! 🌸 | ${name}が成長したよ！すごい！🌸 |
| Sắp ra nụ rồi, hồi hộp ghê 😍 | もうすぐつぼみ、わくわくするね 😍 |
| Bạn chăm ${name} tốt lắm, tiếp tục nha! | ${name}のお世話が上手！この調子で！ |
| ${name} sắp nở hoa rồi kìa! 🌺 | ${name}がもうすぐ咲くよ！🌺 |
| Gần tới đích rồi, cố thêm xíu nha! ✨ | ゴールはすぐそこ、もうひと頑張り！✨ |
| Mình tin bạn sẽ làm ${name} nở hoa! 💐 | あなたなら${name}を咲かせられるよ！💐 |
| ${name} nở hoa rồi! Đẹp quá trời! 🎉 | ${name}が咲いた！とってもきれい！🎉 |
| Bạn là người chăm cây giỏi nhất! 🏆 | あなたは最高のお世話名人！🏆 |
| Hành trình tuyệt vời — tự hào lắm! 🌟 | 素晴らしいジャーニー — 誇らしいね！🌟 |
| Rủ cả nhà chăm cây chung vui hơn nè! 👨‍👩‍👧‍👦 | 家族みんなでお世話するともっと楽しいよ！👨‍👩‍👧‍👦 |
| Nhớ nhắc ba mẹ uống thuốc đúng giờ nha 💊 | ご両親の服薬時間も声かけしてね 💊 |
| Có voucher sức khỏe chờ bạn đổi kìa! 🎁 | 交換できる健康クーポンがあるよ！🎁 |
| Bấm ✨ Sức khỏe xem tóm tắt hay lắm! | ✨健康をタップしてサマリーを見てね！ |
| Giữ streak 7 ngày là có huy hiệu đẹp lắm! ⭐ | 7日連続できれいなバッジがもらえるよ！⭐ |
| Kết nối Google Fit để đếm bước chân nha 🏃 | Google Fit を連携して歩数を数えよう 🏃 |
| Mỗi nhiệm vụ xong = cây lớn thêm xíu! 🌿 | タスク達成ごとに植物が少し成長！🌿 |
| Chụp ảnh cây khoe bạn bè đi nào! 📸 | 植物を撮って友達に自慢しよう！📸 |
| Uống đủ nước hôm nay chưa nè? 💧 | 今日は水分しっかり摂った？💧 |
| Hít thở sâu 3 lần… thấy khỏe hơn chưa? 😌 | 深呼吸を3回…少し楽になった？😌 |
| Hôm nay bạn đã đi bộ chưa? 🚶 | 今日はもう歩いた？🚶 |
| Ngủ đủ 7-8 tiếng là cây vui lắm đó! 😴 | 7〜8時間眠ると植物も喜ぶよ！😴 |
| Ăn thêm rau xanh hôm nay nha bạn! 🥗 | 今日は野菜を多めにね！🥗 |
| Đặt lịch khám định kỳ rồi chưa? 🏥 | 定期健診の予約はもう取った？🏥 |
| Cây khỏe = bạn khỏe, cùng cố lên nha! 💚 | 植物が元気＝あなたも元気、一緒にがんばろう！💚 |
| Mình luôn ở đây cổ vũ bạn nè! 📣 | いつでもあなたを応援してるよ！📣 |
| Streak càng dài, phần thưởng càng xịn! 🔥 | 連続記録が長いほどご褒美も豪華に！🔥 |
| Thêm người thân vào gia đình để chăm nhau nha! 🏠 | 家族を追加して支え合おう！🏠 |

## 9. Garden — Water / Germination / LevelUp
| VI | JA |
|---|---|
| Hoàn thành habit nào hôm nay? | 今日はどの習慣を達成した？ |
| Tất cả habit hôm nay đã hoàn thành! | 今日の習慣はすべて達成！ |
| Đang tưới cây… / Nước đang thấm vào đất… | 水やり中… / 水が土にしみ込んでいます… |
| Cây đã được tưới! / Streak của bạn tiếp tục | 水やり完了！ / 連続記録が続いています |
| Đang trở về trang chủ… / Quay lại | ホームに戻ります… / 戻る |
| +10 điểm | +10ポイント |
| Hạt giống đang nảy mầm… / Mầm xanh đang lớn lên! | 種が発芽しています… / 新芽が育っています！ |
| Dược sĩ Nguyễn Thị Lan đã kích hoạt Care Plan | 薬剤師 田中 彩 がケアプランを有効化しました |
| Kế hoạch chăm sóc: | ケアプラン： |
| Đo huyết áp — CN hàng tuần | 血圧測定 — 毎週日曜 |
| "Uống đều đặn, không bỏ liều. Đo HA mỗi tuần. Tái khám 6/26." | 「毎日きちんと服用し、飲み忘れに注意。毎週血圧測定。2026年6月に再診。」 |
| Streak giữ nguyên — không reset! | 連続記録は維持 — リセットなし！ |
| Vào Vườn — Xem Care Plan | ガーデンへ — ケアプランを見る |
| Badge mới / Tiếp tục vun trồng | 新しいバッジ / お世話を続ける |
| ${days} ngày liên tục | ${days}日連続 |

---

## 10. Family / Calendar / OrderFor
### 10a. FamilyScreen
| VI | JA |
|---|---|
| Vườn nhà / Vườn gia đình | 家族ガーデン |
| Lịch tuần / Lịch gia đình | 週間カレンダー / 家族カレンダー |
| cây / ngày / điểm | 植物 / 日 / ポイント |
| Cần tưới / Đang chờ | 水やり必要 / 待機中 |
| Cả nhà cùng xanh! | 家族みんな元気いっぱい！ |
| Tất cả thành viên đã hoàn thành thói quen hôm nay. Khu vườn gia đình đang phát triển mạnh! 🌿 | 全員が今日の習慣を達成。家族ガーデンはぐんぐん成長中！🌿 |
| 👨‍👩‍👧‍👦 Thành viên gia đình / Mời TV | 👨‍👩‍👧‍👦 家族メンバー / 招待 |
| 💧 Tưới hộ / 💧 Tưới ngay / Đang tưới… | 💧 水やり代行 / 💧 今すぐ水やり / 水やり中… |
| 💧 Đã tưới cây cho ${name}! +${p} điểm | 💧 ${name}に水やりしました！+${p}ポイント |
| Đã tưới thành công! / +5 điểm gia đình | 水やり成功！ / +5 家族ポイント |
| • Chưa đo chỉ số sức khoẻ | • 健康数値が未測定 |
| Không thể tưới hộ lúc này. / Không thể kết nối server. | 今は水やり代行ができません。 / サーバーに接続できません。 |
| 🌿 Mời thành viên gia đình | 🌿 家族を招待 |
| Gửi link này cho người thân. Họ đăng ký Long Châu Care và sẽ được tự động thêm vào Vườn Gia Đình của bạn. | このリンクを家族に送ってください。Long Châu Care に登録すると自動で家族ガーデンに追加されます。 |
| Tham gia vườn nhà cùng tôi! 🌿 | 一緒に家族ガーデンに参加しよう！🌿 |
| Bạn được mời vào Vườn Gia Đình Long Châu Care. Nhấn link để tham gia! | Long Châu Care の家族ガーデンに招待されました。リンクから参加！ |
| Đang tạo link mời… / Không thể tạo link mời. Vui lòng thử lại. | 招待リンクを作成中… / 招待リンクを作成できません。再試行してください。 |
| 📋 Sao chép link / ✓ Đã sao chép! / 📱 Gửi qua SMS | 📋 リンクをコピー / ✓ コピーしました！ / 📱 SMSで送る |
| Link có hiệu lực trong 7 ngày · Dữ liệu SĐT được bảo mật | リンクは7日間有効 · 電話番号は保護されます |
| Cả nhà đi khám định kỳ 6 tháng/lần nhé! | 家族みんな半年に1回は定期健診を！ |
| DS. Nguyễn Thị Lan | 薬剤師 田中 彩 |
| ✨ Cập nhật mới / Lịch gia đình đã được gộp vào tab Gia đình (chuyển đổi ở đầu trang). | ✨ 新着 / 家族カレンダーは「家族」タブに統合されました（上部で切替）。 |
| 👤 Hồ sơ cá nhân chuyển lên nút ảnh đại diện ở góc trên bên phải. | 👤 個人プロフィールは右上のアイコンに移動しました。 |

### 10b. CalendarScreen (lưu ý: tên thành viên & sự kiện = dữ liệu demo, xem mục 16)
| VI | JA |
|---|---|
| Đang tải lịch… / Lịch Gia Đình | カレンダーを読み込み中… / 家族カレンダー |
| Gợi ý thông minh | スマート提案 |
| Mẹ refill thuốc huyết áp 20/5 — GOM chung với refill vitamin của Bố 23/5 để tiết kiệm 1 lượt đi. | 母の降圧薬リフィル(5/20)を、父のビタミンリフィル(5/23)とまとめれば1回分の来店を節約できます。 |
| Dời sang T4 / Đã dời refill sang T4 — LC Cầu Giấy | 水曜に変更 / リフィルを水曜に変更しました — LC Cầu Giấy |

### 10c. OrderForScreen (Đặt thuốc hộ)
| VI | JA |
|---|---|
| Đặt Thuốc Hộ Người Thân / Người thân / Thành viên gia đình | 家族のお薬を代理注文 / 家族 / 家族メンバー |
| 📋 Danh sách cần tiếp tế (Refill) | 📋 補充リスト（リフィル） |
| 💳 Phương thức thanh toán | 💳 支払い方法 |
| (Ví Long Châu Pay) / Ví Long Châu Pay | （Long Châu Pay） / Long Châu Pay |
| (Thanh toán khi nhận hàng) / Thanh toán khi nhận | （代金引換） / 代金引換 |
| Địa chỉ nhận hàng | お届け先 |
| Vui lòng chọn ít nhất 1 sản phẩm. | 商品を1つ以上選んでください。 |
| Đang xử lý đơn hàng… | 注文を処理中… |
| 🛒 Đặt mua ngay — Tổng cộng ${total} | 🛒 今すぐ注文 — 合計 ${total} |
| Đặt đơn thành công! / Mã vận đơn / Tổng cộng: | 注文完了！ / 追跡番号 / 合計： |
| Bạn đã giúp … duy trì streak uống thuốc! 💚 | …さんの服薬の連続記録をサポートしました！💚 |
| Long Châu sẽ giao trong 2–4 giờ (nội thành) | Long Châu が2〜4時間でお届け（市内） |
| 🏡 Về trang chủ | 🏡 ホームへ |
| Que thử đường huyết Accu-Chek x50 / Pin máy đo huyết áp AA x4 | 血糖測定チップ Accu-Chek x50 / 血圧計用電池 単3 x4 |
| Metformin 500mg (Kiểm soát đường huyết) | Metformin 500mg（血糖コントロール） |

---

## 11. Health tracking (HealthTrackingScreen / HealthMetrics / GoogleFitConnect)
| VI | JA |
|---|---|
| Theo Dõi Sức Khỏe / ❤️ Kết Nối Sức Khoẻ / 📊 Chỉ Số Sức Khoẻ | 健康トラッキング / ❤️ ヘルスケア連携 / 📊 健康指標 |
| 📊 Chỉ số hôm nay / Nhận xét hôm nay | 📊 今日の指標 / 今日のひとこと |
| Thiết bị đeo / ⌚ Đồng bộ thiết bị sức khoẻ / 🟢 Đang đồng bộ | ウェアラブル / ⌚ ヘルスデバイス同期 / 🟢 同期中 |
| Số bước chân / bước / Bước chân hôm nay | 歩数 / 歩 / 今日の歩数 |
| Nhịp tim / Nhịp tim TB / ⚠️ Lưu ý nhịp tim / ⚠️ Cần chú ý | 心拍数 / 平均心拍 / ⚠️ 心拍にご注意 / ⚠️ 要注意 |
| Giờ ngủ / Giấc ngủ TB / giờ | 睡眠時間 / 平均睡眠 / 時間 |
| Cân nặng / Cần thiết bị đo | 体重 / 測定機器が必要 |
| Vườn thuốc tốt / Lời khuyên từ vườn thuốc / Quay lại Vườn Cây | 元気な薬草ガーデン / 薬草ガーデンからのアドバイス / ガーデンに戻る |
| Hôm nay bạn đã đi được ${steps} bước — Cây đang thêm sinh lực! 🌿 | 今日は${steps}歩 — 植物が元気をチャージ！🌿 |
| Thêm ${x} bước nữa để đạt mục tiêu hôm nay! 🚶 | あと${x}歩で今日の目標達成！🚶 |
| Tuyệt vời! Bạn đã vượt mục tiêu vận động hàng ngày. Cây của bạn đang phát triển rất sung sức! 🚀 | お見事！今日の運動目標を達成。植物がすくすく成長中！🚀 |
| Hệ thống ghi nhận nhịp tim của bạn nằm ngoài khoảng thông thường. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa. | 心拍数が通常範囲外でした。専門医にご相談ください。 |
| 7 ngày: ${n} bước / TB 7 ngày: ${n} bpm / TB 7 ngày: ${n} giờ | 7日間：${n}歩 / 7日平均：${n}bpm / 7日平均：${n}時間 |
| Chưa có dữ liệu / Không thể tải dữ liệu sức khoẻ / Đồng bộ thất bại | データがありません / 健康データを取得できません / 同期に失敗 |
| ℹ️ Dữ liệu từ Google Fit. Chỉ mang tính tham khảo — không phải chẩn đoán y tế. | ℹ️ Google Fit のデータ。参考情報であり医療診断ではありません。 |
| Kết nối Google Fit / Đã kết nối / Chưa kết nối / Chưa đồng bộ | Google Fit を連携 / 連携済み / 未連携 / 未同期 |
| Đồng bộ ngay / Đang đồng bộ… / Ngắt kết nối / Đang chuyển hướng… | 今すぐ同期 / 同期中… / 連携解除 / リダイレクト中… |
| Vừa xong / ${m} phút trước / ${h} giờ trước / Đồng bộ lần cuối: ${t} | たった今 / ${m}分前 / ${h}時間前 / 最終同期：${t} |
| Kết nối để đồng bộ dữ liệu sức khoẻ | 連携して健康データを同期 |
| Ngắt kết nối Google Fit? Dữ liệu đã đồng bộ vẫn được giữ lại. | Google Fit の連携を解除しますか？同期済みデータは保持されます。 |
| 🔒 LC Care chỉ đọc dữ liệu, không ghi hay chia sẻ với bên thứ ba. | 🔒 LC Care はデータを読み取るのみ。書き込みや第三者共有はしません。 |
| Kết nối Google Fit và đồng bộ để xem chỉ số sức khoẻ của bạn | Google Fit を連携・同期して健康指標を表示 |

---

## 12. CarePlan (CarePlanScreen) — journey + thói quen mẫu
### 12a. Tiêu đề nhóm hành trình
| VI | JA |
|---|---|
| Tầm soát sức khỏe | 健康スクリーニング |
| Quản lý bệnh mãn tính | 慢性疾患の管理 |
| Thai kỳ khỏe mạnh | 健やかな妊娠期 |
| Hồi phục & theo dõi | 回復＆経過観察 |
| Sức khỏe tinh thần | メンタルヘルス |
| Chăm sóc xương khớp | 骨・関節ケア |
| Chăm sóc tiêu hóa & gan | 消化・肝臓ケア |
| Chăm sóc sức khỏe | 健康ケア |
### 12b. Hạng mục care plan (name / time / note) — gộp
| VI | JA |
|---|---|
| Đo huyết áp / Hàng tuần · Chủ nhật sáng / Ghi lại chỉ số, báo Dược sĩ nếu > 140/90 | 血圧測定 / 毎週・日曜午前 / 数値を記録し、140/90超なら薬剤師へ連絡 |
| Xét nghiệm HbA1c / 3 tháng/lần · LC Lab / Kiểm tra đường huyết dài hạn | HbA1c検査 / 3ヶ月に1回・LC Lab / 長期の血糖チェック |
| Tái khám định kỳ / 6 tháng/lần · BS gia đình / Mang theo sổ theo dõi huyết áp | 定期再診 / 半年に1回・かかりつけ医 / 血圧手帳を持参 |
| Dược sĩ sẽ theo dõi chỉ số hàng tuần. Báo ngay nếu có dấu hiệu bất thường. | 薬剤師が毎週数値を確認します。異常があればすぐ連絡を。 |
| Thuốc điều trị hàng ngày / Theo đơn · Sáng & Tối / Không bỏ liều dù cảm thấy tốt | 毎日の治療薬 / 処方通り・朝＆夜 / 体調が良くても飲み忘れずに |
| Xét nghiệm định kỳ / Theo lịch hẹn · LC Lab / HbA1c, Lipid máu, chức năng gan thận | 定期検査 / 予約通り・LC Lab / HbA1c・血中脂質・肝腎機能 |
| Tuân thủ thuốc đều đặn là quan trọng nhất. Không tự ý ngưng thuốc. | 服薬の継続が最も大切。自己判断で中止しないでください。 |
| Vitamin thai kỳ / 1 viên · Sáng · Sau ăn / Acid folic + Sắt + DHA — uống đủ 9 tháng | 妊娠期ビタミン / 1錠・朝・食後 / 葉酸＋鉄＋DHA — 9ヶ月間継続 |
| Khám thai định kỳ / Theo lịch BS · Mỗi 4 tuần / Siêu âm, xét nghiệm máu, nước tiểu | 定期妊婦健診 / 医師の予定・4週ごと / エコー・血液・尿検査 |
| Theo dõi cân nặng / Hàng tuần · Ghi vào sổ / Tăng 10-14kg cả thai kỳ là lý tưởng | 体重管理 / 毎週・手帳に記録 / 妊娠期で10〜14kg増が理想 |
| Uống vitamin đều đặn. Đi khám đúng lịch. Nghỉ ngơi đầy đủ. | ビタミンを毎日。健診は予定通り。十分な休息を。 |
| Thuốc theo đơn / Theo chỉ định · Sau phẫu thuật / Hoàn thành đủ liệu trình kháng sinh | 処方薬 / 指示通り・術後 / 抗生物質は最後まで飲み切る |
| Tái khám hậu phẫu / Theo lịch hẹn BS / Kiểm tra vết thương, cắt chỉ nếu cần | 術後再診 / 医師の予約通り / 傷の確認、必要なら抜糸 |
| Theo dõi triệu chứng / Hàng ngày · Ghi nhật ký / Đau, sưng, sốt — báo Dược sĩ ngay nếu bất thường | 症状の観察 / 毎日・日記に記録 / 痛み・腫れ・発熱は異常時すぐ薬剤師へ |
| Thời gian hồi phục cần kiên nhẫn. Không vận động mạnh quá sớm. | 回復には根気が必要。早すぎる激しい運動は避けて。 |
| Thiền hoặc hít thở sâu / 5-10 phút · Sáng & Tối / Không áp lực — chỉ cần ngồi yên và thở | 瞑想か深呼吸 / 5〜10分・朝＆夜 / 力まず、座って呼吸するだけ |
| Nhật ký cảm xúc / 1 dòng mỗi ngày / Viết ra 1 điều bạn biết ơn hôm nay | 感情日記 / 1日1行 / 今日感謝したことを1つ書く |
| Giấc ngủ chất lượng / 7-8 tiếng · Không màn hình trước ngủ / Thư giãn trước khi ngủ 30 phút | 質の良い睡眠 / 7〜8時間・就寝前は画面オフ / 就寝30分前にリラックス |
| Từng bước nhỏ mỗi ngày. Không cần hoàn hảo — chỉ cần bắt đầu. | 毎日小さな一歩。完璧でなくていい、始めることが大事。 |
| Thuốc & thực phẩm bổ sung / Theo đơn · Canxi + Vitamin D / Uống sau ăn để hấp thu tốt nhất | 薬＆サプリ / 処方通り・カルシウム＋ビタミンD / 吸収のため食後に |
| Vận động nhẹ nhàng / 15-20 phút · Mỗi ngày / Đi bộ, yoga, bơi — tránh chạy nhảy mạnh | 軽い運動 / 15〜20分・毎日 / 散歩・ヨガ・水泳 — 激しい運動は避ける |
| Theo dõi mức độ đau / Hàng ngày · Thang điểm 1-10 / Báo Dược sĩ nếu đau tăng đột ngột | 痛みの記録 / 毎日・1〜10段階 / 急に痛みが増したら薬剤師へ |
| Duy trì vận động nhẹ nhàng giúp xương chắc khỏe. Tránh ngồi lâu một chỗ. | 軽い運動の継続が骨を丈夫に。長時間の座りっぱなしは避けて。 |
| Thuốc bảo vệ gan / Theo chỉ định · Sáng / Uống sau ăn, tránh rượu bia | 肝保護薬 / 指示通り・朝 / 食後に服用、飲酒は避ける |
| Nhật ký ăn uống / Ghi lại bữa ăn chính / Tránh đồ chiên xào, cay nóng, nhiều dầu mỡ | 食事日記 / 主な食事を記録 / 揚げ物・辛い物・脂っこい物を控える |
| Uống đủ nước / 1.5-2 lít/ngày / Nước ấm tốt hơn nước lạnh cho tiêu hóa | 水分補給 / 1日1.5〜2L / 消化には冷水より白湯 |
| Chế độ ăn là yếu tố quyết định. Hạn chế rượu bia, đồ chiên rán. | 食事が決め手。飲酒や揚げ物を控えめに。 |
| Duy trì thói quen tốt / Mỗi ngày / Vận động, ăn uống lành mạnh, ngủ đủ giấc | 良い習慣を維持 / 毎日 / 運動・健康的な食事・十分な睡眠 |
| Nước lọc là lựa chọn tốt nhất | 水がいちばんの選択 |
| Khám sức khỏe định kỳ / Hàng năm / Phòng bệnh hơn chữa bệnh | 定期健康診断 / 毎年 / 治療より予防 |
| Thực hiện đều đặn để nâng cao sức khỏe. | 続けることで健康を高めましょう。 |
### 12c. CarePlan — UI khác
| VI | JA |
|---|---|
| Hoạt động hàng ngày / Kế hoạch chăm sóc / Ngày ${i} | 毎日のアクティビティ / ケアプラン / ${i}日目 |
| 💧 Tưới cây ngay — bắt đầu streak / Mỗi ngày là một bước nhỏ | 💧 今すぐ水やり — 連続記録を始める / 毎日が小さな一歩 |
| Kế hoạch dưới đây là gợi ý chung — sẽ được cá nhân hóa sau khi duyệt (trong 2 giờ). | 下記は一般的な目安 — 承認後（2時間以内）に個別化されます。 |
| Đã tưới / Bỏ qua / Ghi chú từ Dược sĩ | 水やり済み / スキップ / 薬剤師からのメモ |
| Tái khám: Theo lịch hẹn / Theo dõi — LC Care | 再診：予約通り / 経過観察 — LC Care |

---

## 13. Pharmacist dashboard (PharmacistScreen)
| VI | JA |
|---|---|
| Tổng quan / Tóm tắt hồ sơ / Giấy tờ gốc | 概要 / 記録サマリー / 原本書類 |
| Khách hàng / Chưa cập nhật / Gần đây / vừa qua | 利用者 / 未更新 / 最近 / 前 |
| Tình trạng / Tình trạng hồ sơ sức khỏe: | 状態 / 健康記録の状態： |
| Đã tham gia nhóm gia đình / Chưa liên kết nhóm gia đình | 家族グループに参加済み / 家族グループ未連携 |
| Tự khai báo | 自己申告 |
| Mầm non / Giai đoạn: / Đều / Chưa đều | 芽 / ステージ： / 良好 / 不規則 |
| Lịch sử mua hàng (6 tháng): / Chưa có lịch sử giao dịch | 購入履歴（6ヶ月）： / 取引履歴なし |
| Tóm tắt hồ sơ tự động: / Không có tóm tắt tự động từ hệ thống. | 自動記録サマリー： / システムの自動サマリーはありません。 |
| Hệ thống không suy ra bệnh. Tóm tắt dưới đây là dữ liệu hành chính. Dược sĩ tự quyết định dựa trên chuyên môn. | システムは病名を推定しません。下記は管理データです。判断は薬剤師が専門知識で行います。 |
| Giấy tờ đã tải lên: / Tài liệu #${i} | アップロード済み書類： / 書類 #${i} |
| Đơn thuốc — Amlodipine 5mg + Metformin 500mg (Trích xuất thành công) | 処方箋 — Amlodipine 5mg ＋ Metformin 500mg（読取成功） |
| Xét nghiệm — HbA1c = 6.1% (15/04/2026) (Trích xuất thành công) | 検査 — HbA1c = 6.1%（2026/04/15）（読取成功） |
| Không có ghi nhận bệnh lý đặc biệt | 特記すべき疾患の記録なし |
| QUYẾT ĐỊNH CỦA DƯỢC SĨ / Chọn hành trình cây thảo dược: / Ghi chú dặn dò chăm sóc sức khỏe: | 薬剤師の判断 / 薬草ジャーニーを選択： / ケアの注意メモ： |
| Duyệt và gửi / Đang xử lý… / Hoàn thành | 承認して送信 / 処理中… / 完了 |
| Đã phê duyệt hành trình thành công / Phê duyệt thất bại | ジャーニーを承認しました / 承認に失敗 |
| Nhật ký y tế đã được ghi nhận. Hệ thống đã gửi thông báo hành trình mới đến khách hàng. | 医療ログを記録。新しいジャーニーの通知を利用者へ送信しました。 |
| Từ chối / Từ chối yêu cầu duyệt cây / Xác nhận từ chối | 却下 / 植物承認リクエストを却下 / 却下の確認 |
| Vui lòng nhập lý do từ chối / Vui lòng nhập lý do từ chối để thông báo tới khách hàng: | 却下理由を入力してください / 利用者へ通知する却下理由を入力： |
| Ví dụ: Chất lượng ảnh đơn thuốc bị mờ, không đủ điều kiện duyệt… | 例：処方箋の画像が不鮮明で承認できません… |
| Đã từ chối yêu cầu / Từ chối thất bại / Đang lưu… | リクエストを却下しました / 却下に失敗 / 保存中… |
| Yêu cầu đã được chuyển trạng thái từ chối trên hệ thống. Khách hàng sẽ nhận được yêu cầu cập nhật lại thông tin. | リクエストを却下状態に更新しました。利用者へ再入力の依頼が届きます。 |
| Quay lại danh sách chờ / Quay lại danh sách chờ | 待機リストに戻る |
| Tất cả hồ sơ đã xử lý 🎉 / Hãy nghỉ ngơi hoặc nhấn Làm mới. | すべての記録を処理しました 🎉 / 休憩するか「更新」を押してください。 |
| VỪA / THẤP / VỪA | 中 / 低 / 直近 |
| Khách hàng chưa đồng ý chia sẻ toàn bộ dữ liệu y tế. Dược sĩ chỉ xem được dữ liệu hành chính cơ bản. | 利用者は全医療データの共有に未同意。薬剤師は基本的な管理データのみ閲覧可。 |
| Đang tải thông tin khách hàng… / Vui lòng chọn khách hàng từ hàng đợi bên trái | 利用者情報を読み込み中… / 左の待機リストから利用者を選択してください |
| Lỗi tải danh sách hàng đợi / Lỗi tải chi tiết khách hàng | 待機リストの読み込みエラー / 利用者詳細の読み込みエラー |

---

## 14. Profile (ProfileScreen) + Achievements screen
| VI | JA |
|---|---|
| Hồ Sơ Cá Nhân / Chỉnh sửa hồ sơ / Người dùng Long Châu | プロフィール / プロフィール編集 / Long Châu ユーザー |
| Thành viên từ ${y} · | ${y}年から利用 · |
| Tổng điểm / Lần tưới / Cây đã trồng | 累計ポイント / 水やり回数 / 育てた植物 |
| Huy Hiệu (${u}/${n}) / Xem tất cả / Tất cả huy hiệu | バッジ（${u}/${n}） / すべて見る / すべてのバッジ |
| Streak 12 tuần / Kết Nối Sức Khoẻ / Vườn Lưu Niệm / Sức khỏe | 12週連続 / ヘルスケア連携 / 思い出ガーデン / 健康 |
| Họ và tên / Năm sinh / Họ và tên không được để trống / Năm sinh không hợp lệ (từ 1900 đến ${y}) | 氏名 / 生年 / 氏名は必須です / 生年が不正です（1900〜${y}） |
| Cập nhật thông tin thành công! / Lỗi khi cập nhật thông tin. | 情報を更新しました！ / 情報の更新に失敗しました。 |
| Chu kỳ của bạn / 🌸 Cập nhật chu kỳ / Lưu chu kỳ / Cập nhật | あなたの周期 / 🌸 周期を更新 / 周期を保存 / 更新 |
| Dự kiến kỳ tiếp theo / Ngày bắt đầu kỳ gần nhất / Độ dài chu kỳ trung bình (18–45 ngày) | 次回予定 / 直近の月経開始日 / 平均周期（18〜45日） |
| Vui lòng chọn ngày bắt đầu kỳ gần nhất / Đã cập nhật chu kỳ! / Lỗi khi lưu chu kỳ. | 直近の開始日を選んでください / 周期を更新しました！ / 周期の保存に失敗。 |
| Chưa theo dõi chu kỳ. Bấm … để nhập và nhận dự đoán kỳ tiếp theo. | 周期は未記録です。…をタップして入力し、次回予測を受け取りましょう。 |
| Mỗi ô = 1 ngày tưới cây / Đã lưu vào Vườn Lưu Niệm | 1マス＝水やり1日 / 思い出ガーデンに保存済み |
| Chưa có cây tốt nghiệp. Hãy tiếp tục hành trình chăm sóc để lưu giữ cây tại đây nhé! | 卒業した植物はまだありません。お世話を続けて、ここに残しましょう！ |
| Đăng xuất tài khoản | アカウントからログアウト |

---

## 15. Backend — labels / push / error (additive `ja`)
### 15a. Health/condition/habit/doc labels (onboarding/service.py)
| VI | JA |
|---|---|
| Khỏe mạnh / Cần theo dõi sức khỏe / Đang dùng thuốc mãn tính / Sức khỏe tinh thần / Mang thai / Sau sinh / Đang hồi phục | 健康 / 要観察 / 慢性疾患で服薬中 / メンタルヘルス / 妊娠・産後 / 回復期 |
| Tiểu đường / Huyết áp / Mỡ máu / Xương khớp / Tiêu hóa / Gan | 糖尿病 / 血圧 / 脂質 / 骨・関節 / 消化・肝臓 |
| Hay thức khuya / Rượu bia / Ăn vội vàng / Hay căng thẳng / Hút thuốc / Bỏ bữa / Ngủ muộn / Sống lành mạnh | 夜更かしが多い / 飲酒 / 早食い / 緊張しがち / 喫煙 / 食事を抜く / 就寝が遅い / 健康的な生活 |
| Đơn thuốc / Xét nghiệm / Sổ khám / Siêu âm / Tiêm chủng | 処方箋 / 検査 / 診察手帳 / エコー / 予防接種 |
### 15b. Push notifications (notification/service.py)
| VI | JA |
|---|---|
| 💧 {sender} đã tưới cây {plant} cho bạn / Nhớ {habit} hôm nay nhé! | 💧 {sender}さんがあなたの{plant}に水やりしました / 今日の{habit}を忘れずに！ |
| 🔥 Bạn đang có chuỗi {streak} ngày! / Hoàn thành thói quen hôm nay để giữ streak nhé! | 🔥 {streak}日連続中！ / 今日の習慣を達成して記録を守ろう！ |
| 💊 {med} sắp hết / Còn ~5 ngày. Đặt trước để không bị gián đoạn nhé! | 💊 {med}がもうすぐ無くなります / 残り約5日。切らさないよう事前注文を！ |
| ✅ Dược sĩ đã duyệt kế hoạch sức khoẻ / Cây {plant} đã sẵn sàng. Bắt đầu hành trình từ hôm nay! | ✅ 薬剤師がケアプランを承認しました / {plant}の準備完了。今日からジャーニーを！ |
| 🎉 Gia đình đạt chuỗi 7 ngày cùng nhau! / Nhận badge gia đình đặc biệt ngay! | 🎉 家族で7日連続達成！ / 特別な家族バッジをゲット！ |
### 15c. Error / default (family, upload, pharmacist)
| VI | JA |
|---|---|
| Link mời không hợp lệ. / Link mời đã được sử dụng rồi. / Link mời đã hết hạn. | 招待リンクが無効です。 / 招待リンクは使用済みです。 / 招待リンクの有効期限が切れました。 |
| Gia đình không tồn tại. / Gia đình đã đạt tối đa 6 thành viên. | 家族が存在しません。 / 家族は最大6人までです。 |
| Hôm nay bạn đã tưới hộ thành viên này rồi! / Đã tưới cây {plant} cho thành viên này! | 今日はこのメンバーへ水やり済みです！ / このメンバーの{plant}に水やりしました！ |
| Loại giấy tờ không hợp lệ / Lỗi xử lý OCR | 書類の種類が無効です / OCR処理エラー |

---

## 16. DỮ LIỆU DEMO SEED (seed_firestore.py → bản JP)
| Trường | VI | JA (đề xuất) |
|---|---|---|
| Khách hàng chính | Nguyễn Thị Mai | 田中 花子 |
| Gia đình | Gia đình Mai | 田中家 |
| Thành viên / quan hệ | Anh Hùng · Chồng | 田中 大輔 · 夫 |
|  | Chị Lan · Con gái | 田中 さくら · 娘 |
|  | Chị Hà · Con gái | 田中 ゆい · 娘 |
| Calendar — người | Mẹ / Bố / Ông / Bé Su | 母 / 父 / 祖父 / スウちゃん |
| Calendar — sự kiện | Refill thuốc huyết áp · LC Cầu Giấy | 降圧薬リフィル · LC ◯◯店 |
|  | Tái khám sau viêm họng | 咽頭炎の再診 |
|  | Xét nghiệm máu | 血液検査 |
|  | Đo loãng xương · BV Lão khoa | 骨密度測定 · 老年科病院 |
| Điều kiện sức khỏe | Huyết áp | 血圧 |
| Care plan items | Uống Amlodipine 5mg · Sáng · Sau ăn sáng | Amlodipine 5mg 服用 · 朝 · 朝食後 |
|  | Uống Metformin 500mg · Sáng & Tối · Trong ăn | Metformin 500mg 服用 · 朝＆夜 · 食中 |
|  | Đo huyết áp · Sáng · Ghi chỉ số | 血圧測定 · 朝 · 数値を記録 |
| Purchases (tần suất) | 2 tháng/lần · 3 tháng/lần · 6 tháng/lần | 2ヶ月に1回 · 3ヶ月に1回 · 半年に1回 |
| Địa chỉ (OrderFor) | 123 Nguyễn Trãi, Quận 5, TP.HCM | 東京都渋谷区◯◯1-2-3 |
| Ghi chú dược sĩ (seed) | Uống đều đặn, không bỏ liều. Đo HA mỗi tuần. Tái khám tháng 6/2026. | 毎日きちんと服用し飲み忘れに注意。毎週血圧測定。2026年6月に再診。 |

---

## 17. Ngày / Số / Tiền (format theo locale)
| Hạng mục | VI hiện tại | JA |
|---|---|---|
| Thứ trong tuần (viết tắt) | CN, T2…T7 | 日, 月, 火, 水, 木, 金, 土 |
| Ngày đầy đủ | 21/06/2026 / 21 tháng 6 năm 2026 | 2026年6月21日 |
| Tiền tệ | 500.000đ / -50k | ¥500 / -¥500 |
| Locale code | vi-VN | ja-JP |

---

## 18. BỔ SUNG SAU RÀ SOÁT LẦN 2 (những chỗ bảng đầu còn thiếu)

### 18a. PWA / Tab trình duyệt (manifest.json, index.html)
| VI | JA |
|---|---|
| name: Long Châu Care / short_name: LC Care | giữ nguyên |
| description: Khu Vườn Sức Khỏe Việt — Mỗi thói quen tốt là một cây thảo dược | ベトナムの健康ガーデン — 良い習慣ひとつが、一つの薬草に |
| title: Long Châu Care — Khu Vườn Sức Khỏe Việt | Long Châu Care — 健康ガーデン |

### 18b. Đăng nhập (LoginScreen) — CHƯA có ở bảng đầu
| VI | JA |
|---|---|
| Số điện thoại | 電話番号 |
| Vui lòng nhập số điện thoại hợp lệ (10 chữ số) | 有効な電話番号を入力してください（10桁） |
| Không nhận được token xác thực từ máy chủ | サーバーから認証トークンを取得できませんでした |
| Đăng nhập thất bại. Vui lòng thử lại. | ログインに失敗しました。再試行してください。 |
| Đang mở cổng vườn… | ガーデンの門を開いています… |
| Bằng việc tiếp tục, bạn đồng ý với | 続けることで、以下に同意したものとみなされます |
| Điều khoản / và / Chính sách bảo mật | 利用規約 / および / プライバシーポリシー |

### 18c. Tóm tắt sức khỏe (HealthSummaryBoard) — CHƯA có
| VI | JA |
|---|---|
| ✨ Tóm tắt sức khỏe | ✨ 健康サマリー |
| Cây đồng hành / Hạt giống chờ nảy mầm | 相棒の植物 / 発芽を待つ種 |
| Cây đồng hành cùng bạn trên hành trình sức khỏe | 健康ジャーニーに寄り添う植物 |
| Dược sĩ đang xem hồ sơ để chọn cây phù hợp | 薬剤師が記録を確認し最適な植物を選定中 |
| Phân tích chỉ số sức khỏe | 健康指標の分析 |
| Lựa chọn cây thảo dược phù hợp | 最適な薬草の選定 |
| Soạn Care Plan chuyên biệt | 専用ケアプランの作成 |
| Dược sĩ phản hồi trong 2 giờ / Dược sĩ duyệt trong 2 giờ | 薬剤師が2時間以内に対応 / 2時間以内に承認 |
| Long Châu Care phân tích / Kết quả phân tích tài liệu / Hồ sơ khảo sát | Long Châu Care が分析 / 書類の分析結果 / アンケート記録 |
| Đã chuyển tiếp Care Team | ケアチームに転送済み |

### 18d. Ăn mừng (Celebration) + Vườn đẳng cự (IsometricGarden) — CHƯA có
| VI | JA |
|---|---|
| Chúc mừng! / Huy Hiệu Mới / 🎉 Tiếp tục thôi! | おめでとう！ / 新しいバッジ / 🎉 この調子で！ |
| Tưới nước nào! 💧 / Thêm TV | 水やりしよう！💧 / メンバー追加 |
| ✅ Tưới ${plantName} của ${name}! | ✅ ${name}の${plantName}に水やり！ |

### 18e. Thông báo dự phòng AI (config/ai-prompts.js frontend) — CHƯA có
| VI | JA |
|---|---|
| Dược sĩ sẽ xem lịch sử mua hàng của bạn và tư vấn chính xác. | 薬剤師が購入履歴を確認し、的確にアドバイスします。 |
| Không thể tạo tóm tắt. Vui lòng xem hồ sơ gốc. | サマリーを作成できません。原本をご確認ください。 |
| Hồ sơ bệnh lý đã được tổng hợp. Dược sĩ sẽ xem xét và phản hồi trong vòng 2 giờ. | 病歴をまとめました。薬剤師が確認し2時間以内に回答します。 |
| Cây ${plant} phù hợp với hồ sơ sức khỏe của bạn. Chúc bạn một hành trình chăm sóc tuyệt vời! | ${plant}はあなたの健康記録にぴったり。素敵なケアジャーニーを！ |
| Dịch vụ tóm tắt không khả dụng | サマリーサービスは利用できません |

### 18f. Lỗi API backend (user-facing — router) — CHƯA có
> Lưu ý: các mô tả route kiểu "Lấy danh sách…", "Toggle habit…" là chú thích nội bộ (FastAPI docstring), KHÔNG hiển thị → không cần dịch.
| VI | JA |
|---|---|
| Không tìm thấy thông tin người dùng | ユーザー情報が見つかりません |
| Không thể tham gia gia đình. / Không thể tưới hộ. | 家族に参加できません。 / 水やり代行ができません。 |
| Không thể đồng bộ dữ liệu / Chưa kết nối Google Fit | データを同期できません / Google Fit 未連携 |
| Token hết hạn hoặc bị thu hồi. Vui lòng kết nối lại. | トークンの期限切れまたは失効です。再連携してください。 |
| Đã ngắt kết nối Google Fit / Lỗi đăng nhập | Google Fit の連携を解除しました / ログインエラー |
| Thiếu trường bắt buộc trong userProfile | userProfile に必須項目が不足しています |

### 18g. Quest backend (achievements_catalog.py) — bổ sung 4 quest còn thiếu
| VI | JA |
|---|---|
| Tưới cây hôm nay | 今日の水やり |
| Hoàn thành mọi nhiệm vụ hôm nay | 今日のタスクを全部達成 |
| Tưới cây 3 ngày trong tuần này | 今週3日水やり |
| Tưới hộ 1 người thân tuần này | 今週1人に水やり代行 |

### 18h. Catalog thói quen (Firestore `habitCatalog`) — ĐÃ EXPORT ĐỦ 15 NHÓM ✅
Đã dump từ Firestore thật (project `keolai-63ec1`): 15 nhóm habitCatalog + 15 plantGroups + 5 diseaseToPlant.
Dưới đây là **15 nhãn nhóm + toàn bộ 60 thói quen (unique) + chuỗi thời gian** — đã dịch đủ, không còn sót.

**Nhãn 15 nhóm (label):**
| G | VI | JA |
|---|---|---|
| G1 | Sức khỏe nền tảng | 基礎健康 |
| G2 | Theo dõi sức khỏe | 健康モニタリング |
| G3 | Quản lý đường huyết | 血糖管理 |
| G4 | Thai kỳ khỏe mạnh | 健やかな妊娠期 |
| G5 | Dinh dưỡng & Phát triển | 栄養＆発育 |
| G6 | Chăm sóc sức khỏe tuổi vàng | シニア健康ケア |
| G7 | Hồi phục & Chống viêm | 回復＆抗炎症 |
| G8 | Sức khỏe tinh thần | メンタルヘルス |
| G9 | Vận động & Thể lực | 運動＆体力 |
| G10 | Bắt đầu vận động | 運動を始める |
| G11 | Sức khỏe gia đình | 家族の健康 |
| G12 | Thanh lọc & Vận động | デトックス＆運動 |
| G13 | Chăm sóc xương khớp | 骨・関節ケア |
| G14 | Chăm sóc tiêu hóa & gan | 消化・肝臓ケア |
| G15 | Kiểm soát mỡ máu | 脂質管理 |

**60 thói quen (unique, dùng chung mọi nhóm):**
| VI | JA |
|---|---|
| Bổ sung đủ protein | タンパク質をしっかり摂る |
| Bữa ăn gia đình đủ chất | 栄養バランスの良い家族の食事 |
| Canxi + Vitamin D buổi sáng | 朝にカルシウム＋ビタミンD |
| Ghi chỉ số huyết áp | 血圧を記録 |
| Ghi cân nặng tuần này | 今週の体重を記録 |
| Ghi mức đau hôm nay (1-10) | 今日の痛みを記録（1〜10） |
| Ghi nhật ký triệu chứng | 症状日記をつける |
| Ghi nhật ký ăn uống | 食事日記をつける |
| Giãn cơ buổi sáng 5 phút | 朝5分ストレッチ |
| Giãn cơ sau tập 10 phút | 運動後10分ストレッチ |
| Giãn cơ tại bàn 5 phút | デスクで5分ストレッチ |
| Gặp gỡ bạn bè / gia đình | 友人・家族と会う |
| Hít thở sâu 5 phút | 深呼吸5分 |
| Hạn chế chất béo bão hòa | 飽和脂肪を控える |
| Hạn chế đồ ăn chế biến | 加工食品を控える |
| Không dùng điện thoại 1 tiếng | スマホを1時間使わない |
| Không dùng điện thoại trước ngủ | 就寝前はスマホを使わない |
| Không uống rượu bia | 飲酒しない |
| Không ăn đồ ăn vặt hôm nay | 今日は間食しない |
| Kiểm tra tủ thuốc gia đình | 家庭の薬箱をチェック |
| Nghỉ ngơi đủ giấc | 十分に休息する |
| Ngâm nước ấm 10 phút | 10分湯船につかる |
| Ngủ đủ 7 tiếng | 7時間眠る |
| Ngủ đủ 7-8 tiếng | 7〜8時間眠る |
| Ngủ đủ 8 tiếng | 8時間眠る |
| Ngủ đủ 8 tiếng phục hồi | 回復のため8時間眠る |
| Ra ngoài hít thở 10 phút | 外で10分深呼吸 |
| Tránh leo cầu thang nhiều | 階段の上り過ぎを避ける |
| Tránh đồ chiên xào | 揚げ物を避ける |
| Trò chuyện sức khỏe với con | 子どもと健康について話す |
| Tập nhẹ thai phụ 10 phút | 妊婦向け軽い運動10分 |
| Tập thăng bằng 5 phút | バランス運動5分 |
| Tập thể dục 45 phút | 運動45分 |
| Tập thể dục buổi sáng | 朝の運動 |
| Uống thuốc buổi sáng | 朝の服薬 |
| Uống thuốc buổi tối | 夜の服薬 |
| Uống thuốc bảo vệ gan | 肝保護薬を飲む |
| Uống thuốc mỡ máu | 脂質の薬を飲む |
| Uống thuốc theo đơn | 処方薬を飲む |
| Uống vitamin thai kỳ | 妊娠期ビタミンを飲む |
| Uống đủ 1.5L nước | 水を1.5L飲む |
| Uống đủ 2.5L nước | 水を2.5L飲む |
| Uống đủ 2L nước | 水を2L飲む |
| Uống đủ 2L nước ấm | 白湯を2L飲む |
| Viết nhật ký cảm xúc | 感情日記を書く |
| Vận động 30 phút | 30分運動する |
| Vận động nhẹ nhàng 15 phút | 軽い運動15分 |
| Ăn cá/hạt giàu Omega-3 | Omega-3豊富な魚・ナッツを食べる |
| Ăn nhạt hôm nay | 今日は薄味 |
| Ăn rau xanh mỗi bữa | 毎食野菜を食べる |
| Ăn sáng đủ chất | 栄養のある朝食 |
| Ăn ít tinh bột hôm nay | 今日は糖質控えめ |
| Đi bộ 20 phút | 20分歩く |
| Đi bộ 30 phút | 30分歩く |
| Đi bộ cùng gia đình | 家族と散歩 |
| Đi bộ nhẹ 10 phút | 軽く10分歩く |
| Đi bộ nhẹ 15 phút | 軽く15分歩く |
| Đi bộ nhẹ 20 phút | 軽く20分歩く |
| Đi cầu thang thay thang máy | エレベーターより階段 |
| Đứng dậy mỗi 1 tiếng | 1時間ごとに立ち上がる |

**Chuỗi thời gian (time) — số giờ giữ nguyên (07:00…); chữ thì dịch:**
| VI | JA |
|---|---|
| Cả ngày | 終日 |
| Sáng / Chiều / Tối | 朝 / 午後 / 夜 |
| Bữa ăn / Sau ăn / Sau tập | 食事 / 食後 / 運動後 |
| Cuối tuần | 週末 |

> ✅ Gap đã đóng. `plantGroups` label trùng với mục 3a; `diseaseToPlant` chỉ là mã ánh xạ (diabetes→…), không có chữ hiển thị.

---

## 19. TRẠNG THÁI TRIỂN KHAI & ĐỢT FIX RÒ RỈ CUỐI (2026-06-24)

Hạ tầng i18n: `react-i18next` + `i18next`. Nguồn dịch: `frontend/src/locales/ja.json` (mặc định JP)
và `vi.json` (fallback). Ngôn ngữ mặc định baked theo site qua `VITE_DEFAULT_LANG` lúc build.

**Đợt rà soát cuối đã đóng các chỗ còn lọt chữ Việt khi bấm ngoài kịch bản** (giám khảo bấm sâu
vẫn không lộ tiếng Việt). Các component được wire `t()` trong đợt này + key i18n tương ứng:

| Vị trí (file) | Chuỗi VI cũ | Key i18n | Mục bảng gốc |
|---|---|---|---|
| BottomNav (`SharedUI.jsx`) | Vườn / Gia đình / Chăm sóc / Quà | `nav_garden` `nav_family` `nav_care` `nav_gift` | §1 |
| `CarePlanScreen.jsx` — tiêu đề nhóm | 8 journeyLabel | `careplan_*` (screen_title, chronic, pregnancy, recovery, mental, joints, digestive, general) | §12a |
| `CarePlanScreen.jsx` — hạng mục plan | name/detail/note 8 nhóm | `cp_item_*` `cp_detail_*` `cp_note_*` `cp_ds_*` (mới) | §12b |
| `CarePlanScreen.jsx` — streak/lưới | ngày streak / đến tốt nghiệp / Đã tưới·Hôm nay·Bỏ qua | `days_streak_label` `days_to_graduate` `adherence_n_days` `careplan_watered` `today` `careplan_skip` | §12c |
| `GardenScreen.jsx` — mascot | 39 câu cổ vũ | `mascot_*` (đã có sẵn, nay dùng `t()` + `{{name}}`) | §8b |
| `GardenScreen.jsx` — HUD/sheet | `{n}đ` `{n} ngày` / HÔM NAY · n/m / Tóm tắt hồ sơ | `points_unit` `day_unit` `today_tasks_count` `profile_summary` (mới) | §8a |
| `GoogleFitConnect.jsx` | 12 chuỗi kết nối/đồng bộ | `fitness_*` (mới) + `connected` `not_connected` `sync_now` `disconnect` … | §11 |
| `FamilyScreen.jsx` | careTeam tip + DS Nguyễn Thị Lan | `family_checkup_reminder` `pharmacist_tanaka_aya` | §10a |
| `IsometricGarden.jsx` | Thêm TV | `invite_member_short` | §18d |
| `VoucherScreen.jsx` | `điểm` / `đ` (×3) | `points_unit` | §6 |

**Key mới thêm trong `ja.json` + `vi.json` (đợt này):** `fitness_connect_desc`, `fitness_cannot_init`,
`fitness_sync_failed_retry`, `fitness_connect_failed`, `fitness_cannot_disconnect`, `fitness_privacy_note`,
`fitness_syncing_progress`, `profile_summary`, `today_tasks_count`, `careplan_pending_title`,
`careplan_pharmacist_note_title`, `cp_journey_subtitle`, và bộ `cp_item_* / cp_detail_* / cp_note_* / cp_ds_*`
cho 8 nhóm care plan (G2/G3/G4/G7/G8/G13/G14 + default).

> Bản dịch JA cho các key trên **đã có sẵn ở các mục tương ứng phía trên** (§11, §12) — đợt này chỉ
> tách thành key i18n riêng và wire vào code, không đổi nội dung dịch.

---

> **Ghi chú review:** Anh vẫn có thể sửa trực tiếp cột JA ở đây — sau khi sửa, đồng bộ lại vào
> `frontend/src/locales/ja.json` rồi build + deploy lại 2 site là xong. Toàn bộ bảng đã được đưa vào
> locale + wire code + chạy quét rò rỉ (không còn sót chữ Việt trên giao diện JP).
