"""Long Chau Care — FastAPI Backend"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_ORIGINS

app = FastAPI(title="Long Chau Care API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount service routers
from services.auth.router import router as auth_router
from services.family.router import router as family_router
from services.purchase.router import router as purchase_router
from services.upload.router import router as upload_router
from services.careplan.router import router as careplan_router
from services.pharmacist.router import router as pharmacist_router
from services.garden.router import router as garden_router
from services.voucher.router import router as voucher_router
from services.notification.router import router as notification_router
from services.onboarding.router import router as onboarding_router
from ai.router import router as ai_router
from scheduler.router import router as scheduler_router
from services.calendar.router import router as calendar_router
from services.fitness.router import router as fitness_router

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(family_router, prefix="/api/family", tags=["Family"])
app.include_router(purchase_router, prefix="/api/purchase", tags=["Purchase"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])
app.include_router(careplan_router, prefix="/api/careplan", tags=["Care Plan"])
app.include_router(pharmacist_router, prefix="/api/pharmacist", tags=["Pharmacist"])
app.include_router(garden_router, prefix="/api/garden", tags=["Garden"])
app.include_router(voucher_router, prefix="/api/voucher", tags=["Voucher"])
app.include_router(notification_router, prefix="/api/notification", tags=["Notification"])
app.include_router(onboarding_router, prefix="/api/onboarding", tags=["Onboarding"])
app.include_router(ai_router, prefix="/api/ai", tags=["AI"])
app.include_router(scheduler_router, prefix="/api/scheduler", tags=["Scheduler"])
app.include_router(calendar_router, prefix="/api/calendar", tags=["Calendar"])
app.include_router(fitness_router, prefix="/api/fitness", tags=["Fitness"])

@app.on_event("startup")
async def startup_event():
    from services.firebase_init import get_db
    try:
        get_db()
        print("Firebase initialized successfully")
    except Exception as e:
        print(f"Failed to initialize Firebase: {e}")

@app.get("/")
async def root():
    return {"service": "Long Chau Care API", "version": "1.0.0", "status": "ok"}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}
