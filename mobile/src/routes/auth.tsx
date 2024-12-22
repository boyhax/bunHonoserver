import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import AuthPage from '@/components/auth/auth-page';
import GoogleCallbackPage from '@/components/auth/google-callback';

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
  component: AuthPage,

})

export const authGoogleCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth/google-callback',

  component: GoogleCallbackPage,

})
