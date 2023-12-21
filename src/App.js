import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import NewEmployee from './NewEmployee';
import OnBoarding from './OnBoarding';
import { useEffect, useState } from 'react';
import UserDashboard from './UserDashboard';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import AddCandidate from './AddCandidate';
import EditCandidate from './EditCandidate';
import Logindummy from './Logindummy';
import CandidateDashboard from './CandidateDashboard';
import CandidateOnboarding from './CandidateOnboarding';
import CandidateOnboardingList from './CandidateOnboardingList';
import Phase2Task from './Phase2Task';
import Phase3Task from './Phase3Task';
import CandidateStatus from './CandidateStatus';
import SignatureSubmit from './SignatureSubmit';
import Training from './Training';

function App() {
  // const userrole=sessionStorage.getItem("userrole")!=null?sessionStorage.getItem("userrole").toString():"";
  // const [path,setPath]=useState("")
  // useEffect(()=>{
  //   const userrole=sessionStorage.getItem("userrole")!=null?sessionStorage.getItem("userrole").toString():"";

  //   if(userrole=='admin'){
  //     setPath(<Dashboard/>)
  //   }
  //   if(userrole=='user'){
  //     setPath(<UserDashboard/>)
  //   }
  
  //   console.log(userrole);
  //   fetch(" http://localhost:8000/roleaccess?role="+userrole).then(res=>{
  //     if(!res.ok){
  //       return false;
  //     }
  //     return res.json();
  //   }).then(res=>{
  //     if(res.length>0){
  //       let userobj=res[0];
  //     }
  //   })
  // }, []);
  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
     
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
    
      
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     
      <Route path='/newEmployee' element={<NewEmployee/>}></Route>
      <Route path='/onBoarding' element={<OnBoarding/>}></Route>
      <Route path='/addEmployee' element={<AddEmployee/>}></Route>
      <Route path='updateEmployee/:id' element={<UpdateEmployee/>}></Route>
      <Route path='addCandidate' element={<AddCandidate/>}></Route>
      <Route path='updateCandidate/edit/:id' element={<EditCandidate/>}></Route>
      <Route path='logindummy' element={<Logindummy/>}></Route>
      <Route path='candidate-dashboard/:id' element={<CandidateDashboard/>}></Route>
      <Route path='candidate-onBoarding' element={<CandidateOnboarding/>}></Route>
      <Route path='candidate-dashboard/canonBoarding/:id' element={<CandidateOnboardingList/>}></Route>
      <Route path='phase2Task/:id' element={<Phase2Task/>}></Route>
      <Route path='phase3Task/:id' element={<Phase3Task/>}></Route>
      <Route path='signature/:id' element={<SignatureSubmit/>}></Route>
      <Route path='training/:id' element={<Training/>}></Route>
      <Route path='candidate-status' element={<CandidateStatus/>}></Route>
      {/* <Route path="update/:id" element={<} */}
     </Routes>

     </BrowserRouter>
   
    </div>
  );
}

export default App;
