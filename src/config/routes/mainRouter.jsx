import DocumentApproval from "../../pages/DocumentApproval"

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
    // {
    //   path: '/not-found',
    //   element: <NotFound />,
    // },
]

export default mainRouter;