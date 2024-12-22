import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import AboutPage from '../components/about/about-page';

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: AboutPage,
});

