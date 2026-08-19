"""Seed Firestore with demo data for LC Care frontend integration.
Run: cd backend && python scripts/seed_firestore.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime, timedelta
from services.firebase_init import get_db

USER_ID = "demo-user-1"
FAMILY_ID = "demo-family-1"

def seed():
    db = get_db()
    user_ref = db.collection("users").document(USER_ID)
    today = datetime.now()

    # 1. Profile
    print("Seeding profile...")
    user_ref.collection("profile").document("info").set({
        "name": "Nguyễn Thị Mai",
        "gender": "female",
        "yearOfBirth": 1985,
        "careFor": "self",
        "familyId": FAMILY_ID,
        "healthStatus": "chronic",
        "exercise": "sometimes",
        "chronicSubConditions": ["hypertension"],
        "lifeChanges": [],
        "badHabits": [],
        "cycleData": {"tracking": False},
        "height": 158,
        "weight": 56,
        "createdAt": today.isoformat(),
    })

    # 2. Health Conditions
    print("Seeding health conditions...")
    user_ref.collection("healthConditions").document("cond-1").set({
        "condition": "chronic",
        "subCondition": "hypertension",
        "label": "Huyết áp",
        "source": "self_report",
        "diagnosedAt": "2024-01-15",
        "verifiedBy": None,
    })

    # 3. Care Plans
    print("Seeding care plans...")
    user_ref.collection("carePlans").document("plan-1").set({
        "journeyType": "health_care",
        "journeyLabel": "Chăm sóc sức khỏe",
        "plantType": "ginger",
        "plantLevel": 3,
        "plantStatus": "growing",
        "plantGroup": "G2",
        "plantLabel": "Gừng",
        "plantEmoji": "🫚",
        "conditionSource": "doctor_prescription",
        "conditionVerifiedBy": "DS Nguyễn Thị Lan",
        "pharmacistApproved": True,
        "needsPharmacist": True,
        "habits": [
            {"id": 1, "name": "Uống Amlodipine 5mg", "time": "Sáng · Sau ăn sáng", "done": False},
            {"id": 2, "name": "Uống Metformin 500mg", "time": "Sáng & Tối · Trong ăn", "done": False},
            {"id": 3, "name": "Đo huyết áp", "time": "Sáng · Ghi chỉ số", "done": False},
        ],
        "stageNames": ["Chờ duyệt", "Mầm non", "Cây non", "Trưởng thành", "Đang nụ", "Nở hoa"],
        "createdAt": today.isoformat(),
    })

    # 4. Loyalty Summary
    print("Seeding loyalty...")
    user_ref.collection("loyaltySummary").document("info").set({
        "totalPoints": 840,
        "familyPoints": 1500,
        "tier": "Silver",
        "voucherHistory": [
            {"id": "lab", "redeemedAt": (today - timedelta(days=14)).isoformat()},
        ],
    })

    # 5. Adherence Events (30-day streak)
    print("Seeding adherence events...")
    for i in range(30):
        day = today - timedelta(days=29 - i)
        for habit_id in [1, 2, 3]:
            user_ref.collection("adherenceEvents").document(f"ae-{i:03d}-{habit_id}").set({
                "eventType": "water",
                "habitId": habit_id,
                "pointsEarned": 10 if habit_id <= 2 else 5,
                "timestamp": day.replace(hour=8, minute=30).isoformat(),
            })

    # 6. Purchases
    print("Seeding purchases...")
    purchases = [
        {"name": "Amlodipine 5mg", "count": 6, "months": "1,3,5,7,9,11", "lastDate": (today - timedelta(days=7)).strftime("%Y-%m-%d"), "frequency": "2 tháng/lần"},
        {"name": "Metformin 500mg", "count": 5, "months": "2,4,6,8,10", "lastDate": (today - timedelta(days=14)).strftime("%Y-%m-%d"), "frequency": "2 tháng/lần"},
        {"name": "Omega-3 Fish Oil", "count": 4, "months": "1,4,7,10", "lastDate": (today - timedelta(days=21)).strftime("%Y-%m-%d"), "frequency": "3 tháng/lần"},
        {"name": "Panadol Extra", "count": 2, "months": "3,9", "lastDate": (today - timedelta(days=60)).strftime("%Y-%m-%d"), "frequency": "6 tháng/lần"},
    ]
    for i, p in enumerate(purchases):
        user_ref.collection("purchases").document(f"p-{i+1}").set({**p, "createdAt": (today - timedelta(days=i*30)).isoformat()})

    # 7. Family
    print("Seeding family...")
    db.collection("families").document(FAMILY_ID).set({
        "name": "Gia đình Mai",
        "members": [USER_ID, "demo-user-2", "demo-user-3", "demo-user-4"],
        "totalPoints": 1500,
    })
    family_members = [
        {"id": 2, "name": "Anh Hùng", "relation": "Chồng", "plant": "tea", "level": 2, "streak": 12, "status": "growing", "color": "#3B82F6", "isMe": False},
        {"id": 3, "name": "Chị Lan", "relation": "Con gái", "plant": "lotus", "level": 2, "streak": 8, "status": "growing", "color": "#DB2777", "isMe": False},
        {"id": 4, "name": "Chị Hà", "relation": "Con gái", "plant": None, "level": 0, "streak": 0, "status": "pending", "color": "#D97706", "isMe": False},
    ]
    for m in family_members:
        user_ref.collection("familyMembers").document(str(m["id"])).set(m)

    # 8. Pharmacist Queue
    print("Seeding pharmacist queue...")
    db.collection("pharmacistQueue").document("draft-001").set({
        "userId": USER_ID,
        "customerName": "Nguyễn Thị Mai",
        "customerAge": 41,
        "status": "pending",
        "priority": "medium",
        "plantGroup": "G2",
        "plantType": "ginger",
        "plantLabel": "Gừng",
        "healthStatus": "chronic",
        "chronicSubConditions": ["hypertension"],
        "aiSummary": "Hồ sơ bệnh lý đã được tổng hợp. Bệnh nhân tăng huyết áp, đang dùng Amlodipine 5mg. Mua thuốc đều đặn tại Long Châu 6 tháng gần đây. Dược sĩ xem xét và duyệt cây Gừng.",
        "submittedAt": today.isoformat(),
    })

    # 9. Family Calendar
    print("Seeding calendar...")
    for i, day_offset in enumerate([0, 2, 5, 6]):
        day = today + timedelta(days=day_offset)
        day_name = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][day.weekday()]
        db.collection("familyCalendars").document(f"cal-{i+1}").set({
            "familyId": FAMILY_ID,
            "day": day_name,
            "date": day.strftime("%d"),
            "dateFull": day.strftime("%Y-%m-%d"),
            "events": [{
                "member": "Nguyễn Thị Mai" if i % 2 == 0 else "Anh Hùng",
                "activity": "Refill Amlodipine" if i == 0 else "Đo huyết áp" if i == 2 else "Refill Lá Trà",
                "location": "LC Cầu Giấy",
                "color": "#00923F",
            }] if i < 3 else [],
        })

    print(f"\n✅ Seed complete! demo-user-1 ready.")
    print(f"   Garden: GET /api/garden (user_id={USER_ID})")
    print(f"   Family: GET /api/family (user_id={USER_ID})")

if __name__ == "__main__":
    seed()
