import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Organisms/Header';
import Registration from './components/Pages/Registration';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/register' element={<Registration/>}/>
      </Routes>
    </>
  );
}

export default App;
