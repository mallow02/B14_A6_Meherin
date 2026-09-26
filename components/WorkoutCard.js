import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';

export function WorkoutStats({ workout }) {
  return <div className="stats"><span><Clock3 />{workout.duration} min</span><span><Flame />{workout.caloriesBurned} kcal</span><span><Star className="text-[#ccff00]" />{workout.rating}</span></div>;
}
export function Tags({ groups }) {
  return <div className="tags">{groups.map(group => <span key={group} className="tag">{group}</span>)}</div>;
}
export default function WorkoutCard({ workout }) {
  return <Link href={`/workouts/${workout.id}`} className="panel group overflow-hidden transition hover:border-[#ccff00]/60">
    <img src={workout.image} alt={workout.name} loading="lazy" className="h-56 w-full bg-[#20242d] object-cover transition duration-300 group-hover:scale-[1.02]" />
    <div className="p-5"><Tags groups={workout.muscleGroups} /><h3 className="mt-3">{workout.name}</h3><p className="mt-1 text-xs">{workout.equipment}</p><div className="mt-5 border-t border-white/10 pt-4"><WorkoutStats workout={workout} /></div></div>
  </Link>;
}
