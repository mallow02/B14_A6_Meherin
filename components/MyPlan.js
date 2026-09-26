'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, X, Dumbbell, Clock3, Flame, ArrowRight, Plus } from 'lucide-react';
import { usePlan } from './PlanProvider';
import { WorkoutStats } from './WorkoutCard';
import Loading from './Loading';

export default function MyPlan() {
  const { plan, saved, ready, add, remove, markDone } = usePlan();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
  const items = tab === 'plan' ? plan : saved;
  const metrics = [
    { label: 'Exercises', value: plan.length, Icon: Dumbbell },
    { label: 'Minutes', value: plan.reduce((sum, item) => sum + item.duration, 0), Icon: Clock3 },
    { label: 'Calories', value: plan.reduce((sum, item) => sum + item.caloriesBurned, 0), Icon: Flame },
  ];
  return <div className="container page"><h1>MY PLAN</h1><p className="mt-2">Cap of five lifts for today. Finish them, then load more.</p>
    <div className="panel my-6 grid grid-cols-3 p-3 sm:p-6">{metrics.map(({ label, value, Icon }) => <div key={label} className="border-r border-white/10 px-3 last:border-0 sm:px-5"><div className="flex items-center justify-between gap-2"><span className="muted text-xs">{label}</span><Icon size={16} className="hidden text-[#ccff00] sm:block" /></div><strong className="display mt-1 block text-4xl">{value}</strong></div>)}</div>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><nav aria-label="Plan lists" className="flex gap-2"><Link href="/my-plan" className={`button ${tab === 'plan' ? 'primary' : ''}`} aria-current={tab === 'plan' ? 'page' : undefined}>Today&apos;s Plan</Link><Link href="/my-plan?tab=saved" className={`button ${tab === 'saved' ? 'primary' : ''}`} aria-current={tab === 'saved' ? 'page' : undefined}>Saved</Link></nav></div>
    {!ready ? <Loading /> : items.length === 0 ? <div className="panel empty"><Dumbbell size={36} className="mx-auto mb-4 text-[#ccff00]" /><h2>NOTHING HERE YET</h2><p className="mt-2">Browse the library and add a lift to get today moving.</p><Link href="/" className="button primary">Go to workouts <ArrowRight size={16} /></Link></div> : <div className="space-y-4">{items.map(workout => <article key={workout.id} className="panel flex flex-wrap items-center gap-4 p-4 sm:gap-6">
      <img src={workout.image} alt={workout.name} className="h-20 w-20 rounded-lg object-cover sm:w-24" />
      <div className="min-w-0 flex-1"><h3>{workout.name}</h3><p className="mb-2 text-xs">{workout.equipment}</p><WorkoutStats workout={workout} /></div>
      <div className="flex w-full flex-wrap gap-2 lg:w-auto"><Link href={`/workouts/${workout.id}`} className="button">View Details</Link>{tab === 'plan' ? <button className="button primary" disabled={workout.done} onClick={() => markDone(workout.id)}><Check size={16} />{workout.done ? 'Completed' : 'Mark as Done'}</button> : <button className="button primary" onClick={() => add(workout, 'plan')} disabled={plan.some(item => item.id === workout.id) || plan.filter(item => !item.done).length >= 5}><Plus size={16} />{plan.some(item => item.id === workout.id) ? 'In your plan' : 'Add to plan'}</button>}<button className="button" onClick={() => remove(workout.id, tab)} aria-label={`Remove ${workout.name} from ${tab}`}><X size={16} /></button></div>
    </article>)}</div>}
  </div>;
}
