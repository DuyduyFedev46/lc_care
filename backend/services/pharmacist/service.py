from typing import List, Dict, Any
from datetime import datetime
from services.firebase_init import get_db

class PharmacistService:
    @staticmethod
    def get_queue() -> List[Dict[str, Any]]:
        db = get_db()
        queue = db.collection("pharmacistQueue").where("status", "==", "pending").stream()
        results = []
        now = datetime.now()
        
        for doc in queue:
            data = doc.to_dict()
            user_id = data.get("userId")
            name = "Thành viên"
            age = 35
            
            if user_id:
                profile_ref = db.collection("users").document(user_id).collection("profile").document("info").get()
                if profile_ref.exists:
                    profile_data = profile_ref.to_dict()
                    name = profile_data.get("fullName") or profile_data.get("name")
                    yob = profile_data.get("yearOfBirth")
                    if yob:
                        try:
                            age = now.year - int(yob)
                        except (ValueError, TypeError):
                            pass
                
                if not name or name == "Thành viên":
                    user_ref = db.collection("users").document(user_id).get()
                    if user_ref.exists:
                        user_data = user_ref.to_dict()
                        name = user_data.get("fullName") or user_data.get("name") or "Thành viên"
            
            submitted_str = data.get("submittedAt", "")
            time_str = "Hôm nay"
            if submitted_str:
                try:
                    clean_str = submitted_str.replace("Z", "")
                    dt = datetime.fromisoformat(clean_str)
                    delta = now - dt
                    minutes = int(delta.total_seconds() / 60)
                    if minutes < 1:
                        time_str = "Vừa xong"
                    elif minutes < 60:
                        time_str = f"{minutes} phút trước"
                    else:
                        hours = int(minutes / 60)
                        if hours < 24:
                            time_str = f"{hours} giờ trước"
                        else:
                            days = int(hours / 24)
                            if days == 1:
                                time_str = "Hôm qua"
                            else:
                                time_str = dt.strftime("%d/%m")
                except Exception:
                    time_str = "Chờ duyệt"
            
            results.append({
                "id": doc.id,
                **data,
                "name": name,
                "age": age,
                "time": time_str
            })
        return results

    @staticmethod
    def get_customer_details(user_id: str) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        
        # Get profile
        profile_doc = user_ref.collection("profile").document("info").get()
        profile = profile_doc.to_dict() if profile_doc.exists else {}
        
        # Get conditions
        conditions = [doc.to_dict() for doc in user_ref.collection("healthConditions").stream()]
        
        # Get active care plans
        care_plans = [doc.to_dict() for doc in user_ref.collection("carePlans").stream()]
        
        # Get prescriptions
        prescriptions = [doc.to_dict() for doc in user_ref.collection("prescriptions").stream()]
        
        # Get purchases
        purchases = [doc.to_dict() for doc in user_ref.collection("purchases").order_by("date", direction="DESCENDING").limit(10).stream()]
        
        return {
            "profile": profile,
            "conditions": conditions,
            "carePlans": care_plans,
            "prescriptions": prescriptions,
            "purchases": purchases
        }

    @staticmethod
    def approve_draft(draft_id: str, approval_data: Dict[str, Any], pharmacist_id: str) -> Dict[str, Any]:
        db = get_db()
        draft_ref = db.collection("pharmacistQueue").document(draft_id)
        draft_doc = draft_ref.get()
        
        if not draft_doc.exists:
            return {"success": False, "message": "Draft not found"}
            
        draft_data = draft_doc.to_dict()
        user_id = draft_data.get("userId")
        
        # 1. Update queue status
        draft_ref.update({
            "status": "approved",
            "reviewedBy": pharmacist_id,
            "reviewedAt": datetime.now().isoformat(),
            "pharmacistNote": approval_data.get("note", "")
        })
        
        # 2. Mutate plan-1 Care Plan
        profile_doc = db.collection("users").document(user_id).collection("profile").document("info").get()
        profile = profile_doc.to_dict() if profile_doc.exists else {}

        plant_type = approval_data.get("plantType")
        
        # Resolve plant group, label, emoji
        from services.onboarding.service import PLANT_GROUPS
        plant_group = "G2"
        plant_label = "Gừng"
        plant_emoji = "🫚"
        for gid, gdata in PLANT_GROUPS.items():
            if gdata["plant"] == plant_type:
                plant_group = gid
                plant_label = gdata["label"]
                plant_emoji = gdata["emoji"]
                break

        # Generate habits using CarePlanService
        from services.careplan.service import CarePlanService
        habits = CarePlanService.generate_habits(user_id, plant_group, profile, lang=profile.get("lang", "vi"))

        plan_ref = db.collection("users").document(user_id).collection("carePlans").document("plan-1")
        plan_ref.update({
            "plantGroup": plant_group,
            "plantType": plant_type,
            "plantLabel": plant_label,
            "plantEmoji": plant_emoji,
            "plantStatus": "growing",
            "status": "growing",
            "pharmacistNote": approval_data.get("note", ""),
            "pharmacistApproved": True,
            "habits": habits,
            "habitSource": "pharmacist_approved",
            "approvedAt": datetime.now().isoformat()
        })
            
        # 3. Medical Audit Log
        db.collection("medical_audit_log").add({
            "action": "care_plan_approved",
            "userId": user_id,
            "draftId": draft_id,
            "pharmacistId": pharmacist_id,
            "timestamp": datetime.now().isoformat(),
            "pharmacistNote": approval_data.get("note", ""),
            "plantType": plant_type,
            "plantGroup": plant_group
        })

        # 4. Notify customer
        try:
            from services.notification.service import NotificationService
            now = datetime.now()
            db.collection("insights").add({
                "userId": user_id,
                "type": "care_plan_approved",
                "title": "Kế hoạch chăm sóc đã được duyệt",
                "body": f"Dược sĩ đã phê duyệt kế hoạch chăm sóc {plant_label} của bạn. Vào xem ngay!",
                "plantType": plant_type,
                "plantLabel": plant_label,
                "read": False,
                "generatedAt": now.isoformat(),
            })
            NotificationService.send_push_notification(
                user_id,
                "Kế hoạch chăm sóc đã sẵn sàng",
                f"Dược sĩ đã duyệt kế hoạch {plant_label}. Mở app để bắt đầu chăm sóc cây!",
            )
        except Exception:
            pass
            
        return {"success": True}

    @staticmethod
    def reject_draft(draft_id: str, reject_data: Dict[str, Any], pharmacist_id: str) -> Dict[str, Any]:
        db = get_db()
        draft_ref = db.collection("pharmacistQueue").document(draft_id)
        draft_doc = draft_ref.get()
        
        if not draft_doc.exists:
            return {"success": False, "message": "Draft not found"}
            
        draft_data = draft_doc.to_dict()
        user_id = draft_data.get("userId")
        
        # 1. Update queue status to rejected
        draft_ref.update({
            "status": "rejected",
            "reviewedBy": pharmacist_id,
            "reviewedAt": datetime.now().isoformat(),
            "rejectReason": reject_data.get("reason", "")
        })
        
        # 2. Mutate plan-1 Care Plan to paused status
        plan_ref = db.collection("users").document(user_id).collection("carePlans").document("plan-1")
        plan_ref.update({
            "plantStatus": "paused",
            "status": "paused",
            "pharmacistApproved": False,
            "needsPharmacist": False,
            "rejectReason": reject_data.get("reason", ""),
            "rejectedAt": datetime.now().isoformat()
        })
            
        # 3. Medical Audit Log
        db.collection("medical_audit_log").add({
            "action": "care_plan_rejected",
            "userId": user_id,
            "draftId": draft_id,
            "pharmacistId": pharmacist_id,
            "timestamp": datetime.now().isoformat(),
            "rejectReason": reject_data.get("reason", "")
        })

        # 4. Notify customer
        reason = reject_data.get("reason", "")
        try:
            from services.notification.service import NotificationService
            now = datetime.now()
            db.collection("insights").add({
                "userId": user_id,
                "type": "care_plan_rejected",
                "title": "Hồ sơ cần bổ sung thông tin",
                "body": f"Dược sĩ yêu cầu bổ sung thêm thông tin sức khỏe. Lý do: {reason}" if reason else "Dược sĩ cần thêm thông tin để thiết kế kế hoạch phù hợp.",
                "reason": reason,
                "read": False,
                "generatedAt": now.isoformat(),
            })
            NotificationService.send_push_notification(
                user_id,
                "Hồ sơ cần bổ sung",
                f"Dược sĩ cần thêm thông tin từ bạn. Mở app để xem chi tiết.",
            )
        except Exception:
            pass
            
        return {"success": True}

    @staticmethod
    def check_sla_escalation() -> Dict[str, Any]:
        """SLA escalation: auto-escalate drafts pending > 4 hours to high priority.
        
        Escalation chain (from solution-design.md):
        - 0-4h: normal priority (pending)
        - 4h+: auto-escalate to high priority + broadcast to all DS
        - 8h+: auto-escalate to critical + notify DS lead
        """
        db = get_db()
        pending = db.collection("pharmacistQueue").where("status", "==", "pending").stream()
        now = datetime.now()
        escalated = 0
        
        for doc in pending:
            data = doc.to_dict()
            submitted_str = data.get("submittedAt", "")
            if not submitted_str:
                continue
                
            try:
                submitted_at = datetime.fromisoformat(submitted_str)
                hours_pending = (now - submitted_at).total_seconds() / 3600
                
                current_priority = data.get("priority", "medium")
                new_priority = current_priority
                
                if hours_pending >= 8 and current_priority != "critical":
                    new_priority = "critical"
                elif hours_pending >= 4 and current_priority == "medium":
                    new_priority = "high"
                
                if new_priority != current_priority:
                    doc.reference.update({
                        "priority": new_priority,
                        "escalatedAt": now.isoformat(),
                        "escalationReason": f"Pending {hours_pending:.1f}h (SLA)"
                    })
                    
                    # Audit log
                    db.collection("medical_audit_log").add({
                        "action": "sla_escalation",
                        "draftId": doc.id,
                        "userId": data.get("userId"),
                        "oldPriority": current_priority,
                        "newPriority": new_priority,
                        "hoursPending": round(hours_pending, 1),
                        "timestamp": now.isoformat()
                    })
                    escalated += 1
            except (ValueError, TypeError):
                continue
        
        return {"escalated": escalated}
