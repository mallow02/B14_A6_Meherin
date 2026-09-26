import './globals.css';

export const metadata = {
  title: { default: 'FitLog — Workout Library', template: '%s | FitLog' },
  description: 'Train with intent. Browse twelve lifts, build your daily plan, and log every set.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
