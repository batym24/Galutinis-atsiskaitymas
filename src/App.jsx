import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Organisms/Header';
import Registration from './components/Pages/Registration';
import Login from './components/Pages/Login';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
