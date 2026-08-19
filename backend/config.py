"""Backend config — Firebase, AI, Cloud Vision"""
import os
from dotenv import load_dotenv

load_dotenv(".env")           # backend/.env (primary)
load_dotenv("../firebase.env")  # root firebase.env (fallback)
load_dotenv("../deepsek.env")   # root deepsek.env (fallback)

# Firebase
FIREBASE_CRED_PATH = os.getenv("FIREBASE_SERVICE_ACCOUNT", "firebase_auth_key_credential.json")
FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_STORAGE_BUCKET", "keolai-63ec1.appspot.com")

# DeepSeek AI
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")

# Google Cloud
GCLOUD_PROJECT = os.getenv("GCLOUD_PROJECT", "keolai-63ec1")
GCLOUD_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", FIREBASE_CRED_PATH)

# Google Fit OAuth
GOOGLE_FIT_CLIENT_ID = os.getenv("GOOGLE_FIT_CLIENT_ID", "")
GOOGLE_FIT_CLIENT_SECRET = os.getenv("GOOGLE_FIT_CLIENT_SECRET", "")
GOOGLE_FIT_REDIRECT_URI = os.getenv(
    "GOOGLE_FIT_REDIRECT_URI",
    "http://localhost:8000/api/fitness/callback"
)
# Sau khi OAuth xong, backend redirect về frontend URL này
GOOGLE_FIT_FRONTEND_REDIRECT = os.getenv(
    "GOOGLE_FIT_FRONTEND_REDIRECT",
    "http://localhost:5173"
)

# CORS
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://chauthuc.web.app",
    "https://chauthuc-5cae1.web.app",
    "https://chauthuc-jp.web.app",
]
