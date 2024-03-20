import DocumentApproval from '../../pages/DocumentApproval';
import Login from '../../pages/Login';
import Header from '../../pages/Header';
import Sidebar from '../../pages/Sidebar';
import Footer from '../../pages/Footer';


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
  {
    path: '/header',
    element: <Header />,
  },
  {
    path: '/sidebar',
    element: <Sidebar />,
  },
  {
    path: '/footer',
    element: <Footer />,
  },


  // {
  //   path: '/not-found',
  //   element: <NotFound />,
  // },
];

export default mainRouter;
