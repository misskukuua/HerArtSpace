import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Resources from './components/Resources';
import Navbar from './components/Navbar'; 
import './index.css'; 
import Messages from './components/Messages';

// App Layout with Navbar
const AppLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet /> {}
  </>
);

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    element: <AppLayout />, 
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/resources',
        element: <Resources />,
      },

      {
        path: '/messages',
        element: <Messages />,
      },

    ],
  },
  {
    path: '/', // Login page as the root
    element: <SignUpPage />,
  },
  {
    path: '/login', // Also allow login via /login
    element: <LoginPage />,
  },
  {
    path: '/signup', // Sign-up page
    element: <SignUpPage />,
  },
]);

// The App component (default export)
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

// Render the App component
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
