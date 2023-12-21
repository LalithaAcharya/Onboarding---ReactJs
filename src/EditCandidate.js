import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import cross from "./assets/cross.png";
import { toast } from "react-toastify";

const EditCandidate = () => {

    const { id } = useParams(); 
    const[userValue,setUserValue]=useState([]);
    const[name,namechange]=useState("");
    const[designation,designationchaange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[country,countrychange]=useState("india");
    const[gender,genderchange]=useState("male");
    const[DOJ,DOJchange]=useState("");
    const[status,statuschange]=useState("");
    const[isOfferLetter,isOfferLetterchange]=useState(false);
    const[isPersonal,isPersonalchange]=useState(false);
    const[isKit,isKitchange]=useState(false);
    const[isLaptop,isLaptopchange]=useState(false);
    const[isProgram,isProgramchange]=useState(false);
    const[isFeedback1,isFeedback1change]=useState(false);

    const[isEducation,isEducationchange]=useState(false);
    const[isPan,isPanchange]=useState(false);
    const[isContact,isContactchange]=useState(false);
    const[isBank,isBankchange]=useState(false);
    const[isSession,isSessionchange]=useState(false);
    const[isFeedback2,isFeedback2change]=useState(false);
    const[validation,valchange]=useState(false);

    const[isPF,isPFchange]=useState(false);
    const[isNomine,isNominechange]=useState(false);
    const[isExperience,isExperiencechange]=useState(false);
    const[isSecrecy,isSecrecychange]=useState(false);
    const[isTimesheet,isTimesheetchange]=useState(false);
    const[isFeedback3,isFeedback3change]=useState(false);
    const [data, setData] = useState([]);
    const[trainingPeriod,trainingPeriodchange]=useState("");
    const[course,coursechange]=useState("");

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
   
    
    // useEffect(() => {
    //     fetch("http://localhost:8000/employeeList?id="+id).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         console.log(resp);
    //         setData(resp);
    //         // setUserValue(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // }, [data])

    useEffect(() => {
        fetch("http://localhost:8000/employeeList/" + id).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setData(resp)
            // idchange(resp.id);
            namechange(resp.name);
            designationchaange(resp.designation);
            emailchange(resp.email);
            phonechange(resp.phone);
            countrychange(resp.country);
            DOJchange(resp.DOJ);
            genderchange(resp.gender);
            statuschange(resp.status);
            isOfferLetterchange(resp.isOfferLetter);
            isPersonalchange(resp.isPersonal);
            isKitchange(resp.isKit);
            isLaptopchange(resp.isLaptop);
            isProgramchange(resp.isProgram);
            isFeedback1change(resp.isFeedback1);
            isEducationchange(resp.isEducation);
            isPanchange(resp.isPan);
            isContactchange(resp.isContact);
            isBankchange(resp.isBank);
            isSessionchange(resp.isSession);
            isFeedback2change(resp.isFeedback2);
            isPFchange(resp.isPF);
            isExperiencechange(resp.isExperience);
            isNominechange(resp.isNomine);
            isSecrecychange(resp.isSecrecy);
            isTimesheetchange(resp.isTimesheet);
            isFeedback3change(resp.isFeedback3);
            trainingPeriodchange(resp.trainingPeriod);
            coursechange(resp.course);
            setwelcomeKit(resp.task[0].phase1[0].welcomeKit);
            setOfferLetter(resp.task[0].phase1[0].offerLetter);
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

        let username=sessionStorage.getItem('username');
        if(username == "" || username === null){
            navigate('/login');
        }
    }, []);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={
        name,
        designation,
        email,
        phone,
        country,
        gender,
        DOJ,
        status,
        isOfferLetter,
        isPersonal,
        isKit,
        isLaptop,
        isProgram,
        isFeedback1,
        isPan,
        isEducation,
        isBank,
        isSession,
        isFeedback2,
        isContact,
        isPF,
        isNomine,
        isExperience,
        isSecrecy,
        isTimesheet,
        isFeedback3,
        trainingPeriod,
        course,
        task:[
            {
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
            }
        ]
    };
    // const postData = {
           
    //     candiateDetails: [
    //         {
    //             name,
    //             designation,
    //             email,
    //             phone,
    //             country,
    //             gender,
    //             DOJ,
    //             status,
    //             isOfferLetter,
    //             isPersonal,
    //             isKit,
    //             isLaptop,
    //             isProgram,
    //             isFeedback1,
    //             isPan,
    //             isEducation,
    //             isBank,
    //             isSession,
    //             isFeedback2,
    //             isContact,
    //             isPF,
    //             isNomine,
    //             isExperience,
    //             isSecrecy,
    //             isTimesheet,
    //             isFeedback3,
    //             trainingPeriod,
    //             course
    //         }
    //     ]
    //   };

    //   const updatedEmployeeList = data.map(employee => {
    //     if(employee.task) {
    //       // Assuming task is an array
    //       employee=empdata;
    //     } else {
    //       // If task doesn't exist, create a new array with the user value
    //       employee.push(empdata);
    //     }
    //     console.log(employee)
    //     return employee;
    //   });

        const val="proccessed"
      fetch("http://localhost:8000/employeeList/"+id,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        toast.success("Candidate edited successfully")
        navigate('/onBoarding')
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/employeeList/" + id, {
                method: "DELETE"
            }).then((res) => {
                toast.success("Candidate deleted successfully")
                navigate('/onBoarding')
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    // const[id,idchange]=useState("");
   


  return (
    <div>
        <div className="container-fluid p-3 candidate-main mt-5">
        <div className="candidate-model-head d-flex">
      <h4 className=' '>Add New Candidate</h4>
      <a href="/onBoarding">
                <img src={cross} width="40px" height="40px"></img>
             </a>
             </div>
        <form className="container-fluid candidate-form-block" onSubmit={handlesubmit} >
        <div className="row block-one">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Empployee Name <span className="errmsg">*</span></label>
                            <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                            {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Designation<span className="errmsg">*</span></label>
                            <input required value={designation}  onChange={e=>designationchaange(e.target.value)} type="text" className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Date of Joining <span className="errmsg">*</span></label>
                            <input required value={DOJ}  onChange={e=>DOJchange(e.target.value)} type="date" className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Phone Number<span className="errmsg">*</span></label>
                            <input required value={phone}  onChange={e=>phonechange(e.target.value)} type="number" className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>email<span className="errmsg">*</span></label>
                            <input required value={email}  onChange={e=>emailchange(e.target.value)} type="email" className="form-control"></input>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Country<span className="errmsg">*</span></label>
                            <select required value={country}  onChange={e=>countrychange(e.target.value)} className="form-control">
                                <option value="india">India</option>
                                <option value="china">China</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Gender<span className="errmsg">*</span></label>
                            <br></br>
                            <input  type="radio" checked={gender==='male'}  onChange={e=>genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                            <label>Male</label>
                            <input  type="radio" checked={gender==='female'}  onChange={e=>genderchange(e.target.value)} name="gender"  value="female" className="app-check"></input>
                            <label>Female</label>
                        </div>
                    </div>
                    
                    
                   </div>

                   <div className="row block-one">
                    <h4>Onboarding - Activities allocation</h4>
                    <div className="col-lg-4">
                    <div className="form-group checkbox-block">
                            <h5>Day 1 - Activities</h5>
                            <hr className="line"></hr>
                                <input className="checkbox-input"  checked={isOfferLetter} onChange={e=>isOfferLetterchange(e.target.checked)} id="one" type="checkbox"></input>
                                <label className="chackbox-label" for="one">
                                    <span></span> Offer Letter Acceptance
                                </label>

                                <input className="checkbox-input"  checked={isPersonal} onChange={e=>isPersonalchange(e.target.checked)} id="two" type="checkbox"></input>
                                <label className="chackbox-label" for="two">
                                    <span></span> Personal Information
                                </label>
                            
                                <input className="checkbox-input"  checked={isKit} onChange={e=>isKitchange(e.target.checked)} id="three" type="checkbox"></input>
                                <label className="chackbox-label" for="three">
                                    <span></span> Welcome Ket
                                </label>
                                
                                <input className="checkbox-input"  checked={isLaptop} onChange={e=>isLaptopchange(e.target.checked)} id="four" type="checkbox" ></input>
                                <label className="chackbox-label" for="four">
                                    <span></span> Laptop Acceptance
                                </label>

                                <input className="checkbox-input"  checked={isProgram} onChange={e=>isProgramchange(e.target.checked)} id="five" type="checkbox" ></input>
                                <label className="chackbox-label" for="five">
                                    <span></span> Induction Program
                                </label>
                                <input className="checkbox-input"  checked={isFeedback1} onChange={e=>isFeedback1change(e.target.checked)} id="six" type="checkbox" ></input>
                                <label className="chackbox-label" for="six">
                                    <span></span> FeedBack Form 1
                                </label>

                        </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="form-group checkbox-block">
                            <h5>Day 2 - Activities</h5>
                            <hr className="line"></hr>
                                <input className="checkbox-input"  checked={isEducation} onChange={e=>isEducationchange(e.target.checked)} id="seven" type="checkbox" ></input>
                                <label className="chackbox-label" for="seven">
                                    <span></span> Education Details
                                </label>

                                <input className="checkbox-input"  checked={isPan} onChange={e=>isPanchange(e.target.checked)} id="eight" type="checkbox" ></input>
                                <label className="chackbox-label" for="eight">
                                    <span></span> Pan card and Adhar card Details
                                </label>
                            
                                <input className="checkbox-input"  checked={isContact} onChange={e=>isContactchange(e.target.checked)} id="nine" type="checkbox" ></input>
                                <label className="chackbox-label" for="nine">
                                    <span></span> Emergency Contact Details
                                </label>
                                
                                <input className="checkbox-input"  checked={isBank} onChange={e=>isBankchange(e.target.checked)} id="ten" type="checkbox" ></input>
                                <label className="chackbox-label" for="ten">
                                    <span></span> Bank Info
                                </label>

                                <input className="checkbox-input"  checked={isSession} onChange={e=>isSessionchange(e.target.checked)} id="eleven" type="checkbox" ></input>
                                <label className="chackbox-label" for="eleven">
                                    <span></span> Session with Founders
                                </label>

                                <input className="checkbox-input" checked={isFeedback2} onChange={e=>isFeedback2change(e.target.checked)} id="twele" type="checkbox" ></input>
                                <label className="chackbox-label" for="twele">
                                    <span></span> FeedBack Form 2
                                </label>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="form-group checkbox-block">
                            <h5>Day 3 - Activities</h5>
                            <hr className="line"></hr>
                                <input className="checkbox-input" checked={isPF} onChange={e=>isPFchange(e.target.checked)} id="thirteen" type="checkbox" ></input>
                                <label className="chackbox-label" for="thirteen">
                                    <span></span> PF Details
                                </label>

                                <input className="checkbox-input" checked={isNomine} onChange={e=>isNominechange(e.target.checked)} id="fourteen" type="checkbox" ></input>
                                <label className="chackbox-label" for="fourteen">
                                    <span></span> Nomine
                                </label>
                            
                                <input className="checkbox-input" checked={isExperience} onChange={e=>isExperiencechange(e.target.checked)} id="fifteen" type="checkbox" ></input>
                                <label className="chackbox-label" for="fifteen">
                                    <span></span> Experience Deatils
                                </label>
                                
                                <input className="checkbox-input" checked={isSecrecy} onChange={e=>isSecrecychange(e.target.checked)} id="sixteen" type="checkbox" ></input>
                                <label className="chackbox-label" for="sixteen">
                                    <span></span> Secrecy & Confidentiality
                                </label>

                                <input className="checkbox-input" checked={isTimesheet} onChange={e=>isTimesheetchange(e.target.checked)} id="seventeen" type="checkbox" ></input>
                                <label className="chackbox-label" for="seventeen">
                                    <span></span> Timesheet and Attendence discussion
                                </label>

                                <input className="checkbox-input" checked={isFeedback3} onChange={e=>isFeedback3change(e.target.checked)} id="eighteen" type="checkbox"></input>
                                <label className="chackbox-label" for="eighteen">
                                    <span></span> FeedBack Form 3
                                </label>
                        </div>
                    </div>
                  
                  
                    
                    
                   </div>

                   <div className="row block-one">
                    <h4>Training allocation</h4>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Training period<span className="errmsg">*</span></label>
                            <select required value={trainingPeriod}  onChange={e=>trainingPeriodchange(e.target.value)} className="form-control">
                            <option >Select Training Period</option>
                                <option value="two week">Two Week</option>
                                <option value="one month">One Month</option>
                                <option value="two month">Two Month</option>
                                <option value="four month">Four Month</option>
                                <option value="india">Six Month</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Training Course<span className="errmsg">*</span></label>
                            <select required value={course}  onChange={e=>coursechange(e.target.value)} className="form-control">
                            <option >Select Training Course</option>
                            <option value="web developer">Web Development</option>
                                <option value="angular">Angular</option>
                                <option value="java full stact developer">Java Full Stack</option>
                                <option value="python full Stack">Python Full Stack</option>
                                <option value="disgital marketing">Digital Marketing</option>
                                <option value="account management">Account Management</option>
                                <option value="microsoft excel">Microsoft Excel</option>
                            </select>
                        </div>
                    </div>

                    </div>
                   <div className='footer d-flex p-3'>
                <a href="/onBoarding" className="btn bg-light text-dark">Back</a> 
              <button type="submit"  className="btn">Update</button>
              {/* <a  className="btn bg-light text-dark">Save</a> */}
              <a onClick={() => { Removefunction(id) }} className="btn bg-danger ">Delete</a>
              
              </div>
                   </form>
    </div>
    </div>
  )
}

export default EditCandidate