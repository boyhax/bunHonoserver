import { rootRoute } from './routes/root';
import { homeRoute } from './routes/home';
import { shopsRoute, shopRoute } from './routes/shops';
import { productsRoute, productRoute } from './routes/products';
import { aboutRoute } from './routes/about';
import { authGoogleCallbackRoute, authRoute } from './routes/auth';
import AccountPage from './components/account/account-page';
import { accountRoute } from './routes/account';

export const routeTree = rootRoute.addChildren([
  homeRoute,
  shopsRoute,
  shopRoute,
  productsRoute,
  productRoute,
  aboutRoute,
  accountRoute,
  authRoute.addChildren([authGoogleCallbackRoute]),

])


