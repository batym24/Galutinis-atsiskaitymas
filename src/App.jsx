import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Organisms/Header';
import Registration from './components/Pages/Registration';
import Login from './components/Pages/Login';
import Home from './components/Pages/Home';
import QuestionPage from './components/Pages/QuestionPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/question/:id' element={<QuestionPage/>}/>
      </Routes>
    </>
  );
}

export default App;
