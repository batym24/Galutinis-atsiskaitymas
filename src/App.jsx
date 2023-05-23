import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Organisms/Header';
import Registration from './components/Pages/Registration';
import Login from './components/Pages/Login';
<<<<<<< HEAD
import Footer from './components/UI/Organisms/Footer';
=======
import Home from './components/Pages/Home';
import QuestionPage from './components/Pages/QuestionPage';
import UsersContext from './contexts/UsersContext';
import { useContext } from 'react';
import AskNewQuestion from './components/Pages/AskNewQuestion';
import EditAnswer from './components/Pages/EditAnswer';
import EditQuestion from './components/Pages/EditQuestion';
>>>>>>> 43440a8b7db46a3aae18742c0236a8a5bb40cd70

const App = () => {

  const {currentUser} = useContext(UsersContext)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/question/:id' element={<QuestionPage/>}/>
        <Route path='/askQuestion' element = {currentUser ? <AskNewQuestion/> : <Navigate to='/login'/>}/>
        <Route path='/editAnswer/:id' element= {<EditAnswer/>}/>
        <Route path='/editQuestion/:id' element= {<EditQuestion/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
