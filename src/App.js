import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/index.jsx';
import Homepage from './pages/Homepage/index.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  );
}

export default App;
