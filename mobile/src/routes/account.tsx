import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import AccountPage from '@/components/account/account-page';
import { ProductManager } from '@/components/account/manageProducts';

export const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'account',
  component: AccountPage,
});

export const accountProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'account/products',
  component: ProductManager,
});

