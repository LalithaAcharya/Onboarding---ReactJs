import cross from "./assets/cross.png";
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './CandidateOnboarding.css';

const CandidateOnboarding = () => {

    const [data, setData] = useState([]);
    const [phase1, setPhase1] = useState([]);
    const [offerLetter, setOfferLetter] = useState("");
    const [welcomeKit, setWelcomeKit] = useState("");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [fatherOccupation, setFatherOccupation] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState("");
    const [laptop, setLaptop] = useState("");
    const [program, setProgram] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        id: 1,
        phase1: [
          {
            offerLetter: '',
            welcomeKit: '',
            fullName: '',
            dob: '',
            fatherName: '',
            motherName: '',
            fatherOccupation: '',
            number: '',
            address: '',
            photo: '',
            laptop: '',
            program: '',
            feedback: '',
            // id: 1
          }
        ],
        phase2: [
            {
              pan: '',
              session: '',
              contact: '',
              bank: '',
              institute1: '',
              marks1: '',
              marksheet1: '',
              institute2: '',
              marks2: '',
              marksheet2: '',
              institute3: '',
              marks3: '',
              marksheet3: '',
              institute4: '',
              marks4: '',
              marksheet4: '',
              adhar: '',
              feedback2: '',
              // id: 1
            }
          ]
      });

    

      const handleChange = (fieldName, value) => {
        setFormData(prevData => ({
          ...prevData,
          phase1: [
            {
              ...prevData.phase1[0],
              [fieldName]: value
            }
          ]
        }));
      };

      const handlePostData = async () => {

        fetch("http://localhost:8000/task",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(formData)
          }).then((res)=>{
            window.history.pushState(formData, "/candidate-onBoarding")
            localStorage.setItem('formData', JSON.stringify(formData));
              toast.success("Candidate added successfully")
            //   navigate('/candidate-dashboard')
            
          }).catch((err)=>{
            console.log(err.message)
          })
        // try {
            
        //   // Replace 'https://your-api-endpoint' with the actual URL of your API
        //   const response = await axios.post('http://localhost:8000/phase1', formData);
        //   console.log('Post response:', response.data);
        // } catch (error) {
        //   console.error('Error posting data:', error);
        // }
      };

 
    const candidate=sessionStorage.getItem('candidate');

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('formData'));
        if (storedFormData) {
          setFormData(storedFormData);
        }
      }, []);

    //   useEffect(() => {
    //     localStorage.setItem('formData', JSON.stringify(formData));
    //   }, [formData]);

    useEffect(() => {
        fetch("http://localhost:8000/employeeList?id="+candidate).then((res) => {
            return res.json();
        }).then((resp) => {
            // console.log(resp);
            setData(resp[0]);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [data])

    // const SubmitPhase1=(e)=>{
    //     e.preventDefault();

    //     const empdata={offerLetter,welcomeKit,fullName,dob,fatherName,motherName,fatherOccupation,number,address,photo,laptop,program,feedback};
        
  
    //     fetch("http://localhost:8000/phase1",{
    //       method:"POST",
    //       headers:{"content-type":"application/json"},
    //       body:JSON.stringify(empdata)
    //     }).then((res)=>{
    //         // setSubmissionStatus('success');
    //         setPhase1(empdata);
    //         console.log(phase1)
    //         toast.success("Candidate added successfully")
    //         navigate('/candidate-dashboard')
          
    //     }).catch((err)=>{
    //       console.log(err.message)
    //     })
    // }


  return (
    <div>
        <div className="container-fluid p-3 candidate-main">
        <div className="candidate-model-head d-flex">
      <h4 className=' '>OnBoarding</h4>
      <a href="/candidate-dashboard">
                <img src={cross} width="40px" height="40px"></img>
             </a>
             </div>
        <div className="accordion-container">
             <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Phase 1 Activities</Accordion.Header>
        <Accordion.Body>
         <div className="container">
            <form onSubmit={handlePostData}>
                <div className="row">
            { data.isOfferLetter==true &&
            <div className="col-lg-6">
            <div className="form-group block">
                    <h5>Offer Letter Acceptance<span className="errmsg">*</span></h5>
                    <hr></hr>
                    <p>Please upload the attested Offer Letter.By uploading this you have accepted the offer Leeter.</p>
                    <input required value={formData.phase1[0].offerLetter} onChange={(e) => handleChange('offerLetter', e.target.value)} type="file" className="form-control"></input>
            </div>
            </div>
        }

           { data.isKit==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Welcome Kit<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Reveived the welcome kit by end of the completing the onboarding process please select as not Received.</p>
                            <select required value={formData.phase1[0].welcomeKit}  onChange={(e) => handleChange('welcomeKit', e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="india">Received</option>
                                <option value="china">Not Reveived</option>
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
                                <input required value={formData.phase1[0].fullName}  onChange={(e) => handleChange('fullName', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Date of Birth<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].dob} onChange={(e) => handleChange('dob', e.target.value)} type="date" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Father Name<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].fatherName}  onChange={(e) => handleChange('fatherName', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Mother Name<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].motherName}  onChange={(e) => handleChange('motherName', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Father Occupation<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].fatherOccupation} onChange={(e) => handleChange('fatherOccupation', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Contact Number<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].number}  onChange={(e) => handleChange('number', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Address<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].address}  onChange={(e) => handleChange('address', e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Passport size Photo<span className="errmsg">*</span></label>
                                <input required value={formData.phase1[0].photo}  onChange={(e) => handleChange('photo', e.target.value)} type="file" className="form-control"></input>
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
                            <select required  value={formData.phase1[0].laptop} onChange={(e) => handleChange('laptop', e.target.value)} className="form-control">
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
                            <select required value={formData.phase1[0].program}  onChange={(e) => handleChange('program', e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="india">Attended</option>
                                <option value="china">Not Attended</option>
                            </select>
                        </div>
                        
                  
            </div>
            }
            { data.isFeedback1==true &&
                <div className="col-lg-12">
                              <div className="form-group block">
                                <label>Phase 1 Feedback comments<span className="errmsg">*</span></label>
                                <textarea required value={formData.phase1[0].feedback}  onChange={(e) => handleChange('feedback', e.target.value)} className="form-control"></textarea>
                            </div>
                       </div>
                       }
            <div className="submit">
                <button className="btn">Submit</button>
            </div>
            </div>
            </form>
         </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
        <div className="container">
            <form>
                <div className="row">


           {  data.isEducation==true &&
           <div className="col-lg-12  mt-2 head">
                {/* <div className="row"> */}
                <h5>Education Details<span className="errmsg">*</span></h5>
                    <div className="p-4">
               {/* <hr></hr> */}
               <div className="row block mt-2">
                    <h6>SSLC Delails</h6>
                    <hr></hr>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Institute Name<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('institute1', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Total Percentage<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marks1', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>upload Marks sheet<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marksheet1', e.target.value)} type="file" className="form-control"></input>
                            </div>
                    </div>
                </div>
                <div className="row block mt-2">
                    <h6>12th Grade Delails</h6>
                    <hr></hr>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Institute Name<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('institute2', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Total Percentage<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marks2', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>upload Marks sheet<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marksheet2', e.target.value)} type="file" className="form-control"></input>
                            </div>
                    </div>
                </div>
                <div className="row block mt-2">
                    <h6>Graguate Deatils</h6>
                    <hr></hr>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Institute Name<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('institute3', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Total Percentage<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marks3', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>upload Marks sheet<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marksheet3', e.target.value)} type="file" className="form-control"></input>
                            </div>
                    </div>
                </div>
                <div className="row block mt-2">
                    <h6>Post Graguate Details</h6>
                    <hr></hr>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Institute Name<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('institute4', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>Total Percentage<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marks4', e.target.value)} type="text" className="form-control"></input>
                            </div>
                    </div>
                    <div className="col-lg-6">
                              <div className="form-group ">
                                <label>upload Marks sheet<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('marksheet4', e.target.value)} type="file" className="form-control"></input>
                            </div>
                    </div>
                </div>
                       
                      
                     
                </div>
            </div>
            }

           { data.isPan==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Pan Card Details<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please enter the valid Pan card details.</p>
                            <label>Pan Card Number<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('pan', e.target.value)} type="text" className="form-control"></input>
                        </div>

                  
            </div>
            }

           

           {  data.isPan==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Adhar Card Details<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please enter the valid Adhar card number.</p>
                            <label>Adhar Card Number<span className="errmsg">*</span></label>
                                <input required onChange={(e) => handleChange('adhar', e.target.value)} type="text" className="form-control"></input>
                        </div>

                  
            </div>
            }
           {  data.isSession==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Session with Founder<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Attended the Session with Founder please select as not Attended.</p>
                            <select required onChange={(e) => handleChange('session', e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="india">Attended</option>
                                <option value="china">Not Attended</option>
                            </select>
                        </div>
                        
                  
            </div>
            }
          {  data.isFeedback2==true &&
           <div className="col-lg-6">
                              <div className="form-group block">
                              <h5>Phase 2 FeedBack Form<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please leave you feedback on the phase 2 process.</p>
                               
                                <textarea required onChange={(e) => handleChange('feedback2', e.target.value)} className="form-control"></textarea>
                            </div>
                       </div>
                       }
            <div className="submit">
                <button className="btn">Submit</button>
            </div>
            </div>
            </form>
         </div>
        </Accordion.Body>
      </Accordion.Item>

       <Accordion.Item eventKey="2">
        <Accordion.Header>Phase 3 Activities</Accordion.Header>
        <Accordion.Body>
         <div className="container">
            <form>
                <div className="row">

          { data.isPF==true &&
           <div className="col-lg-6">
            <div className="form-group block">
                    <h5>PF Detalis<span className="errmsg">*</span></h5>
                    <hr></hr>
                    <p>Please enter the UAN number of PF account.</p>
                    <label>UAN Number</label>
                    <input required  type="text" className="form-control"></input>
            </div>
            </div>}

           { data.isNominee==true && 
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Nominee<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please enter the Nominee Name.</p>
                            <label>Nomine Name</label>
                            <input required  type="text" className="form-control"></input>
                        </div>
            </div>}

          { data.isExperience==true && 
          <div className="col-lg-12 mt-2 head">
                <div className="row">
                <h5>Experience Information<span className="errmsg">*</span></h5>
                    <div >
               <hr></hr>
                </div>
                        <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Experience Type<span className="errmsg">*</span></label>
                                <select required  className="form-control">
                                <option >Select the option</option>
                                <option value="india">Fresher</option>
                                <option value="china">Experienced</option>
                            </select>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Toal Experience in years<span className="errmsg">*</span></label>
                                <input required  type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Previous Company Name<span className="errmsg">*</span></label>
                                <input required  type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Previous CTC per annum<span className="errmsg">*</span></label>
                                <input required  type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Designation<span className="errmsg">*</span></label>
                                <input required  type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Resignation letter<span className="errmsg">*</span></label>
                                <input required  type="file" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Salary slip<span className="errmsg">*</span></label>
                                <input required  type="file" className="form-control"></input>
                            </div>
                       </div>
                </div>
            </div>
            }

           { data.isTimesheet==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Timesheet and Attendence discussion<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Attended the discussion please select as not Attended.</p>
                            <select required  className="form-control">
                                <option >Select the option</option>
                                <option value="india">Attended</option>
                                <option value="china">Not Attended</option>
                            </select>
                        </div>

                  
            </div>}

           

            { data.isFeedback3==true &&
                <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>FeedBack on phase 3 acticities<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please leave you feedback on the phase 2 process.</p>
                               
                               <textarea required  className="form-control"></textarea>
                        </div>
                        
                  
            </div>
            }
            <div className="col-lg-12">
                              <div className="form-group block">
                                <h5>Secrecy % Confidentiality<span className="errmsg">*</span></h5>
                                <hr></hr>
                                <input    id="eleven" type="checkbox" ></input>&nbsp;
                                <label>I will agree to the organization rules and regulation and maintain the organization secrecy ans confidentiality.</label>
                            </div>
                       </div>
            <div className="submit">
                <button className="btn">Submit</button>
            </div>
            </div>
            </form>
         </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="submit">
                <button className="btn">Submit</button>
            </div>
    </div>
    </div>
  )
}

export default CandidateOnboarding
