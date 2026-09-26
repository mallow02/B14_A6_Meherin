import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-52 items-center justify-center gap-3 text-gray-400"
    >
      <LoaderCircle className="animate-spin text-[#ccff00]" />
      Loading workouts…
    </div>
  );
}
