// importing axios to deal with  APIS
import a from "axios";
//  Component import
import React, {  useState, } from "react";
// import Task from './Task';`
import Edit from "./Edit";
import EditoptionsC from "./EditoptionsC";
import Optionscards from "./Optionscards";
import Modaltry from "./Modaltry";
// import Libr from "./LibrModal"
// importing style sheet
import "./cards.scss";
//  importing compponents from  react beautiful Dnd
import { Draggable, Droppable } from "react-beautiful-dnd";
//  import from react bootstrap
import { Container, Card } from "react-bootstrap";
// importing Icons

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function Cardcolumn(props) {

  const host = "http://localhost:5000/api/tasks";
  const [inputText, setInputText] = useState("");
  // using to display or hide the : and  options component
  const [optional, setOptional] = useState(false);
  const [optionalbtn, setOptionalbtn] = useState(true);
  // using to display or hide the editsign and edit component
  const [edit, setEdit] = useState(true);
  const [editbtn, setEditbtn] = useState(false);
  const [cecard, setCecard] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [citbed, setCitbed] = useState("");
  const [ited, setIted] = useState("");
  let [taskte, setTaskte] = useState("");
  const [tdata, settdata] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API calls
  const addList = async (inputText) => {

    try {
      if (inputText !== "") {
        let addedtask = await a.post(
          `${host}/addtask`,
          {
            status: props.column.title,
            textmessage: inputText,
            priority: "",
            workstart: "",
            expire: "",
        
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );
      }
    } catch (err) {
      // alert("There was an error while add new task")
    }
  };

  // Other Functions
  const onchange = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const openModal = () => {
    setOptionalbtn(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOptionalbtn(true);
    setIsModalOpen(false);
  };
  const handleonclick = (e) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      addList(inputText);
      setInputText("");
      setTimeout(() => {
        props.onclickaddlist();
      }, 100);
    }
  };




    
  return (
    <>
      <Container className="main-card-container" >
        <div className=" main-option-div">
          <Card.Title className="title-of-card">
            {props.column.title}

          </Card.Title>
          <div className="opt-div">
            {optionalbtn && (
              <button
                type="button"
                className="options-btn btn"
                onClick={openModal}
              >
                ...
              </button>
            )}
            <Optionscards
              className="option-card-view"
              optional={optional}
              isOpen={isModalOpen} 
              onClose={closeModal}
            />
          </div>
        </div>

        <Droppable droppableId={props.column.id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-area"
            >
              <div className="card-body">
                {props.tasks.map((task, index) => {
                  return (
                    <Draggable
                      key={task._id}
                      draggableId={task.row}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="inner-card-component"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="card-text  d-flex">
                            <div className="edit-btn">
                              <div className="edit-btn-in-div">
                                {edit && (
                                  <MdEdit
                                    className="edit-sign"
                                    onClick={() => {
                                      setCitbed(task._id);
                                      setIted(task);
                                      setEdit(false);
                                      setEditbtn(true);
                                    }}
                                  />
                                )}
                                <EditoptionsC
                                  column={props.column}
                                  citbed={citbed}
                                  onclickaddlist={props.onclickaddlist}
                                  id={task._id}
                                  ited={ited}
                                  task={task}
                                  index={index}
                                  editbtn={editbtn}
                                  onCloseedit={() => {
                                    setEditbtn(false);
                                    setEdit(true);
                                  }}
                                />
                              </div>
                            </div>

                            <div
                              className="text-div-in-card justify-content-start"
                              onClick={() => {
                                setTaskte(task._id);
                                settdata(task);
                                setCecard(true);
                              }}
                            >
                              {task.textmessage}

                              <div>
                                <Edit
                                  tdata={tdata}
                                  cecard={cecard}
                                  column={props.column}
                                  onclickaddlist={props.onclickaddlist}
                                  taskte={taskte}
                                  editbtn={editbtn}
                                  onClosethis={() => {
                                    setTimeout(() => setCecard(!cecard), 100);
                                  }}
                                />
                              </div>
                            </div>

                            {/* <div className="btn rounded-1">
                              {
                                hasData && (
                                  <div>
                                   <input
                                    type="radio"
                                    name="option"
                                    value={task.expire}
                                    onClick={handleratiobtn}
                                  />
      
                                </div>
                              )}
                           
                             </div> */}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="input-container">
          <div className="input-div">
            <input
              type="text"
              className="input-box-todo"
              placeholder="+ Add Card"
              value={inputText}
              onKeyDown={handleonclick}
              onChange={onchange}
            />
            {/* <button
              className="btn button-Add-input btn-primary rounded-3 h-25"
              onClick={handleonclick}
            >
              {" "}
              Add
            </button> */}
            {/* <HiTemplate color='grey' size={25}  onClick={handleonclickicon} /> */}
          </div>
        </div>
      </Container>
    </>
  );
}
