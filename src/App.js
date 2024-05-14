import { useDispatch } from "react-redux";
import { publicRouter } from "./config/routes/index"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { resetTabview } from "./redux/features/tabviewSlice"
import { useEffect } from "react";
import { hubConnection } from 'signalr-no-jquery';

const connection = hubConnection("https://localhost:44389/signalr")
const hubProxy = connection.createHubProxy('SignalRHub')

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

  const signalRConnection = () => {
    connection.start()
      .done(() => {
        console.log('SignalR connected');
        try {
          console.log("sending message");
        } catch (e) {
          console.log("Errors sending message", e);
        }
      })
      .fail((error) => {
        console.error('SignalR connection error: ' + error);
      });
  };

  hubProxy.on("addNewMessage", (method, sender, message) => {
    console.log(`Received message from ${sender}: ${message} with method: ${method}`);
  });

  useEffect(() => {
    signalRConnection()
  }, [])

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
