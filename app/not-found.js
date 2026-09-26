import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return <div className="container page empty"><span className="eyebrow">404 · OFF THE REP PATH</span><h1 className="mt-5">WORKOUT NOT FOUND</h1><p className="mt-4">This page does not exist. Find your next lift in the library.</p><Link href="/" className="button primary"><ArrowLeft size={16} />Go to workouts</Link></div>;
}
