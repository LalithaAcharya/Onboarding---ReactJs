import { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [access, setAccess] = useState([]);
    const [totalData, setTotalData] = useState(0);
  
    const navigate=useNavigate();
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/user');
            const jsonData = await response.json();
            setData(jsonData);
            setTotalData(jsonData.length)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

        let username=sessionStorage.getItem('username');
        if(username == "" || username === null){
            navigate('/login');
        }
       
        for(let i=0;i<data.length;i++){
            if(data[i].id==username){
                // console.log(data[i]);
                setAccess(data[i].role)
            }
        }
        console.log(access)

        
      },[data]); 
  return (
    <div>   
        <div className="container-fluid mt-5">
            <div className="heading">
                <h4>Dashboard</h4>
            </div>
            {
              access=='admin' &&
            <div class="row p-5">
                <div class="col-sm-6">
                        <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Onboarding - Total Employees</h5>
                                        <div className='row'>
                                        <div className='col-6'>
                                            <img src="https://cdn-icons-png.flaticon.com/128/6462/6462992.png" width="60px" height="60px"></img>
                                        </div>
                                        {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                        <div className=' col-6 text-count'>
                                            <h1>{totalData}</h1>
                                        </div>
                                        </div>
                                        {/* <a href="#" class="btn">Go somewhere</a> */}
                                    </div>
                        </div>
                </div>
        
      
                <div class="col-sm-6 ">
                        <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Onboarding - Completed Employees</h5>
                                        <div className='row'>
                                        <div className='col-6'>
                                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-completed-4720981-3915476.png?f=webp" width="60px" height="60px"></img>
                                        </div>
                                        {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                        <div className=' col-6 text-count'>
                                            <h1>50</h1>
                                        </div>
                                        </div>
                                        {/* <a href="#" class="btn">Go somewhere</a> */}
                                    </div>
                        </div>
                </div>
       
      
                <div class="col-sm-6 mt-5">
                        <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Onboarding - Pending Employees</h5>
                                        <div className='row'>
                                        <div className='col-6'>
                                            <img src="https://cdn3.iconfinder.com/data/icons/digital-marketing-4-11/65/169-512.png" width="60px" height="60px"></img>
                                        </div>
                                        {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                        <div className=' col-6 text-count'>
                                            <h1>50</h1>
                                        </div>
                                        </div>
                                        {/* <a href="#" class="btn">Go somewhere</a> */}
                                    </div>
                        </div>
                </div>
       
    
                <div class="col-sm-6 mt-5">
                        <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Onboarding - Draft Employees</h5>
                                        <div className='row'>
                                        <div className='col-6'>
                                            <img src="https://cdn-icons-png.flaticon.com/512/1060/1060379.png" width="60px" height="60px"></img>
                                        </div>
                                        {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                        <div className=' col-6 text-count'>
                                            <h1>150</h1>
                                        </div>
                                        </div>
                                        {/* <a href="#" class="btn">Go somewhere</a> */}
                                    </div>
                        </div>
                </div>
    </div>
}
{
    access=='user' && 
    <div>
        </div>
}
    </div>
    </div>
    
  )
}

export default Dashboard