import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
