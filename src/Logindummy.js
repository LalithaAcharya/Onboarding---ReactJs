
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Logindummy = () => {

    const [username,usernameupdate]=useState("");
    const [password,passwordupdate]=useState("");
    const [name,nameupdate]=useState("");
    const [phone,phoneupdate]=useState("");
   const navigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    })

    const ProceedLogin=(e)=>{
        e.preventDefault();
        if(validate()){
                   fetch("http://localhost:8000/user/" + username).then((res)=>{
                    return res.json();
                   }).then((resp)=>{
                    console.log(resp)
                    if(Object.keys(resp).length===0){
                        toast.error("Please enter valid user");
                    }else{
                        if(resp.password === password){
                            toast.success("You have Logged in sucessfully");
                            sessionStorage.setItem('username',username);
                            sessionStorage.setItem('userrole',resp.role);
                            navigate('/dashboard')
                        }else{
                            toast.error("please enter the valid crediantials")
                        }
                    }
                   }).catch((err)=>{
                    toast.error("Login failed due to :" +err.message)
                   })
                }
    }

   
   

    const validate=()=>{
        let result=true;
        if(username === '' || username == null){
            result=false;
            toast.warning("Please Enter Username");
        }
        if(password === '' || password == null){
            result=false;
            toast.warning("Please Enter password");
        }
        return result;
        
    }


    // const signUpButton = document.getElementById("signUp");
    // const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    
    // signUpButton.addEventListener("click", () => {
    //   container.classList.add("right-panel-active");
    // });
    
    // signInButton.addEventListener("click", () => {
    //   container.classList.remove("right-panel-active");
    // });

    const handleClick=()=>{
        const container = document.getElementById("container");
        container.classList.add("right-panel-active");

    }
    const handleSignInClick=()=>{
        const container = document.getElementById("container");
        container.classList.remove("right-panel-active");
    }

  return (
    <div className='body-container'>
<div className="container account-container" id="container">
  <div className="formContainer sign-up-container">
    <form action="#" className="loinform">
      <h1>Create Account</h1>
     
      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
    </form>
  </div>
  <div className="formContainer sign-in-container">
  <form onSubmit={ProceedLogin}>
            {/* <div className="header">
                <h1>Login</h1>
            </div> */}
            <div className="fields">
            <div class="form-group">
                <label for="exampleInputEmail1">User Name</label>
                <input value={username} onChange={e=>usernameupdate(e.target.value)} type="text" class="form-control" id="exampleInputEmail1"  placeholder="Enter User Name"></input>
               
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value={password} onChange={e=>passwordupdate(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>


            {/* <div className="submit">
            <button type="submit"  class="button">Submit</button>
            </div> */}

            </div>
        
      <button className='btn' type="submit" >Sign In</button>
    </form>
  </div>
  <div className="overlay-container">
    <div className="overlay">
      <div className="overlay-panel overlay-left">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button className="ghost btn" onClick={handleSignInClick}id="signIn">Sign In</button>
      </div>
      <div className="overlay-panel overlay-right">
        <h1>Hello, Explorer!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button className="ghost btn" id="signUp" onClick={handleClick}>Sign Up</button>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default Logindummy;
