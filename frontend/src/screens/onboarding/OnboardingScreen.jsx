// Onboarding Container — routes giữa các step (v6: 5 màn hình)
import { useApp } from "../../context/AppContext";
import WelcomeStep from "./WelcomeStep";
import HealthScanStep from "./HealthScanStep";
import HabitsStep from "./HabitsStep";
import PlantSelectStep from "./PlantSelectStep";
import SeedPlantedStep from "./SeedPlantedStep";

export default function OnboardingScreen() {
  const { screen } = useApp();

  switch (screen) {
    case "welcome": return <WelcomeStep />;
    case "health-scan": return <HealthScanStep />;
    case "habits": return <HabitsStep />;
    case "plant-select": return <PlantSelectStep />;
    case "seed-planted": return <SeedPlantedStep />;
    default: return <WelcomeStep />;
  }
}
