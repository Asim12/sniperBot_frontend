import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <ToastContainer/>
        <App />
        </PersistGate>
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
