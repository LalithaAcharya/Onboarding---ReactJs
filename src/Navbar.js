import { useLocation } from "react-router-dom"
import './Navbar.css'
import { useEffect, useState} from "react";
import logout from './assets/logout.png'
const Navbar=() => {
    const [data, setData] = useState([]);
    const [access, setAccess] = useState([]);
    const location= useLocation();
    let username=sessionStorage.getItem('username');
    const candidate=sessionStorage.getItem('candidate');
    // console.log(location);
    useEffect(() => {
         username=sessionStorage.getItem('username');
         const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/user');
              const jsonData = await response.json();
              setData(jsonData);
            
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
          for(let i=0;i<data.length;i++){
            if(data[i].id==username){
                // console.log(data[i]);
                setAccess(data[i].role)
            }
        }
    }, [data]); 

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="./">New Joiner Experience</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
 
  
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  {
    location.pathname !="/"  && location.pathname !="/login" && location.pathname !=`/candidate-dashboard/${candidate}`  && location.pathname !="/candidate-onBoarding" &&  location.pathname !=`/candidate-dashboard/canonBoarding/${candidate}` && location.pathname !=`/phase2Task/${candidate}` && location.pathname !=`/phase3Task/${candidate}` && location.pathname !=`/signature/${candidate}` && location.pathname !=`/training/${candidate}` &&
    <div class="navbar-nav">
         <a className={location.pathname== '/dashboard' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/dashboard">Dashboard</a>
     {
      access=='admin' &&
      <a className={location.pathname== '/newEmployee' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/newEmployee">Add New Employee</a>
     }
      {
      access=='admin' &&
      <a className={location.pathname== '/onBoarding' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/onBoarding">Candidate List</a>
    }
    {
      access=='admin' &&
      <a className={location.pathname== '/candidate-status' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/candidate-status">Onboarding status</a>
    }

    </div>
}
  </div>
  <div>
    {
        location.pathname!='/login'?(
        location.pathname=="/"?
    <a href="./login" className="btn">Login</a> : <div className="d-flex user-info"><img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" width="40px" height="40px"></img><p className="username">Welcom {username}!</p><a href="/" className="username"><img style={{"position":"relative","bottom":'8px'}} src={logout} width="40px" height="40px"></img></a></div>):""
}
  </div>
 
</nav>


 { (location.pathname ==`/candidate-dashboard/canonBoarding/${candidate}` ||  location.pathname ==`/phase2Task/${candidate}` ||  location.pathname ==`/phase3Task/${candidate}` ||  location.pathname ==`/signature/${candidate}` ||  location.pathname ==`/training/${candidate}`) &&
 <div className='sidebar-container'>
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse ">
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3">
        <a
          href={`/candidate-dashboard/canonBoarding/${candidate}`}
          className={location.pathname== `/candidate-dashboard/canonBoarding/${candidate}` ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
          aria-current="true"
        >
          <span>Phase 1 Activities</span>
        </a>
        <a href={`/phase2Task/${candidate}` }className={location.pathname== `/phase2Task/${candidate}` ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}>
          <span>Phase 2 Activities</span>
        </a>
        <a href={`/phase3Task/${candidate}`} className={location.pathname== `/phase3Task/${candidate}` ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}>
          <span>Phase 3 Activities</span></a>

          <a href={`/signature/${candidate}`} className={location.pathname== `/signature/${candidate}` ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}>
          <span>Signature</span></a>
          <a href={`/training/${candidate}`} className={location.pathname== `/training/${candidate}` ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}>
          <span>Training Deatils</span></a>
        
        <a href={`/candidate-dashboard/${candidate}`} class="list-group-item list-group-item-action py-2 ripple"
          ><span>Back to Dashboard</span></a
        >
        
      </div>
    </div>
  </nav>
        </div>
 }
 </div>

  )
}

export default Navbar