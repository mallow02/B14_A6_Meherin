import Image from "next/image";
import { ArrowDown, Dumbbell } from "lucide-react";
import banner from "../assets/banner.png";
import WorkoutLibrary from "../components/WorkoutLibrary";

export default function HomePage() {
  return (
    <>
      <section className="site-container my-10 grid items-center gap-8 overflow-hidden rounded-2xl border border-white/10 bg-[#11151b] p-6 md:grid-cols-2 md:p-14">
        <div>
          <span className="eyebrow">
            <Dumbbell size={16} /> WORKOUT LIBRARY
          </span>
          <h1 className="mt-5 text-4xl leading-none tracking-tight lg:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="mt-5 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="button primary mt-6">
            <ArrowDown size={16} /> BROWSE WORKOUTS
          </a>
        </div>
        <Image
          src={banner}
          alt="Illustration of an athlete using a preacher curl machine"
          priority
          className="h-72 w-full rounded-xl object-contain md:h-96"
        />
      </section>
      <section id="library" className="site-container scroll-mt-6 pb-20">
        <h2>THE LIBRARY</h2>
        <p>Twelve lifts covering every major muscle group.</p>
        <WorkoutLibrary />
      </section>
    </>
  );
}
