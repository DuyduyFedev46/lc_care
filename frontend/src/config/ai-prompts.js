// Long Chau Care — AI Prompt Templates
// Mọi prompt gửi lên AI service đều được định nghĩa ở đây.
// Không prompt nào hardcode trong component.

export const AI_PROMPTS = {
  // Màn 1.3 — Tổng hợp lịch sử mua (chỉ Long Châu)
  purchaseSummary: (purchases) => ({
    endpoint: "/api/ai/purchase-summary",
    payload: {
      store: "Long Châu",
      purchases: purchases.map((p) => ({
        name: p.name,
        count: p.count,
        months: p.months,
        lastDate: p.lastDate,
        frequency: p.frequency,
      })),
    },
    fallback:
      "Dược sĩ sẽ xem lịch sử mua hàng của bạn và tư vấn chính xác.",
  }),

  // Màn 1.3 — OCR trích xuất từ giấy tờ y tế
  ocrExtract: (docType, imageBase64) => ({
    endpoint: "/api/ai/ocr-extract",
    payload: {
      docType,
      image: imageBase64,
    },
    fallback: null,
  }),

  // Màn 2.1 — Tóm tắt hồ sơ cho Dược sĩ
  adminSummary: (reviewData) => ({
    endpoint: "/api/ai/admin-summary",
    payload: {
      customerName: reviewData.customerName,
      customerAge: reviewData.customerAge,
      purchases: reviewData.purchases,
      ocrResults: reviewData.ocrResults,
      documents: reviewData.documents,
    },
    fallback: "Không thể tạo tóm tắt. Vui lòng xem hồ sơ gốc.",
  }),

  // Màn Family — Cross-member insight (DS quyết định gửi)
  crossMemberInsight: (familyData) => ({
    endpoint: "/api/ai/cross-member-insight",
    payload: {
      members: familyData.members.map((m) => ({
        name: m.name,
        plant: m.plant,
        streak: m.streak,
        status: m.status,
      })),
    },
    fallback: null,
  }),

  // Gợi ý habit cho DS tham khảo
  habitSuggestion: (plantType, conditionSource) => ({
    endpoint: "/api/ai/habit-suggestion",
    payload: {
      plantType,
      conditionSource,
    },
    fallback: null,
  }),

  // Màn 1.7 — AI summary cho cây được gán (SeedPlantedStep)
  plantSummary: (profile, plant) => ({
    endpoint: "/api/ai/plant-summary",
    payload: {
      plant: plant.plant,
      label: plant.label,
      group: plant.group,
      needsPharmacist: plant.needsPharmacist,
      healthStatus: profile.healthStatus,
      chronicSubConditions: profile.chronicSubConditions,
      lifeChanges: profile.lifeChanges,
      exercise: profile.exercise,
      badHabits: profile.badHabits,
      yearOfBirth: profile.yearOfBirth,
    },
    fallback: plant.needsPharmacist
      ? "Hồ sơ bệnh lý đã được tổng hợp. Dược sĩ sẽ xem xét và phản hồi trong vòng 2 giờ."
      : `Cây ${plant.label} phù hợp với hồ sơ sức khỏe của bạn. Chúc bạn một hành trình chăm sóc tuyệt vời!`,
  }),
};

// Utility: Gọi AI + fallback nếu lỗi
export async function fetchAIInsight(promptDef) {
  if (!promptDef || !promptDef.endpoint) return null;
  try {
    const res = await fetch(promptDef.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promptDef.payload),
    });
    if (!res.ok) throw new Error("Dịch vụ tóm tắt không khả dụng");
    const data = await res.json();
    return data.text;
  } catch {
    return promptDef.fallback;
  }
}
