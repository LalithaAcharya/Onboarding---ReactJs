import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Phase3Task = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [phase1, setPhase1] = useState([]);
    const [pf, setPf] = useState("");
    const [nomine, setNomine] = useState("");
    const [experiencetype, setExperienceType] = useState("");
    const [totalExperience, setTotalExperience] = useState("");
    const [company, setCompany] = useState("");
    const [ctc, setCTC] = useState("");
    const [designation, setDesignation] = useState("");
    const [resignation, setResignation] = useState("");
    const [salary, setSalary] = useState("");
    const [timeshet, setTimesheet] = useState("");
    const [feedback3, setFeedback3] = useState("");
    const [secrecy, setSecrecy] = useState(false);
    const [userValue, setUserValue] = useState([]);
    const navigate=useNavigate();


    

    //   const handleChange = (fieldName, value) => {
    //     setFormData(prevData => ({
    //       ...prevData,
    //       phase1: [
    //         {
    //           ...prevData.phase1[0],
    //           [fieldName]: value
    //         }
    //       ]
    //     }));
    //   };

      const handlePostData = async () => {

        const postData = {
           
            phase3: [
              {
                pf,
                nomine,
                experiencetype,
                totalExperience,
                ctc,
                designation,
                resignation,
                salary,
                company,
                timeshet,
                feedback3,
                secrecy,
              }
            ]
          };

          const updatedEmployeeList = userValue.map(employee => {
            if(employee.task) {
              // Assuming task is an array
              employee.task[2]=postData;
            } else {
              // If task doesn't exist, create a new array with the user value
              employee.task.push(postData);
            }
            console.log(employee)
            return employee;
          });

        fetch("http://localhost:8000/employeeList/"+id,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(updatedEmployeeList[0])
          }).then((res)=>{
            localStorage.setItem('status',3);
              toast.success("Phase 3 tasked saved successfully")
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
        fetch("http://localhost:8000/employeeList/" + id).then((res) => {
            return res.json();
        }).then((resp) => {
            setPf(resp.task[2].phase3[0].pf);
            setNomine(resp.task[2].phase3[0].nomine);
            setExperienceType(resp.task[2].phase3[0].experiencetype);
            setTotalExperience(resp.task[2].phase3[0].totalExperience);
            setCTC(resp.task[2].phase3[0].ctc);
            setDesignation(resp.task[2].phase3[0].designation);
            setResignation(resp.task[2].phase3[0].resignation);
            setSalary(resp.task[2].phase3[0].salary);
            setCompany(resp.task[2].phase3[0].company);
            setTimesheet(resp.task[2].phase3[0].timeshet);
            setFeedback3(resp.task[2].phase3[0].feedback3);
            setSecrecy(resp.task[2].phase3[0].secrecy);
        }).catch((err) => {
            console.log(err.message);
        })
      }, []);

    useEffect(() => {
        fetch("http://localhost:8000/employeeList?id="+candidate).then((res) => {
            return res.json();
        }).then((resp) => {
            // console.log(resp);
            setData(resp[0]);
            setUserValue(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [data])


  return (
    <div>
       <div className="container right-container">
       <div className='container head-name'>
                <h3>Phase 3 Task</h3>
            </div>
            <form onSubmit={handlePostData}>
                <div className="row">

          { data.isPF==true &&
           <div className="col-lg-6">
            <div className="form-group block">
                    <h5>PF Detalis<span className="errmsg">*</span></h5>
                    <hr></hr>
                    <p>Please enter the UAN number of PF account.</p>
                    <label>UAN Number</label>
                    <input required value={pf} onChange={(e) => setPf(e.target.value)} type="text" className="form-control"></input>
            </div>
            </div>}

           { data.isNomine==true && 
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Nominee<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please enter the Nominee Name.</p>
                            <label>Nomine Name</label>
                            <input required value={nomine} onChange={(e) => setNomine(e.target.value)} type="text" className="form-control"></input>
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
                                <select required value={experiencetype} onChange={(e) => setExperienceType(e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="fresher">Fresher</option>
                                <option value="experienced">Experienced</option>
                            </select>
                            </div>
                       </div>
                       { experiencetype=='experienced' &&
                       <>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Toal Experience in years<span className="errmsg">*</span></label>
                                <input required value={totalExperience} onChange={(e) => setTotalExperience(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Previous Company Name<span className="errmsg">*</span></label>
                                <input required value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Previous CTC per annum<span className="errmsg">*</span></label>
                                <input required value={ctc} onChange={(e) => setCTC(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Designation<span className="errmsg">*</span></label>
                                <input required value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" className="form-control"></input>
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Resignation letter<span className="errmsg">*</span></label>
                                <input required onChange={(e) => setResignation(e.target.files[0].name)} type="file" className="form-control"></input>
                                {resignation &&
                        <span >{resignation}</span>
                        }
                            </div>
                       </div>
                       <div className="col-lg-6">
                              <div className="form-group block">
                                <label>Salary slip<span className="errmsg">*</span></label>
                                <input required onChange={(e) => setSalary(e.target.files[0].name)} type="file" className="form-control"></input>
                                {salary &&
                        <span >{salary}</span>
                        }
                            </div>
                       </div>
                       </>
                        }
                </div>
            </div>
            }

           { data.isTimesheet==true &&
           <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>Timesheet and Attendence discussion<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>If you not Attended the discussion please select as not Attended.</p>
                            <select required  value={timeshet} onChange={(e) => setTimesheet(e.target.value)} className="form-control">
                                <option >Select the option</option>
                                <option value="attended">Attended</option>
                                <option value="notAttended">Not Attended</option>
                            </select>
                        </div>

                  
            </div>}

           

            { data.isFeedback3==true &&
                <div className="col-lg-6">
                        <div className="form-group block">
                            <h5>FeedBack on phase 3 acticities<span className="errmsg">*</span></h5>
                            <hr></hr>
                            <p>Please leave you feedback on the phase 3 process.</p>
                               
                               <textarea  value={feedback3} onChange={(e) => setFeedback3(e.target.value)} required  className="form-control"></textarea>
                        </div>
                        
                  
            </div>
            }
            <div className="col-lg-12">
                              <div className="form-group block">
                                <h5>Secrecy % Confidentiality<span className="errmsg">*</span></h5>
                                <hr></hr>
                                <input  className="checkbox-input"  checked={secrecy} onChange={e=>setSecrecy(e.target.checked)} id="one1" type="checkbox"></input>
                                <label className="chackbox-label" for="one1">
                                    <span></span> I will agree to the organization rules and regulation and maintain the organization secrecy ans confidentiality.
                                </label>
                            </div>
                       </div>
            <div className="submit">
                <button className="btn">Save</button>
            </div>
            </div>
            </form>
         </div>
    </div>
  )
}

export default Phase3Task
