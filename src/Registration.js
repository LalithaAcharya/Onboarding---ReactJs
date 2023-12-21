import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[password,passwordchange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[country,countrychange]=useState("india");
    const[gender,genderchange]=useState("male");
    const[address,addresschange]=useState("");

    const navigate=useNavigate();

    const IsValidate=()=>{
        let isprocessed=true;
        let errormessage="Please enter the value in ";
        if(id === null || id === ''){
            isprocessed=false;
            errormessage += 'Username'
        }
        if(!isprocessed){
            toast.warning(errormessage);
        }
        return isprocessed;
    }

    const handlesubmit=(e)=>{
       
        e.preventDefault();
        let regobj={id,name,password,email,phone,country,address,gender}
        // console.log(regobj)
        if(IsValidate()){
        fetch("http://localhost:8000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj)
        }).then((res)=>{
            toast.success("Registered successfully")
            navigate('/login')
        }).catch((err)=>{
            toast.error("Failed : "+err.message)
        })
    }
    }
  return (
    <div>
       <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
            <div className="card">
                <div className="card-header">
                    <h1>User Registration</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                            <input required value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Password<span className="errmsg">*</span></label>
                            <input required value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Full Name <span className="errmsg">*</span></label>
                            <input required value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Email<span className="errmsg">*</span></label>
                            <input required  value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Phone Number<span className="errmsg">*</span></label>
                            <input required value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Country<span className="errmsg">*</span></label>
                            <select required value={country} onChange={e=>countrychange(e.target.value)} className="form-control">
                                <option value="india">India</option>
                                <option value="china">China</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Gender<span className="errmsg">*</span></label>
                            <br></br>
                            <input  type="radio" checked={gender==='male'} onChange={e=>genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                            <label>Male</label>
                            <input  type="radio" checked={gender==='female'} onChange={e=>genderchange(e.target.value)} name="gender"  value="female" className="app-check"></input>
                            <label>Female</label>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Address<span className="errmsg">*</span></label>
                            <textarea required value={address} onChange={e=>addresschange(e.target.value)} className="form-control"></textarea>
                        </div>
                    </div>
                   </div>
                </div>
                <div className="card-footer">
                <a href="./" className="btn btn-danger">Back</a>| |
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Registration
