import MainLayout from '../../layouts/main/MainLayout';
import SystemLayout from '../../layouts/system/SystemLayout';
import DocumentApproval from '../../pages/DocumentApproval';
import Login from '../../pages/Login';
import NewApproval from '../../pages/NewApproval';
import Test from '../../components/Test';
import ViewDocument from '../../pages/ViewDocument';
import EditDocument from '../../pages/EditDocument';
import PDFViewer from '../../components/PdfViewer';
import Setting from '../../pages/Setting';
import SystemEmployee from '../../pages/SystemEmployee';



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
    path: '/setting',
    element: <SystemLayout />,
    children: [
      {
        path: '/setting',
        Component: Setting,
      },
      {
        path: '/setting/system/employee',
        Component: SystemEmployee,
      },


    ],
  },

  {
    path: '/',
    element: <Test />
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/test/:id',
    element: <PDFViewer />,
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
