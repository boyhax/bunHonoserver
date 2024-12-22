import { IonApp, setupIonicReact } from '@ionic/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import Ionic CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

// Theme variables
import './theme/variables.css';
import { routeTree } from './routeTree';
import { Toaster } from './components/ui/toaster';
import { initClient } from './lib/client';


setupIonicReact();

const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const client = initClient({ path: 'http://localhost:8080/api', authConfig: {} })

const App: React.FC = () => (

  <IonApp className="h-screen flex flex-col overflow-hidden">

    <RouterProvider router={router} />

    <Toaster />
  </IonApp>

);

export default App;

