import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy load the App component
const App = lazy(() => import('./App.jsx'))
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage.jsx'))
const ProductsPage = lazy(() => import('./components/ProductsPage/ProductsPage.jsx'))

// Placeholder components for missing routes
const SearchPage = () => <div style={{ padding: '2rem', textAlign: 'center' }}>Search functionality coming soon!</div>
const AboutPage = () => <div style={{ padding: '2rem', textAlign: 'center' }}>About page coming soon!</div>
const ProfilePage = () => <div style={{ padding: '2rem', textAlign: 'center' }}>Profile page coming soon!</div>
const NotFoundPage = () => <div style={{ padding: '2rem', textAlign: 'center' }}>Page not found!</div>

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
    children: [
      {
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
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/about", 
        element: <AboutPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)