import { Navigate } from 'react-router';

import NotFound from '../../pages/404';
import DocumentApproval from '../../pages/DocumentApproval';

import Login from '../../pages/Login';
import MainLayout from '../../layouts/main/MainLayout';
import Navbar from '../../components/Navbar';
import NewApproval from '../../pages/NewApproval';


const mainRouter = [
  {
    path: '/avn/documentapproval',
    element: <MainLayout />,
    children: [
      {
        path: '/avn/documentapproval',
        Component: DocumentApproval,
      }

    ],
  },

  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/avn/documentapproval/new',
        Component: NewApproval,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/navbar',
    element: <Navbar />,
  },
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
];

export default mainRouter;
