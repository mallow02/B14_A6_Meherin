'use client';
import { Bookmark, Plus, Check } from 'lucide-react';
import { usePlan } from './PlanProvider';

export default function WorkoutActions({ workout }) {
  const { plan, saved, ready, add } = usePlan();
  const inPlan = plan.some(item => item.id === workout.id);
  const isSaved = saved.some(item => item.id === workout.id);
  const full = plan.filter(item => !item.done).length >= 5;
  return <div className="mt-8"><div className="flex flex-wrap gap-3">
    <button className="button primary" disabled={!ready || inPlan || full} onClick={() => add(workout, 'plan')}>{inPlan ? <Check size={16} /> : <Plus size={16} />}{inPlan ? 'Added to plan' : "Add to today's plan"}</button>
    <button className="button" disabled={!ready || isSaved} onClick={() => add(workout, 'saved')}><Bookmark size={16} />{isSaved ? 'Saved for later' : 'Save for later'}</button>
  </div>{full && !inPlan && <p className="mt-3 text-xs">Your plan has five unfinished lifts. Complete or remove one to add another.</p>}</div>;
}
