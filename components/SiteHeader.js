'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from './PlanProvider';
import logo from '../assets/logo.png';

export function Brand() {
  return <Link href="/" className="flex items-center gap-2" aria-label="FitLog home"><Image src={logo} alt="" className="h-8 w-auto" /><span className="display text-2xl tracking-wide">FITLOG</span></Link>;
}
export default function SiteHeader() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  return <header className="border-b border-white/10 bg-[#0f1115]">
    <div className="container flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
      <Brand />
      <nav aria-label="Main navigation" className="order-3 flex w-full justify-center gap-8 sm:order-none sm:w-auto">
        <Link href="/" aria-current={path === '/' ? 'page' : undefined} className={path === '/' ? 'font-semibold text-[#ccff00]' : 'muted'}>Workout</Link>
        <Link href="/my-plan" aria-current={path === '/my-plan' ? 'page' : undefined} className={path === '/my-plan' ? 'font-semibold text-[#ccff00]' : 'muted'}>My Plan</Link>
      </nav>
      <div className="flex gap-2 text-xs font-semibold">
        <Link href="/my-plan" className="rounded-full bg-[#ccff00] px-4 py-2 text-black">Plan <span className="ml-2">{plan.length}</span></Link>
        <Link href="/my-plan?tab=saved" className="rounded-full border border-white/20 px-4 py-2">Saved <span className="ml-2">{saved.length}</span></Link>
      </div>
    </div>
  </header>;
}
