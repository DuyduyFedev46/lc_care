import time
from datetime import datetime
from firebase_admin import auth
from services.firebase_init import get_db

class AuthService:
    # Danh sách số điện thoại Dược sĩ được ủy quyền cho mục đích Demo
    PHARMACIST_PHONES = {"0999999999", "0988888888"}

    @staticmethod
    def login(phone: str, full_name: str = "") -> dict:
        """
        Đăng nhập/Đăng ký bằng số điện thoại.
        Nếu số điện thoại chưa tồn tại trong hệ thống, tài khoản mới sẽ được tạo.
        Trả về Custom Token để Frontend đăng nhập vào Firebase Auth Client.
        """
        # Chuẩn hóa số điện thoại: bỏ khoảng trắng, các ký tự không phải số
        clean_phone = "".join(filter(str.isdigit, phone))
        if not clean_phone:
            raise ValueError("Số điện thoại không hợp lệ")

        db = get_db()
        
        # Kiểm tra xem số điện thoại thuộc nhóm Dược sĩ hay không
        is_pharmacist = clean_phone in AuthService.PHARMACIST_PHONES
        role = "pharmacist" if is_pharmacist else "user"
        
        # Xác định UID dựa trên số điện thoại để đảm bảo tính nhất quán qua các lần đăng nhập
        uid = f"{role}_{clean_phone}"
        
        # Tìm thông tin user trong Firestore
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            # Tạo profile ban đầu cho user mới
            user_data = {
                "uid": uid,
                "phone": clean_phone,
                "fullName": full_name or f"Người dùng {clean_phone[-4:]}",
                "role": role,
                "createdAt": datetime.utcnow().isoformat(),
                "updatedAt": datetime.utcnow().isoformat()
            }
            user_ref.set(user_data)
        else:
            # Nếu user đã tồn tại và có truyền fullName mới, cập nhật lại tên
            if full_name:
                user_ref.update({
                    "fullName": full_name,
                    "updatedAt": datetime.utcnow().isoformat()
                })
        
        # Tạo custom token cho UID này thông qua Firebase Admin SDK
        # Token này có hiệu lực trong 1 giờ
        custom_token = auth.create_custom_token(uid)
        
        return {
            "customToken": custom_token.decode("utf-8") if isinstance(custom_token, bytes) else custom_token,
            "role": role,
            "uid": uid,
            "phone": clean_phone
        }
