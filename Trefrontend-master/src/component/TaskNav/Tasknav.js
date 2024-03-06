import React, { useState } from "react";
import"./tasknav.css"
import {AiOutlinePlus} from "react-icons/ai";

const Tasknav = () => {

    let [Projectname,setProjectname]= useState("Task Name")
    return ( 
        <nav class="navbar tasknav sticky-top navbar-expand-md   ">
        <div class="container-fluid ">
     <a class="navbar-brand " href="#"> {Projectname}</a>
     <button class="navbar-toggler bg-primary " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"> </span>
     </button>

     <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
      <li class="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Workspaces
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link " href="#" role="button" aria-expanded="false">
            Workspaces visible
          </a>
        </li>
        <li class="nav-item dropdown">
        <button className="nav-btn">Boards</button>
          <ul class="dropdown-menu text-secondary">
            <li><a class="dropdown-item " href="#">Action</a></li>
            <li><a class="dropdown-item " href="#">Another action</a></li>
            <li><a class="dropdown-item " href="#">Something else here</a></li>
          </ul>
         </li>


      </ul>
      
      <div>
        <button class="nav-btn" type="submit"> <AiOutlinePlus/> </button>
        </div>
      </div>
      </div>
     </nav>
     );
}
 
export default Tasknav;