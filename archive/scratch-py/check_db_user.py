import sys
import os

# Set environment variable for firebase service account
os.environ["FIREBASE_SERVICE_ACCOUNT"] = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/keolai-63ec1-firebase-adminsdk-fbsvc-eecb0ccf40.json"

# Add backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "../backend"))

from services.garden.service import GardenService

user_id = "user_0912345678"
summary = GardenService.get_garden_summary(user_id)
print("\n--- Garden Service Summary ---")
print("Response:", summary)
