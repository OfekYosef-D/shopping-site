import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage />,
  },
  // Add your other routes here when you create the components
  // {
  //   path: "/products",
  //   element: <Products />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/about", 
  //   element: <About />,
  //   errorElement: <ErrorPage />,
  // }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)