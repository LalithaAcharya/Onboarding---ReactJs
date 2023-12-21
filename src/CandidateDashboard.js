import { useNavigate, useParams } from 'react-router-dom';
import './CandidateDashboard.css'
import start from './assets/start.png'
import { useEffect } from 'react';
import { useState } from 'react';
const CandidateDashboard = () => {
    const { id } = useParams(); 
    const status=localStorage.getItem('status');
    const [data, setData] = useState([]);
    const [user, setUserValue] = useState([]);
    const [info, setInfo] = useState([]);
    let navigate=useNavigate();

    useEffect(() => {
      
        let username=sessionStorage.getItem('username');
        if(username == "" || username === null){
            navigate('/login');
        }
      
      },[]); 
      

      useEffect(() => {
        fetch("http://localhost:8000/employeeList?id="+id).then((res) => {
            return res.json();
        }).then((resp) => {
            // console.log(resp);
            if(resp[0].task.length!=0){
            setData(resp[0].task[0].phase1[0].photo);
            }
            setUserValue(resp[0].task);
            setInfo(resp[0]);
           console.log(user)
           
            // if(data.task?.length){
            //     if(data.task[0].phase1.length){
            //       setFormData(resp[0].task[0]);
            //     }
            // }
        }).catch((err) => {
            console.log(err.message);
        })
       
    }, [])

    
      useEffect(() => {
        return () => {
          if (data) {
            URL.revokeObjectURL(data);
          }
        };
      }, [data]);
  return (
    <div>
        <div className="container-fluid dash-container mt-5">
            <div className="head-container">
                <h2>Dashboard</h2>
            </div>
            <div className='dash-main-content'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='info-container d-flex'>
                            <div className='img'>
                                { data!="" ?  <img src={data} width="150px" height="150px"></img> :
                            <img src="https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png" width="150px" height="150px"></img>
                                 } 
                                </div>
                            <div className='details'>
                                { user.length==0?
                                <h5>Candidate Name : {info.name}</h5> :<h5>Candidate Name : {user[0].phase1[0].fullName}</h5>
                                }
                                <p>Designation :  {info.designation}</p>
                                { user.length==0?<p>phone  : {info.phone}</p> :
                                <p>phone  : {user[0].phase1[0].number}</p>
                                }
                                <p>email :  {info.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='container onboarding'>
                            <img src="https://www.cielhr.com/wp-content/uploads/2019/02/ciel-blog-onboarding-new-employees.png" width="400px" height="100px"></img>
                                <h2>Welcom Onboaring!</h2>
                                <h6>To Start onBoarding Click below</h6>
                                <a href={`./canonBoarding/${id}`} className='btn'>Start OnBoarding</a>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container status-container'>
                <img src={start} width="60px" height="40px"></img>
                {/* { status==1 ? <h5>Inprogress... you have completed phase 1</h5>:
                <h5>You Have Not Yet Started the OnBoarding</h5>
                } */}
                {
                    status==1 && <h5>Inprogress... you have completed phase 1</h5>
                }
                {
                    status==2 && <h5>Inprogress... you have completed phase 2</h5>
                }
                {
                    status==3 && <h5>Inprogress... you have completed phase 3</h5>
                }
                {
                    (status!=1 && status!=2 ) && <h5>You Have Not Yet Started the OnBoarding</h5>
                }
        </div>
        </div>    
     
    </div>
  )
}

export default CandidateDashboard