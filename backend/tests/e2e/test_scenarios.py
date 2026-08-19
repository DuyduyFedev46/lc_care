# LC Care — Manual E2E Validation Scenarios

Run these scenarios to manually validate that the implementation aligns with the project plan and that all fixed gaps are functioning as expected.

## Scenario 1: G15 Plant Assignment (Cholesterol)
- **Action:** Complete onboarding, select "Mỡ máu" (Cholesterol) as a chronic condition.
- **Expected Result:**
  - User is assigned G15 ("Lá Trà").
  - User is routed to the Pharmacist Queue (`needsPharmacist: true`).
  - `medical_audit_log` records `action: onboarding_completed` with `needsPharmacist: true`.

## Scenario 2: Cloud Vision OCR
- **Action:** Upload a prescription image in the onboarding flow.
- **Expected Result:**
  - `upload/service.py` processes the image via Google Cloud Vision API.
  - Text is extracted, medication names are identified.
  - `medical_audit_log` records `action: ocr_processed` with confidence score.

## Scenario 3: AI Guardrails & Audit Logging (Layer 3)
- **Action:** Complete onboarding to trigger the AI summary generation.
- **Expected Result:**
  - AI generates a personalized summary.
  - `medical_audit_log` records `action: ai_generation` with `isSafe: true` and the prompt details.
  - The response does NOT contain diagnosing language (Guardrail #0).

## Scenario 4: Voucher Whitelist Enforcement
- **Action:** Try to redeem the "supp" (TPCN) voucher, then try an invalid voucher via API (e.g., "prescription_meds").
- **Expected Result:**
  - "supp" voucher redeems successfully (if user has >= 300 points).
  - Invalid voucher fails with message "Voucher is not in the allowed whitelist".
  - `medical_audit_log` records successful redemptions under `voucher_redeemed`.

## Scenario 5: Cloud Scheduler & FCM Registration
- **Action:** Register device to `/api/notification/register-device` then trigger `/api/scheduler/daily-reminders`.
- **Expected Result:**
  - Device token saved to Firestore.
  - Scheduler endpoint triggers without crashing (push notification logic executes).

## Scenario 6: AI Fallback
- **Action:** Temporarily set an invalid `DEEPSEEK_API_KEY` but valid `GEMINI_API_KEY`.
- **Expected Result:**
  - Onboarding summary generation succeeds by falling back to Gemini.
