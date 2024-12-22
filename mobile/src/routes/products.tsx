import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import ProductsPage from '../components/products/products-page';
import ProductPage from '../components/products/product-page';

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'products',
  component: ProductsPage,
});

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'products/$productId',
  component: ProductPage,
});

