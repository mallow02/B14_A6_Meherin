const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(signal) {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error('Unable to load workouts. Please try again.');
  const workouts = await response.json();
  if (!Array.isArray(workouts)) throw new Error('The workout service returned unexpected data.');
  return workouts;
}

export async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unable to load this workout. Please try again.');
  const workout = await response.json();
  return workout?.id ? workout : null;
}
