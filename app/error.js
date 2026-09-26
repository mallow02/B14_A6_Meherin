"use client";
import Link from "next/link";
export default function ErrorPage({ reset }) {
  return (
    <div className="site-container page empty" role="alert">
      <h1>LET&apos;S TRY THAT AGAIN</h1>
      <p className="mt-4">
        We couldn&apos;t load this workout. Please check your connection and try
        again.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={reset} className="button primary">
          Try again
        </button>
        <Link href="/" className="button">
          Go to workouts
        </Link>
      </div>
    </div>
  );
}
