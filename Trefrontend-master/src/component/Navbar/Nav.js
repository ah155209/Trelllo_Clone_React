import React from 'react';
import {AiOutlinePlus,AiOutlineQuestionCircle} from "react-icons/ai";
import {TbBellRinging2Filled} from "react-icons/tb";

import {CgProfile} from "react-icons/cg";
import {FaTrello}  from 'react-icons/fa'

import "./nav.scss"
import { useNavigate} from 'react-router-dom';

const NavBar= () => {
    const navigate= useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/Login');
  
  }

  const handlemore=()=>{
    
    
  }
    return ( <>
     <nav className="navbar sticky-top navbar-expand-md   ">
     <div className="container-fluid bg-dark  ">
     <div className="navbar-brand "  alt='Trello'> 
      <FaTrello /> <span>
      Trello
      </span>
     </div>
     <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"> </span>
     </button>
     <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Workspaces
          </a>
          <ul className="dropdown-menu ">
            <h6 className="dropdown-item">Your Workspaces</h6>
            <li><a className="dropdown-item " href="#">Trello Workspaces</a></li>

          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Recent
          </a>
          <ul className="dropdown-menu  ">
            <li><a className="dropdown-item " href="#">Action</a></li>
            <li><a className="dropdown-item " href="#">Another action</a></li>
            <li><a className="dropdown-item " href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Starred
          </a>
          <ul className="dropdown-menu  ">
            <li><a className="dropdown-item " href="#">Action</a></li>
            <li><a className="dropdown-item " href="#">Another action</a></li>
            <li><a className="dropdown-item " href="#">Something else here</a></li>
          </ul>
         </li>
         <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Templates
          </a>
          <ul className="dropdown-menu ">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item " href="#">Another action</a></li>
            <li><a className="dropdown-item " href="#">Something else here</a></li>
          </ul>
        </li>

      </ul>
      </div>
       <div className=' serach-b-div'>
       <form className="d-none d-md-flex form"  role="search">
       <div>
        <button className="btn-primary rounded-2 nav-btn" type="submit"> <AiOutlinePlus/> </button>
        </div>
      
        <div className='input-icon' >
        <input className="form-control me-2" type="search " placeholder="Search"aria-label="Search"/>
        </div>
      </form>
       </div>
      <div className='icons-main d-none d-lg-flex'>
        <div className='icon-div'>
      <TbBellRinging2Filled className="icons-lower"  size={25}/>
        </div>
        <div className='icon-div'>
      <AiOutlineQuestionCircle className="icons-lower"  size={25}/>
        </div>
      <div className='icon-div'>
      <CgProfile className="icons-lower"  size={25}/>
      </div>  
      </div>
      <div className='logout'>
           {
            localStorage.getItem('token')? <button className='logout-button btn-primary rounded-2' onClick={handleLogout}> Logout</button> : <button className='btn btn-primary rounded-2' onClick={handlemore}>more</button>
           }
      </div>

      </div>
     </nav>
    
    </> );
}
 
export default NavBar;