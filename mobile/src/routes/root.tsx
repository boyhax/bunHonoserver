import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/landing/header';
import Footer from '../components/landing/footer';

export const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  ),
});

