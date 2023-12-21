import { useNavigate } from "react-router-dom";
import './Login.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
    const [username,usernameupdate]=useState("");
    const [password,passwordupdate]=useState("");
    const [name,nameupdate]=useState("");
    const [phone,phoneupdate]=useState("");
   const navigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    })

    const container = document.getElementById("container");
    
   
    const handleClick=()=>{
        const container = document.getElementById("container");
        container.classList.add("right-panel-active");

    }
    const handleSignInClick=()=>{
        const container = document.getElementById("container");
        container.classList.remove("right-panel-active");
    }

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

   const ProceedCandidateLogin=(e)=>{
        e.preventDefault();
        if(validateCandidate()){
            fetch("http://localhost:8000/employeeList?name=" + name).then((res)=>{
             return res.json();
            }).then((resp)=>{
             console.log(resp)
             if(Object.keys(resp).length===0){
                 toast.error("Please enter valid candidate Name");
             }else{
                console.log(resp.phone,phone)
                 if(resp[0].phone === phone){
                     toast.success("You have Logged in sucessfully");
                     sessionStorage.setItem('username',name);
                     sessionStorage.setItem('candidate',resp[0].id);
                    //  sessionStorage.setItem('userrole',resp.role);
                     navigate(`/candidate-dashboard/${resp[0].id}`)
                 }else{
                     toast.error("please enter the valid phone Number")
                 }
             }
            }).catch((err)=>{
             toast.error("Login failed due to :" +err.message)
            })
         }
    }

   
   
  
    const validateCandidate=()=>{
        let result=true;
        if(name === '' || name == null){
            result=false;
            toast.warning("Please Enter Candidate name");
        }
        if(phone === '' || phone == null){
            result=false;
            toast.warning("Please Enter phone number");
        }
        return result;
        
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

  return (
    // <div>
    //   <div className="container login">
    //     <div className="container form-container">

    //     <form onSubmit={ProceedLogin}>
    //         <div className="header">
    //             <h1>Login</h1>
    //         </div>
    //         <div className="fields">
    //         <div class="form-group">
    //             <label for="exampleInputEmail1">User Name</label>
    //             <input value={username} onChange={e=>usernameupdate(e.target.value)} type="text" class="form-control" id="exampleInputEmail1"  placeholder="Enter User Name"></input>
               
    //         </div>

    //         <div class="form-group">
    //             <label for="exampleInputPassword1">Password</label>
    //             <input value={password} onChange={e=>passwordupdate(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
    //         </div>


    //         <div className="submit">
    //         <button type="submit"  class="button">Submit</button>
    //         </div>

    //         </div>
    //     </form>

    //     </div>
    //     <div className="container image-container ">
    //         <img src='https://cdn.continusys.com/c-ibms/wp-content/uploads/sites/5/2021/05/14175614/banner-2.png' width="480px" height="480px"></img>
            
    //         </div>

    //   </div>
    // </div>

    <div className='body-container'>
    <div className="container account-container" id="container">
      <div className="formContainer sign-up-container">
    
        <form action="#" className="loinform" onSubmit={ProceedCandidateLogin}>
        <div className="container header">
            <h3>Candidate Login</h3>
        </div>
        <div className="fields">
                <div class="form-group">
                    <label for="candidateName">Candidate Name</label>
                    <input value={name} onChange={e=>nameupdate(e.target.value)} type="text" class="form-control" id="candidateName"  placeholder="Enter Candidate Name"></input>
                   
                </div>
    
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input value={phone} onChange={e=>phoneupdate(e.target.value)} type="number" class="form-control" id="phone" placeholder="Enter Phone Number"></input>
                </div>
    
    
                {/* <div className="submit">
                <button type="submit"  class="button">Submit</button>
                </div> */}
    
                </div>
                <div className="submit">
                     <button className='btn' type="submit" >Login</button>
                 </div>
        </form>
      </div>
      <div className="formContainer sign-in-container">
        <div className="container header">
            <h3>Admin Login</h3>
        </div>
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
                <div className="submit">
                     <button className='btn' type="submit" >Login</button>
                 </div>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" width="200px" height="200px"></img>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost btn" onClick={handleSignInClick}id="signIn">Employer-Login</button>
          </div>
          <div className="overlay-panel overlay-right">
            <img src="https://cdn-icons-png.flaticon.com/512/6623/6623771.png" width="200px" height="200px"></img>
            <h1>Hello, Welcome!</h1>
            <p>Are you a new Candiate? Click here to sign in as Candidate</p>
            <button className="ghost btn" id="signUp" onClick={handleClick}>Candidate-Login</button>
          </div>
        </div>
      </div>
    </div>
    
    
        </div>
  )
}

export default Login
