import React,{ useState } from 'react';
import './App.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Login } from './components/login';
import { SignUp } from './components/signup';
import { Topnavbar } from './components/topnavbar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Dashboard } from './components/dashboard/details';
import { ForgotPassword } from './components/forgotpassword';
import { ResumeDisplay } from './components/dashboard/resume/display';
import { useSelector } from "react-redux"
function App() {
  const [username, setUserName] = useState('');

  const handleName = (username) => {
    // console.log('uname:',username);
    setUserName(username)
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={
          <Topnavbar user={username}>
            <Login/>
          </Topnavbar>
        }/>
        <Route exact path='/forgotpassword' element={
          <Topnavbar user={username}>
            <ForgotPassword />
          </Topnavbar>
        }/>
        <Route exact path='/signup' element={
          <Topnavbar user={username}>
            <SignUp/>
          </Topnavbar>
        }/>
        <Route exact path='/dashboard/:userId' element={
          <Topnavbar user={username}>
            <Dashboard handleName={handleName}/>
          </Topnavbar>
        }/>
        <Route exact path='/template/:userId' element={
          <ResumeDisplay/>
        }/>
        <Route path='*' element={
          <Navigate to='/login' replace />
        }/>
      </Routes>
    </Router>
  );
}

export default App;