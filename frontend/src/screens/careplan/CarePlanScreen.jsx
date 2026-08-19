// Tab Care Plan — now just passes through to Calendar (Lịch tuần)
import CalendarScreen from "../family/CalendarScreen";

export default function CarePlanScreen() {
  return <CalendarScreen isSubView={false} />;
}
