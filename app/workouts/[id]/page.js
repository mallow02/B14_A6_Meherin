import { notFound } from "next/navigation";
import { getWorkout } from "../../../lib/api";
import { Tags } from "../../../components/WorkoutCard";
import WorkoutActions from "../../../components/WorkoutActions";

export default async function WorkoutPage({ params }) {
  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id)) notFound();
  const workout = await getWorkout(id);
  if (!workout) notFound();
  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];
  return (
    <div className="site-container page grid items-start gap-8 md:grid-cols-2 lg:gap-14">
      <img
        src={workout.image}
        alt={workout.name}
        className="w-full rounded-xl bg-[#171a21] object-cover aspect-[4/3] md:aspect-[4/5]"
      />
      <section>
        <h1>{workout.name}</h1>
        <p className="mt-4">{workout.description}</p>
        <div className="my-5">
          <Tags groups={workout.muscleGroups} />
        </div>
        <dl className="panel overflow-hidden">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 border-b border-white/10 px-5 py-3.5 last:border-0"
            >
              <dt className="muted text-xs uppercase tracking-wide">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-7 text-xl">INSTRUCTIONS</h2>
        <ol className="mt-4 space-y-3">
          {workout.instructions.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm text-gray-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00]/10 text-xs font-bold text-[#ccff00]">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <WorkoutActions workout={workout} />
      </section>
    </div>
  );
}
