import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function SiteFooter() {
  return <footer className="border-t border-white/10 bg-[#090a0d] py-8"><div className="container flex flex-col items-center justify-between gap-5 sm:flex-row"><Link href="/" className="flex items-center gap-2"><Image src={logo} alt="" className="h-6 w-auto" /><span className="display text-xl">FITLOG</span></Link><p className="text-center text-xs">© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>;
}
