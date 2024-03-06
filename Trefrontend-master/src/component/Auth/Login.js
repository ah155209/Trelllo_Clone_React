import React, { useState,useEffect } from "react";
import "./auth.scss"
import { Link ,useNavigate} from "react-router-dom";

import {FcGoogle} from 'react-icons/fc'
// import {FaApple,FaMicrosoft,FaSlack} from 'react-icons/fa'
import axios from "axios";

const Login = () => {
  const initialvalues ={email:"", password:""}
  const [formvalues, setformvalues] = useState(initialvalues)
  const [formerrors,setformerrors] = useState({})
  const [issubmit, setissubmit] = useState(false)

  let navigate = useNavigate();

  const  validate =(values)=>{
    const errors={};
    const regex=  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    if(!values.email){
     errors.email = "Email is required *"
    } else if(!regex.test(values.email)){
        errors.email= "This is not a valid email *";

    };
    if(!values.password){
     errors.password = "Password is required *"
    }else if(values.password.length<=4){
     errors.password= "Password should have at least 8 characters";

 };
  

 return errors;

 }

 useEffect(()=>{
  if(Object.keys(formerrors).length===0 &&issubmit){
    console.log(formvalues);
}

},[formerrors])


const handleChange = (e) => {

  const{name,value}=e.target
  setformvalues({...formvalues, [name]:value})
}
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setformerrors(validate(formvalues));
    setissubmit(true);
  
    try{
    const userres=await axios.post("http://localhost:5000/api/auth/signin",{
      email: formvalues.email,
      password: formvalues.password
    })
    console.log('userres', userres);
    if (userres.data){
      localStorage.setItem("token", userres.data);
      navigate("/Dashboard/Tasks/");
     }
    
  }catch(e){
      console.log(e);
    }
  }

 
return (   
  <>
   <div className="trello-main-logo d-flex jsutify-content-center mx-auto">
    <img  className="logo-img" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"/>
   </div>
   <section>
       <div className="container contain-login">
      <div className="container-md">  
      <div className="row">
       <div className="heading" >
        Log in To Trello 
       </div>
       <div className="col">
    <form onSubmit={handleSubmit} >
     <div className="mb-3">
      <input type="text" name="email" onChange={handleChange}  className="input" placeholder="Enter Email" value={formvalues.email} required />
     </div>
     <p className="text-danger">{formerrors.email}</p>
     <div className="mb-3">
      <input  name="password" type="password" className="input " placeholder="Enter password"  onChange={handleChange} value={formvalues.password} required/>
     </div>
     <p className="text-danger">{formerrors.password
     }
     </p>
     <button type="submit" className='button account-button'>Continue</button>
    
        <div className="seprate"> OR </div>

      <button className='authbutton account-button button-green'><span><FcGoogle/></span>
         <span > Continue with Google</span>
      </button>
      <button className='authbutton account-button button-green'><span id="msft-icon">
        <img className="img-icons" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/72ece804e5285ab6507e2406157cda3c/microsoft-logo.svg" />
      </span>
         <span > Continue with Microsoft</span>
      </button>
      <button className='authbutton account-button button-green'>
          <span id="apple-icon">
            <img className="img-icons" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/6fc4ecf05a97cfb43cfcbb14738a5aa0/apple-logo-black.svg"/>
          </span>
         <span > Continue with Apple</span>
      </button>
      <button className='authbutton account-button button-green'><span id="Slack-icon"></span>
      <img className="img-icons" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/267584bf90783090ede8f337d9baf909/slack-logo.svg"/>
         <span > Continue with Slack</span>
      </button>
      <hr/>
       <ul className='create-acc'>
          <a className="forgotten a-tag" href="#">
          Can't log in?
          </a>
        <li className="li-tag">
        <Link to="/" className="sinup-a">Sign Up for an account</Link>
        </li>
        </ul>

     </form>
     </div>
      </div> 

     </div>
     <div className='below-tags'>
       <a href="#"> Privacy Policy</a> <br/>
       <li className="li-tag">
       <a href="#"> Terms of Service</a>
      </li>  
     </div>
     </div>
   </section>
     <footer className=" global-footer">
      <div className=" select-container">
           {/* <select name="language-picker" id="language-picker" aria-label="Select your language" >
              <option value="choose-one" id="choose" disabled="true">
                Select your language
              </option>
              <option value="cs" id="choose" disabled="true">
                Cestina
              </option>
              <option value="de" id="choose" disabled="true">
                Deutsch
              </option>
              <option value="en" data-url="" id="choose" disabled="true">
                English
              </option>
           </select> */}

      </div>
           <div>
          
          <img className="atlassian-logo-small"  src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" width={'150'} />
           </div>

         <ul className="global-footer-list">
           <li className="global-footer-item">
           <a> Templates</a>
           </li>
           <li className="global-footer-item" >
              <a> Pricing </a>
           </li>
           <li className="global-footer-item">
           <a> Apps </a>
           </li>
           <li className="global-footer-item">
           <a> Jobs</a>
           </li>
           <li className="global-footer-item">
           <a> Blog</a>
           </li>
           <li className="global-footer-item">
           <a> Developers</a>
           </li>
           <li className="global-footer-item">
           <a> About</a>
           </li>
           <li className="global-footer-item">
           <a> Help </a>
           </li>


         </ul>
     </footer>
    

  </>
);
}
 
export default Login;