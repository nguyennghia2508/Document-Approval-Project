import {publicRouter} from "./config/routes/index"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
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
    </Router>
  );
}

export default App;
