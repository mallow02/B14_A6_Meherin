'use client';
import { useEffect, useState } from 'react';
import { getWorkouts } from '../lib/api';
import WorkoutCard from './WorkoutCard';
import Loading from './Loading';

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    getWorkouts(controller.signal).then(setWorkouts).catch(error => { if (error.name !== 'AbortError') setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  if (loading) return <Loading />;
  if (error) return <div role="alert" className="empty"><p>{error}</p><button className="button" onClick={() => { setLoading(true); setError(''); setAttempt(attempt + 1); }}>Try again</button></div>;
  return <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}</div>;
}
