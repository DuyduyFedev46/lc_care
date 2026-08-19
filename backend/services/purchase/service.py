from typing import List, Dict, Any
from services.firebase_init import get_db

class PurchaseService:
    @staticmethod
    def get_purchase_history(user_id: str) -> List[Dict[str, Any]]:
        # In production, this would call Family Package PostgreSQL
        # For demo, we use Firestore mock collection
        db = get_db()
        purchases = db.collection("users").document(user_id).collection("purchases").order_by("date", direction="DESCENDING").stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in purchases]

    @staticmethod
    def add_purchase(user_id: str, purchase_data: Dict[str, Any]) -> Dict[str, Any]:
        db = get_db()
        purchase_ref = db.collection("users").document(user_id).collection("purchases").document()
        purchase_ref.set(purchase_data)
        return {"success": True, "id": purchase_ref.id}
