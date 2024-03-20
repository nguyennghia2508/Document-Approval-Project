import { Navigate } from 'react-router';
import NotFound from '../../pages/404';
import DocumentApproval from '../../pages/DocumentApproval';
import Homepage from '../../pages/Homepage';
import Login from '../../pages/Login';
import Header from '../../pages/Header';
import Sidebar from '../../pages/Sidebar';
import Footer from '../../pages/Footer';


const mainRouter = [
  {
    path: '/',
    element: <Homepage />,
    children: [
      {
        path: '/avn/documentapproval',
        Component: DocumentApproval,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
