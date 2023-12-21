import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Phase2Task = () => {
    const { id } = useParams(); 

    const [data, setData] = useState([]);
    const [phase1, setPhase1] = useState([]);
    const [userValue, setUserValue] = useState([]);
    const [pan, setPan] = useState('');
    const [session, setSession] = useState('');
    // const [contact, setContact] = useState('');
    // const [bank, setBank] = useState('');
    const [institute1, setInstitute1] = useState('');
    const [institute2, setInstitute2] = useState('');
    const [institute3, setInstitute3] = useState('');
    const [institute4, setInstitute4] = useState('');
    const [marks1, setMarks1] = useState('');
    const [marks2, setMarks2] = useState('');
    const [marks3, setMarks3] = useState('');
    const [marks4, setMarks4] = useState('');
    const [marksheet1, setMarksheet1] = useState(null);
    const [marksheet2, setMarksheet2] = useState(null);
    const [marksheet3, setMarksheet3] = useState(null);
    const [marksheet4, setMarksheet4] = useState(null);
    const [adhar, setAdhar] = useState('');
    const [relation1, setRelarion1] = useState('');
    const [relation2, setRelarion2] = useState('');
    const [contact1, setContact1] = useState('');
    const [contact2, setContact2] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [feedback2, setFeedback2] = useState('');
    const navigate=useNavigate();

    // const [formData, setFormData] = useState({
    //     phase2: [
    //         {
    //           pan: '',
    //           session: '',
    //           contact: '',
    //           bank: '',
    //           institute1: '',
    //           marks1: '',
    //           marksheet1: '',
    //           institute2: '',
    //           marks2: '',
    //           marksheet2: '',
    //           institute3: '',
    //           marks3: '',
    //           marksheet3: '',
    //           institute4: '',
    //           marks4: '',
    //           marksheet4: '',
    //           adhar: '',
    //           feedback2: '',
    //           // id: 1
    //         }
    //       ]
    //   });

    

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
    // function handleOnChange(e) {
    //     console.log(e.target.files)
    //     console.log(e.target.files[0].name)
    //     console.log(e.target.files.FileList[0].file.name)
    //     // const target = e.target as HTMLInputElement & {
    //     //   files: FileList;
    //     // }
    // }

      const handlePostData = async () => {
      

        //  const formDataToSend = new FormData();
            

        const postData = {
           
                phase2: [
                  {
                    pan,
                    session,
                    adhar,
                    institute1,
                    marks1,
                    marksheet1,
                    institute2,
                    marks2,
                    marksheet2,
                    institute3,
                    marks3,
                    marksheet3,
                    institute4,
                    marks4,
                    marksheet4,
                    bankName,
                    accountNo,
                    relation1,
                    relation2,
                    contact1,
                    contact2,
                    feedback2
                  }
                ]
              };
              
            
          const updatedEmployeeList = userValue.map(employee => {
            if(employee.task) {
              // Assuming task is an array
              employee.task[1]=postData;
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
            console.log(res);
            localStorage.setItem('status',2);
              toast.success("Candidate added successfully")
              navigate('/phase3Task')
            
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
            setSession(resp.task[1].phase2[0].session);
            setPan(resp.task[1].phase2[0].pan);
            // setContact(resp.task[1].phase2[0].contact);
            // setBank(resp.task[1].phase2[0].bank);
            setInstitute1(resp.task[1].phase2[0].institute1);
            setInstitute2(resp.task[1].phase2[0].institute2);
            setInstitute3(resp.task[1].phase2[0].institute3);
            setInstitute4(resp.task[1].phase2[0].institute4);
            setMarks1(resp.task[1].phase2[0].marks1);
            setMarks2(resp.task[1].phase2[0].marks2);
            setMarks3(resp.task[1].phase2[0].marks3);
            setMarks4(resp.task[1].phase2[0].marks4);
            setMarksheet1(resp.task[1].phase2[0].marksheet1);
            setMarksheet2(resp.task[1].phase2[0].marksheet2);
            setMarksheet3(resp.task[1].phase2[0].marksheet3);
            setMarksheet4(resp.task[1].phase2[0].marksheet4);
            setAdhar(resp.task[1].phase2[0].adhar);
            setContact1(resp.task[1].phase2[0].contact1);
            setContact2(resp.task[1].phase2[0].contact2);
            setRelarion1(resp.task[1].phase2[0].relation1);
            setRelarion2(resp.task[1].phase2[0].relation2);
            setAccountNo(resp.task[1].phase2[0].accountNo);
            setBankName(resp.task[1].phase2[0].bankName);
            setFeedback2(resp.task[1].phase2[0].feedback2);
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
    <div className="container right-container">
         <div className='container head-name'>
                <h3>Phase 2 Task</h3>
            </div>
    <form onSubmit={handlePostData}>
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
                        <input required value={institute1} onChange={(e) => setInstitute1(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Total Percentage<span className="errmsg">*</span></label>
                        <input required value={marks1} onChange={(e) => setMarks1(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>upload Marks sheet<span className="errmsg">*</span></label>
                        <input required onChange={(e) => setMarksheet1(e.target.files[0].name)}  type="file" className="form-control"></input>
                        {marksheet1 &&
                        <span >{marksheet1}</span>
                        }
                    </div>
            </div>
        </div>
        <div className="row block mt-2">
            <h6>12th Grade Delails</h6>
            <hr></hr>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Institute Name<span className="errmsg">*</span></label>
                        <input required value={institute2} onChange={(e) => setInstitute2(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Total Percentage<span className="errmsg">*</span></label>
                        <input required value={marks2} onChange={(e) => setMarks2(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>upload Marks sheet<span className="errmsg">*</span></label>
                        <input required  onChange={(e) => setMarksheet2(e.target.files[0].name)} type="file" className="form-control"></input>
                        {marksheet2 &&
                        <span >{marksheet2}</span>
                        }
                    </div>
            </div>
        </div>
        <div className="row block mt-2">
            <h6>Graguate Deatils</h6>
            <hr></hr>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Institute Name<span className="errmsg">*</span></label>
                        <input required value={institute3} onChange={(e) => setInstitute3(e.target.value)} type="text" className="form-control"></input>
                        
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Total Percentage<span className="errmsg">*</span></label>
                        <input required value={marks3} onChange={(e) => setMarks3(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>upload Marks sheet<span className="errmsg">*</span></label>
                        <input required onChange={(e) => setMarksheet3(e.target.files[0].name)} type="file" className="form-control"></input>
                        {marksheet3 &&
                        <span >{marksheet3}</span>
                        }
                    </div>
            </div>
        </div>
        <div className="row block mt-2">
            <h6>Post Graguate Details</h6>
            <hr></hr>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Institute Name<span className="errmsg">*</span></label>
                        <input required value={institute4} onChange={(e) => setInstitute4(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Total Percentage<span className="errmsg">*</span></label>
                        <input required value={marks4} onChange={(e) => setMarks4(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>upload Marks sheet<span className="errmsg">*</span></label>
                        <input required onChange={(e) => setMarksheet4(e.target.files[0].name)} type="file" className="form-control"></input>
                        {marksheet4 &&
                        <span >{marksheet4}</span>
                        }
                    </div>
            </div>
        </div>
               
              
             
        </div>
    </div>
    }

{  data.isContact==true &&
   <div className="col-lg-12  mt-2 head">
        {/* <div className="row"> */}
        <h5>Emergency Contact Details<span className="errmsg">*</span></h5>
            <div className="p-4">
       {/* <hr></hr> */}
       <div className="row block mt-2">
            <h6>Contact 1</h6>
            <hr></hr>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Relation<span className="errmsg">*</span></label>
                        <select required value={relation1} onChange={(e) => setRelarion1(e.target.value)} className="form-control">
                        <option >Select the option</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="mother">Brother/Sister</option>
                    </select>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Contact Number<span className="errmsg">*</span></label>
                        <input required value={contact1} onChange={(e) => setContact1(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
           
        </div>
        <div className="row block mt-2">
            <h6>Contact 2</h6>
            <hr></hr>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Relation<span className="errmsg">*</span></label>
                        <select required value={relation2} onChange={(e) => setRelarion2(e.target.value)} className="form-control">
                        <option >Select the option</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="mother">Brother/Sister</option>
                    </select>
                    </div>
            </div>
            <div className="col-lg-6">
                      <div className="form-group ">
                        <label>Contact Number<span className="errmsg">*</span></label>
                        <input required value={contact2} onChange={(e) => setContact2(e.target.value)} type="text" className="form-control"></input>
                    </div>
            </div>
        </div>
              
             
        </div>
    </div>
    }

{ data.isBank==true &&
 <div className="col-lg-12  mt-2 head">
 {/* <div className="row"> */}
 <h5>Bank Details<span className="errmsg">*</span></h5>
     <div className="p-4">
{/* <hr></hr> */}
<div className="row block mt-2">
     <h6>please select valid account number</h6>
     <hr></hr>
     <div className="col-lg-6">
               <div className="form-group ">
                 <label>Bank Name<span className="errmsg">*</span></label>
                 <select required value={bankName} onChange={(e) => setBankName(e.target.value)} className="form-control">
                 <option >Select the option</option>
                 <option value="hdfc">HDFC</option>
                 <option value="sbi">SBI</option>
                 <option value="icic">ICIC</option>
             </select>
             </div>
     </div>
     <div className="col-lg-6">
               <div className="form-group ">
                 <label>Account Number<span className="errmsg">*</span></label>
                 <input required value={accountNo} onChange={(e) => setAccountNo(e.target.value)} type="text" className="form-control"></input>
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
                        <input required value={pan} onChange={(e) => setPan(e.target.value)} type="text" className="form-control"></input>
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
                        <input required value={adhar} onChange={(e) => setAdhar(e.target.value)} type="text" className="form-control"></input>
                </div>

          
    </div>
    }
   {  data.isSession==true &&
   <div className="col-lg-6">
                <div className="form-group block">
                    <h5>Session with Founder<span className="errmsg">*</span></h5>
                    <hr></hr>
                    <p>If you not Attended the Session with Founder please select as not Attended.</p>
                    <select required value={session} onChange={(e) => setSession(e.target.value)} className="form-control">
                        <option >Select the option</option>
                        <option value="attented">Attended</option>
                        <option value="notAttended">Not Attended</option>
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
                       
                        <textarea required value={feedback2} onChange={(e) => setFeedback2(e.target.value)} className="form-control"></textarea>
                    </div>
               </div>
               }
    <div className="submit">
        <button className="btn">Save</button>
    </div>
    </div>
    </form>
 </div>
  )
}

export default Phase2Task