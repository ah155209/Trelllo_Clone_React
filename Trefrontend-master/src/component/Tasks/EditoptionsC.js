import React,{useRef,useState} from "react";

import Modal from 'react-modal';

// importing style sheet
import "./cards.scss";

import a from "axios"

// importing icons
import {ImCross} from "react-icons/im"
import { PiCreditCard } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import {MdLabel} from"react-icons/md";
import { FaTrash } from "react-icons/fa";
import { AiFillClockCircle,AiTwotoneCopy,AiOutlineArrowRight } from "react-icons/ai";


const EditoptionsC = ({
  editbtn,
  onCloseedit,
  onclickaddlist,
  citbed,
  ited

}) => {
   
  const [moveon,setMoveon]=  useState("")
  
  const high =useRef('1')
  const medium =useRef('2')
  const low = useRef('3')

  const [label, setlabel] = useState(false);
  

  const onchangelabel=()=>{
    if(ited._id===citbed){
      if(!ited.priority) return null
      if(ited.priority===high){
        high.current.style.background="#091e420f" 
      }
      if(ited.priority===medium){
        medium.current.style.background="#091e420f"
      }if(ited.priority===low){
        low.current.style.background="#091e420f"
      }
    }
  }

 const  handlesave=()=>{
    onCloseedit();
 }

 const host = "http://localhost:5000/api/tasks";

 const handledelete = async () => {
   try {
     const response = await a.delete(`${host}/deletetask/${citbed}`, {
       headers: {
         authorization: localStorage.getItem("token"),
         _id: `${citbed}`,
       },
     });

   } catch (err) {
     
   }
   onCloseedit();
   onclickaddlist();
 };

 const handleCopy =()=>{
  navigator.clipboard.writeText(ited.textmessage)
  .then(() => {
    console.log('Text copied to clipboard');
    alert("copied")
    handlesave();
  })
  .catch((error) => {
    console.error('Copy failed:', error);
  });
 }
 Modal.setAppElement('#root'); 
  // if (!editbtn) return null;

  return (
    <>   
      < Modal
        isOpen={editbtn}
        onRequestClose={handlesave}
        contentLabel="Options Card Modal"
        className="custom-modal"
        style={{
          content: {
            // Add your custom styles here
            position: 'absolute',
            top:'20%',
            left:'30%',
            width:'35%',
            background:"#ebecf0",
            border:"none",
            borderRadius:"1rem",
            justifyContent:"center"
          },
          overlay: {
            // Add styles for the overlay here
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
    <div>
      <div className="card coptal">
           <div className="closingoptine" onClick={handlesave}>  < ImCross/>
            </div> 
          <div className="ele"><PiCreditCard/>Open card 
          </div>
          <div className="ele"><MdLabel/>Edit label</div>
          <div className="ele"> <BsPersonFill/>Change members</div>
          <div className="ele"> <AiOutlineArrowRight/>Move</div>
          <div className="ele" onClick={handleCopy}> <AiTwotoneCopy/>Copy</div>
          <div className="ele"><AiFillClockCircle/>Edit dates</div>
          <div className="ele " onClick={handledelete}>
              <FaTrash
                className="del-btn"
              />
            Delete
          </div>
        <button className="save-btn btn-primary rounded-2" onClick={handlesave}>Save</button>
      </div>
        </div>
        </Modal>
    </>
  );
};

export default EditoptionsC;
