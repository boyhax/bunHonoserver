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
import Client from './lib/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useAuth } from './store/auth';
import { apiurl } from './lib/api';

import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { authClient } from './lib/client/auth';
import { Session } from './types';
const EventSourcepoly = NativeEventSource || EventSourcePolyfill;
// global.EventSource = NativeEventSource || EventSourcePolyfill;

setupIonicReact();

const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const Queryclient = new QueryClient({});
const session = useAuth.getState().session

export const client = Client;
client.path = apiurl()

function onAuthChange(session: Session | null) {
  useAuth.setState({ session })
}
client.auth = authClient(client, { session, onAuthChange });



const App: React.FC = () => (

  <IonApp className="h-screen flex flex-col overflow-hidden">
    <QueryClientProvider client={Queryclient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </IonApp>

);

export default App;

