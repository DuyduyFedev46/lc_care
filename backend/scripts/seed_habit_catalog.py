"""Seed Firestore with habit catalog, plant groups, and disease-to-plant mappings.

Run once:  python scripts/seed_habit_catalog.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.firebase_init import get_db
from services.careplan.habit_catalog import HABIT_CATALOG
from services.onboarding.service import PLANT_GROUPS, DISEASE_TO_PLANT

def seed():
    db = get_db()

    # 1. habitCatalog/{groupId}
    print("=== Seeding habitCatalog ===")
    for group_id, entry in HABIT_CATALOG.items():
        # Build habits list with active/done defaults
        default_habits = [{"active": True, "done": False, **h} for h in entry["default"]]
        optional_habits = [{"active": False, "done": False, **h} for h in entry["optional"]]
        all_habits = default_habits + optional_habits

        # Find matching plant type
        plant_type = None
        for gid, gdata in PLANT_GROUPS.items():
            if gid == group_id:
                plant_type = gdata["plant"]
                break

        doc = {
            "groupId": group_id,
            "label": entry["label"],
            "plantType": plant_type,
            "habits": all_habits,
        }
        db.collection("habitCatalog").document(group_id).set(doc)
        print(f"  ✅ habitCatalog/{group_id} — {entry['label']} ({len(all_habits)} habits)")

    # 2. plantGroups/{groupId}
    print("\n=== Seeding plantGroups ===")
    for group_id, gdata in PLANT_GROUPS.items():
        doc = {
            "groupId": group_id,
            "plant": gdata["plant"],
            "label": gdata["label"],
            "emoji": gdata["emoji"],
            "needsPharmacist": gdata["needsPharmacist"],
        }
        db.collection("plantGroups").document(group_id).set(doc)
        print(f"  ✅ plantGroups/{group_id} — {gdata['label']} ({gdata['plant']})")

    # 3. diseaseToPlant/{diseaseId}
    print("\n=== Seeding diseaseToPlant ===")
    for disease_id, plant_type in DISEASE_TO_PLANT.items():
        doc = {
            "diseaseId": disease_id,
            "plantType": plant_type,
        }
        db.collection("diseaseToPlant").document(disease_id).set(doc)
        print(f"  ✅ diseaseToPlant/{disease_id} → {plant_type}")

    print(f"\n🎉 Done! Seeded {len(HABIT_CATALOG)} habit groups, {len(PLANT_GROUPS)} plant groups, {len(DISEASE_TO_PLANT)} disease mappings.")

if __name__ == "__main__":
    seed()
