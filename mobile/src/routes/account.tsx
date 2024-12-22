import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import AccountPage from '@/components/account/account-page';

export const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'account',
  component: AccountPage,
});

