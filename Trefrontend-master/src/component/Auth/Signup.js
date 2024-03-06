
import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
 
import {FcGoogle} from 'react-icons/fc'
import "./auth.scss"
  
const Auth = () => {

  const initialvalues ={name:"" ,email:"", password:"", confpass:""}
  const [formvalues, setformvalues] = useState(initialvalues)
  const [formerrors,setformerrors] = useState({})
  const [issubmit, setissubmit] = useState(false)
  let  navigate = useNavigate()

  const  validate =(values)=>{
     const errors={};
     const regex=  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
     if(!values.name){
      errors.name="Name is required *"
     }
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
     if(values.confpass !== values.password){
       errors.confpass = "does not match with the password *"
     }  else if(!values.confpass){
      errors.confpass = "Confirm password is required *"
     } 

  return errors;

  }

  
  useEffect(()=>{
      if(Object.keys(formerrors).length===0 &&issubmit){
        console.log(formvalues);
  }

},[formerrors])

   const handleChange =(e) => {
    const {name, value}=e.target
         setformvalues({...formvalues, [name]:value})
    
    }
    const handleSubmit = async(e) => {
      e.preventDefault();
       setformerrors(validate(formvalues));
       setissubmit(true);
       
      try{
       const data =await axios.post("http://localhost:5000/api/auth/signup",{
          name: formvalues.name,
          email: formvalues.email,
          password:formvalues.password 
          })
          
           if(data.status===200){
            alert("created successfully");
             navigate('/Dashboard/Tasks');
           }else {
            alert (data.data);
           }
      }
      catch(e){
      console.log(e);

      }
    

    }
 
    return (  
     <>
     <div className="trello-main-logo d-flex jsutify-content-center mx-auto">
    <img  className="logo-img" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"/>
   </div>
    <section className=" auth-container">
      <div className="container-md-signup">
      <div className="row">
       <div className="heading" >
         Sign up for your account
       </div>
       <form className="col" onSubmit={handleSubmit}>
      <div className="mb-3">
      <input type="text" name="name"  className="input" onChange={handleChange} placeholder="Enter your name" value={formvalues.name} required/>
      </div>
      <p className="text-danger">{formerrors.name}</p>
    <div className="mb-3">
      <input type="text" name="email"   onChange={handleChange}  className="input" placeholder="abcd@mail.com" value={formvalues.email} required/>
    </div>
    <p className="text-danger">{formerrors.email}</p>
    <div className="mb-3">
      <input type="password" name="password"   onChange={handleChange}  className="input " placeholder="Enter password" value={formvalues.password} required minLength={8}/>
    </div>
    <p className="text-danger">{formerrors.password}</p>
    <div className="mb-3">
      <input type="password" name="confpass" onChange={handleChange}  className="input" placeholder="Enter password again" value={formvalues.confpass} required minLength={8}/>
    </div>
     <p className="text-danger">{formerrors.confpass}</p>
     <div className="note" >
        <p>By clicking "Continue" above, you will agree to Atlassian <span><Link to="#">Cloud Terms of Service</Link></span> and acknowledge the <span><Link to="#">Privacy Policy</Link></span> .</p>
       </div>
     <button className='button account-button '> Continue</button>
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
<div className='create-acc'>
        <Link className="cret" to="/Login"> Already have an account?Log In</Link>
        </div>
    </form>
        
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
 
export default Auth;