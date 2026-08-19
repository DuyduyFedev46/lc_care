import firebase_admin
from firebase_admin import credentials, firestore
from config import FIREBASE_CRED_PATH
import os

_app = None

def get_db():
    global _app
    if not _app:
        if os.path.exists(FIREBASE_CRED_PATH):
            cred = credentials.Certificate(FIREBASE_CRED_PATH)
            _app = firebase_admin.initialize_app(cred)
        else:
            # Fallback to Application Default Credentials on Cloud Run
            _app = firebase_admin.initialize_app()
    return firestore.client()

