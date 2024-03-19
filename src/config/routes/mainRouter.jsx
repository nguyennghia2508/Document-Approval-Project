import DocumentApproval from '../../pages/DocumentApproval';
import Login from '../../pages/Login';

const mainRouter = [
  {
    path: '/',
    //   element: <MainLayout />,
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
  // {
  //   path: '/not-found',
  //   element: <NotFound />,
  // },
];

export default mainRouter;
