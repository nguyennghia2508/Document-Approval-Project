import { Navigate } from 'react-router';

import NotFound from '../../pages/404';
import DocumentApproval from '../../pages/DocumentApproval';

import Login from '../../pages/Login';
import MainLayout from '../../layouts/main/MainLayout';
import NewApproval from '../../pages/NewApproval';
import Test from '../../components/Test';
import ViewDocument from '../../pages/ViewDocument';
import EditDocument from '../../pages/EditDocument';


const mainRouter = [
  {
    path: '/avn',
    element: <MainLayout href="/avn/documentapproval" />,
    children: [
      {
        path: '/avn/documentapproval',
        Component: DocumentApproval,
      },
      {
        path: '/avn/documentapproval/new',
        Component: NewApproval,
      },
      {
        path: '/avn/documentapproval/view/:id',
        Component: ViewDocument,
      },
      {
        path: '/avn/documentapproval/edit/:id',
        Component: EditDocument,
      },

    ],
  },

  {
    path: '/',
    element: <MainLayout />
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  // {
  //   path: '*',
  //   element: <Navigate to='/404' />,
  // },
  // {
  //   path: '/404',
  //   element: <NotFound />,
  // },
];

export default mainRouter;
