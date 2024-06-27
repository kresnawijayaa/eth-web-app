import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Simulator from '../pages/Simulator';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Landing from '../pages/Landing';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
            <Landing />
        ),
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/simulator',
        element: (
          <ProtectedRoute>
            <Simulator />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:userId',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
