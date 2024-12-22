import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import LandingPage from '../components/landing/landing';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

