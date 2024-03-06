import React, { useEffect } from "react";
// importing components
import Auth from './component/Auth/Signup'
import Login from './component/Auth/Login'
import './App.scss';
// import NavBar from './component/Navbar/Nav';
// import Data from './component/Tasks/Data';
// import Tasknav from "./component/TaskNav/Tasknav"
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Taskboard from './component/Taskboard';

function App() { 
  const token = localStorage.getItem('token');
  console.log('token', token);
  // eslint-disable-next-line no-undef
 useEffect(()=>{

  if(token){
    console.log('token available', token);
    <Navigate to='/Dashboard/Tasks'/>
  }else{
    console.log('inside else case');
    <Navigate to='/Login'/>}
 },[])
  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/Login" element={<Login/>}/>
            <Route  path="/Dashboard/Tasks" element={ <Taskboard/> } />
          </Routes>
        </Router>
 

    </>
  );
}

export default App;
