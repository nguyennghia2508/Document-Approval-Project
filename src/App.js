import { useDispatch } from "react-redux";
import { publicRouter } from "./config/routes/index"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { resetTabview } from "./redux/features/tabviewSlice"
import { useEffect } from "react";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Dispatch the reset action when the tab is closed
      dispatch(resetTabview());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {publicRouter.map((routers) => {
          return routers.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index}>
                {route.index ? <Route index element={route.index} /> : null}
                {route.children
                  ? route.children.map(({ path, Component }, index) => {
                    return (
                      <Route
                        path={path}
                        element={<Component />}
                        key={index}
                      />
                    );
                  })
                  : null}


              </Route>
            );
          });
        })}
      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router>
  );
}

export default App;
