import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy load the App component
const App = lazy(() => import('./App.jsx'))
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage.jsx'))
const ProductsPage = lazy(() => import('./components/ProductsPage/ProductsPage.jsx'))


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [{
      index: true,
      element: (
        <Suspense fallback={<div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>Loading Landing Page...</div>}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: "/products",
      element: (
        <Suspense fallback={<div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>Loading Products...</div>}>
          <ProductsPage />
        </Suspense>
      ),
      //errorElement: <ErrorPage />,
    },
    ]
  },
  // Add your other routes here when you create the components

  // Add more routes here as needed
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)