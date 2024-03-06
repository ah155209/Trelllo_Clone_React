import React, { useState, useMemo } from "react";
// importing axios to deal with  APIS
import a from "axios";
// import Task from './Task';`
import "./optionalcard.scss";
import Modal from 'react-modal';
// importing Icons
import { FaTrello } from "react-icons/fa";
import {ImCross} from "react-icons/im"

Modal.setAppElement('#root'); 

const Edit = ({
  cecard,
  column,
  onclickaddlist,
  onClosethis,
  tdata,
  taskte,
}) => {
  const [taskData, setTaskData] = useState({});

  useMemo(() => {
    setTimeout(() => {
      setTaskData(tdata);
    }, 100)



  }, [cecard]);

  const host = "http://localhost:5000/api/tasks/";
    
 
  const onchange = (e) => {
    const { name, value } = e.target;

    console.log('====================================');
    console.log(name , value, "i am the data in edit ");
    console.log('====================================');
    setTimeout(() => {
      
      setTaskData({ ...taskData, [name]: value });
    }, 100);
  };
    
      
  const handleonedit = async (e) => {
    e.preventDefault();
    try {
      const updatetask = await a.put(
        `${host}updatetask/${taskte}`,
        {
          _id: taskte,
          status: column.title,
          priority: "",
          textmessage: taskData.textmessage,
          workstart:taskData.workstart,
          expire:taskData.expire,
          position: "",
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }

        );
        console.log(updatetask)
    } catch (err) {
      // alert("There was an error while add new task")
      console.log(err);
    }
    onClosethis();
    onclickaddlist();
  };

  const handleclose = () => {
    onClosethis();
    console.log("I am Clicked after close function");
  };
  
     
  // if (!cecard) return null;
  return (
    <>
       <Modal
        isOpen={cecard}
        onRequestClose={handleclose}
        contentLabel="Options Card Modal"
        className="custom-modal"
        style={{
          content: {
            // Add your custom styles here
            position: 'absolute',
            top:'20%',
            left:'35%',
            right:'15%',
            width:'fit-content',
            background:"#ebecf0",
            border:'none',
            borderRadius:"1rem",
            justifyContent:"center"
          },
          overlay: {
            // Add styles for the overlay here
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
      <div className="card ">
        <div className="row">
          <div className="col row-col">
            <FaTrello size={"30px"} className="form-label-icon" />
            <textarea
              type="text"
              name="textmessage"
              className=" input-edit"
              placeholder="Content"
              onChange={onchange}
              value={taskData.textmessage}
            />
            <div
              type="submit"
              className="close-tag btn-transparent"
              onClick={handleclose}
            >
              <ImCross/>
            </div>
          </div>
          <div className="nameofcolumn">
            in list<span className="colname"> {column.title}</span>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-3 col-lg-10 dates-div">
            <div className="start-label">
              <label className="form-label">Starting date</label>
              <input
                type="date"
                name="workstart"
                className="input-dates"
                placeholder="Starting Date"
                onChange={onchange}
                value={taskData.workstart}
              />
            </div>
            <br />
            <div className=" end-label">
              <label className="form-label ">Last date</label>
              <input
                type="date"
                name="expire"
                className="input-dates-last "
                placeholder="Last date"
                onChange={onchange}
                value={taskData.expire}
              />
            </div>
          </div>
        </div>
        <div className=" row bt-div">
          <button
            type="submit"
            className="up-btn btn-primary rounded-2 "
            onClick={handleonedit}
          >
            Update
          </button>
        </div>
      </div>
      </Modal>
    </>
  );
};

export default Edit;
