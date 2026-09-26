import { Suspense } from "react";
import MyPlan from "../../components/MyPlan";
import Loading from "../../components/Loading";
export const metadata = { title: "My Plan" };
export default function PlanPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyPlan />
    </Suspense>
  );
}
