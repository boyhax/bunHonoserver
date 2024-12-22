import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import ShopsPage from '../components/shops/shops-page';
import ShopPage from '../components/shops/shop-page';

export const shopsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'shops',
  component: ShopsPage,
});

export const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'shops/$shopId',
  component: ShopPage,
});

