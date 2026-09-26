import { ChevronDown } from "lucide-react";
export function sortWorkouts(workouts, sort) {
  return [...workouts].sort((a, b) =>
    sort === "rating"
      ? b.rating - a.rating
      : sort === "calories"
        ? b.caloriesBurned - a.caloriesBurned
        : a.duration - b.duration,
  );
}
export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-xs text-gray-400">
      Sort By{" "}
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="appearance-none rounded-lg border border-white/15 bg-[#151922] py-3 pl-4 pr-9 text-white"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-3.5"
        />
      </span>
    </label>
  );
}
