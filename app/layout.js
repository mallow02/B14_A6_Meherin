import './globals.css';
import PlanProvider from '../components/PlanProvider';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: { default: 'FitLog — Workout Library', template: '%s | FitLog' },
  description: 'Train with intent. Browse twelve lifts, build your daily plan, and log every set.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><PlanProvider><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></PlanProvider></body></html>;
}
