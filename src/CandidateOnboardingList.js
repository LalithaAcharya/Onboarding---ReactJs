import React from 'react';
import './CandidateList.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const CandidateOnboardingList = () => {
    const { id } = useParams(); 

    const [data, setData] = useState([]);
    const [userValue, setUserValue] = useState([]);
    const [offerLetter, setOfferLetter] = useState(null);
    const [welcomeKit, setwelcomeKit] = useState("");
    const [fullName, setfullName] = useState("");
    const [dob, setdob] = useState("");
    const [fatherName, setfatherName] = useState("");
    const [motherName, setmotherName] = useState("");
    const [fatherOccupation, setfatherOccupation] = useState("");
    const [number, setnumber] = useState("");
    const [address, setaddress] = useState("");
    const [photo, setphoto] = useState(null);
    const [laptop, setlaptop] = useState("");
    const [program, setprogram] = useState("");
    const [feedback, setfeedback] = useState("");
    const [status, setstatus] = useState("");

    const navigate=useNavigate();

      const handlePostData = async () => {
        
      
        console.log(userValue);
        const postData = {
           
            phase1: [
              {
                offerLetter,
                welcomeKit,
                fullName,
                dob,
                fatherName,
                motherName,
                fatherOccupation,
                number,
                address,
                photo,
                laptop,
                program,
                feedback,
              }
            ]
          };

        const updatedEmployeeList = userValue.map(employee => {
            if (employee.task) {
              // Assuming task is an array
              employee.task[0]=postData;
            } else {
              // If task doesn't exist, create a new array with the user value
              employee.task = [postData];
            }
            console.log(employee)
            return employee;
          });

        fetch("http://localhost:8000/employeeList/"+id,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(updatedEmployeeList[0])
          }).then((res)=>{
            // setData(updatedEmployeeList[0])
            // console.log(updatedEmployeeList);
            // setstatus(true);
            localStorage.setItem('status',1);
              toast.success("Phase one saved successfully")
              navigate(`/phase2Task/${id}`)
            
          }).catch((err)=>{
            console.log(err.message)
          })
      
        // }
      };

 
    const candidate=sessionStorage.getItem('candidate');

    useEffect(() => {
      fetch("http://localhost:8000/employeeList/" + id).then((res) => {
        return res.json();
    }).then((resp) => {
      setfullName(resp.name)
      setnumber(resp.phone)
    }).catch((err) => {
      console.log(err.message);
  })
      }, []);

    useEffect(() => {
        fetch("http://localhost:8000/employeeList/" + id).then((res) => {
            return res.json();
        }).then((resp) => {
            setOfferLetter(resp.task[0].phase1[0].offerLetter);
            setwelcomeKit(resp.task[0].phase1[0].welcomeKit);
            setfullName(resp.task[0].phase1[0].fullName);
            setdob(resp.task[0].phase1[0].dob);
            setfatherName(resp.task[0].phase1[0].fatherName);
            setmotherName(resp.task[0].phase1[0].motherName);
            setfatherOccupation(resp.task[0].phase1[0].fatherOccupation);
            setnumber(resp.task[0].phase1[0].number);
            setaddress(resp.task[0].phase1[0].address);
            setphoto(resp.task[0].phase1[0].photo);
            setlaptop(resp.task[0].phase1[0].laptop);
            setprogram(resp.task[0].phase1[0].program);
            setfeedback(resp.task[0].phase1[0].feedback);
        }).catch((err) => {
            console.log(err.message);
        })

        let username=sessionStorage.getItem('candidate');
        if(username == "" || username === null){
            navigate('/login');
        }
      }, []);

    useEffect(() => {
        fetch("http://localhost:8000/employeeList?id="+candidate).then((res) => {
            return res.json();
        }).then((resp) => {
            // console.log(resp);
            setData(resp[0]);
            setUserValue(resp);
            // if(data.task?.length){
            //     if(data.task[0].phase1.length){
            //       setFormData(resp[0].task[0]);
            //     }
            // }
        }).catch((err) => {
            console.log(err.message);
        })
       
    }, [data])

    function handleChange(e) {
      // console.log(value);
      // if(field=='offerLetter'){
      // setOfferLetter(URL.createObjectURL(e.target.files[0]));
      setOfferLetter(() => URL.createObjectURL(e.target.files[0]));
      // }
      // if(field=='photo'){
      //   setphoto(URL.createObjectURL(value));
      //   }
  }

  function handleChangephoto(e) {
    // console.log(value);
    // if(field=='offerLetter'){
    // setOfferLetter(URL.createObjectURL(value));
    // // }
    // if(field=='photo'){
      setphoto(() => URL.createObjectURL(e.target.files[0]));
    //   }

    
}

  function removeImage(field){
    if(field=='offerLetter'){
    setOfferLetter("");
    }
    if(field=='photo'){
      setphoto("");
      }
  }
  
  useEffect(() => {
    return () => {
      if (offerLetter) {
        URL.revokeObjectURL(offerLetter);
      }
    };
  }, [offerLetter]);

  useEffect(() => {
    return () => {
      if (photo) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo]);

  return (
    <div>
        {/* <div className='sidebar-container'>
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4">
        <a
          href="#"
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
        >
          <span>Phase 1 Activities</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
          <span>Phase 2 Activities</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><span>Phase 3 Activities</span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><span>Back to Dashboard</span></a
        >
        
      </div>
    </div>
  </nav>
        </div> */}

      
      
        <div className="container right-container">
            <div className='container head-name'>
                <h3>Phase 1 Task</h3>
            </div>
            <form onSubmit={handlePostData}>
                <div className="row">
            { data.isOfferLetter==true &&
            <div className="col-lg-6">
            <div className="form-group block">
                    <h5>Offer Letter Acceptance<span className="errmsg">*</span></h5>
                    <hr></hr>
                    <p>Please upload the attested Offer Letter.By uploading this you have accepted the offer Leeter.</p>
                    {!offerLetter &&
                    <input required  onChange={handleChange} type="file" className="form-control"></input>
                    }
                    {offerLetter &&
                        // <span >{offerLetter}</span>
                        <>
                        <img src={offerLetter} width="70px" height="70px"></img>
                        <button onClick={()=>{removeImage('offerLetter')}}>Remove</button>
                        </>
                        }
            </div>
            </div>
        }

           { data.isKit==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Welcome Kit<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Reveived the welcome kit by end of the completing the onboarding process please select as not Received.</p>
                            <select required  value={welcomeKit} onChange={(e) => setwelcomeKit(e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="recevied">Received</option>
                                <option value="notReceived">Not Reveived</option>
                            </select>
                        </div>
            </div>
            }

            { data.isPersonal==true &&
                <div className="col-lg-12 mt-2 head">
                <div className="row">
                <h5>Personal Information<span className="errmsg">*</span></h5>
                    <div >
               <hr></hr>
                </div>
                        <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Full Name<span className="errmsg">*</span></label>
                                <input required value={fullName} onChange={(e) => setfullName(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Date of Birth<span className="errmsg">*</span></label>
                                <input required value={dob} onChange={(e) => setdob(e.target.value)} type="date" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Father Name<span className="errmsg">*</span></label>
                                <input required value={fatherName} onChange={(e) => setfatherName(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Mother Name<span className="errmsg">*</span></label>
                                <input required value={motherName} onChange={(e) => setmotherName(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Father Occupation<span className="errmsg">*</span></label>
                                <input required value={fatherOccupation} onChange={(e) => setfatherOccupation(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Contact Number<span className="errmsg">*</span></label>
                                <input required value={number} onChange={(e) => setnumber(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Address<span className="errmsg">*</span></label>
                                <input required value={address} onChange={(e) => setaddress(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Passport size Photo<span className="errmsg">*</span></label>
                                {!photo &&
                    <input required  onChange={handleChangephoto} type="file" className="form-control"></input>
                    }
                    {photo &&
                        // <span >{offerLetter}</span>
                        <>
                        <img src={photo} width="70px" height="70px"></img>
                        <button onClick={()=>{removeImage('photo')}}>Remove</button>
                        </>
                        }
                            </div>
                       </div>
                </div>
            </div>
            }

          {  data.isLaptop==true &&
          <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Laptop Acceptance<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Reveived the Laptop by end of the completing the onboarding process please select as not Received.</p>
                            <select required value={laptop} onChange={(e) => setlaptop(e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="india">Received</option>
                                <option value="china">Not Reveived</option>
                            </select>
                        </div>

                  
            </div>
            }

           

            {  data.isProgram==true &&
                <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Induction Program<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Attended the Inducton Program please select as not Attended.</p>
                            <select required value={program} onChange={(e) => setprogram(e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="attended">Attended</option>
                                <option value="not">Not Attended</option>
                            </select>
                        </div>
                        
                  
            </div>
            }
            { data.isFeedback1==true &&
                <div className="col-lg-12">
                              <div className="form-group block">
                                <label>Phase 1 Feedback comments<span className="errmsg">*</span></label>
                                <textarea required value={feedback} onChange={(e) => setfeedback(e.target.value)} className="form-control"></textarea>
                            </div>
                       </div>
                       }
            <div className="submit">
                <button className="btn">Save</button>
            </div>
            </div>
            </form>
         </div>
       
      
    </div>
  )
}

export default CandidateOnboardingList
