import React from 'react'
// Importing components 
import Data from "./Tasks/Data"
import NavBar from './Navbar/Nav'
import "./../App.scss"

export default function Taskboard() {
  return (
    <>
      <NavBar className="main-nav"/>  
      <div className='task-div'>
        {/* <div className='task-nav'>
        <Tasknav/>
        </div> */}
        <div className='display-cards-task' id='root'>
        <Data/>
        </div>
      </div>
    </>
  )
}
