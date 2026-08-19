import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from services.firebase_init import get_db

os.environ["FIREBASE_SERVICE_ACCOUNT"] = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/backend/firebase-service-account.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/backend/firebase-service-account.json"

db = get_db()

print("--- Searching for user with phone ending in 2134 ---")
users = db.collection("users").stream()
for u in users:
    u_dict = u.to_dict()
    phone = u_dict.get("phone", "")
    if phone.endswith("2134") or "2134" in u.id:
        print(f"User UID: {u.id}")
        print(f"Data: {u_dict}")
        info = db.collection("users").document(u.id).collection("profile").document("info").get()
        if info.exists:
            print(f"  Profile/Info Data: {info.to_dict()}")
        else:
            print("  Profile/Info does not exist")
        print("-" * 30)
