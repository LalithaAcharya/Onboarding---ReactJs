import { useNavigate } from 'react-router-dom';
import './NewEmployee.css';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import search from "./assets/search.png"


const NewEmployee = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[password,passwordchange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[country,countrychange]=useState("india");
    const[gender,genderchange]=useState("male");
    const[address,addresschange]=useState("");
    const[role,rolechange]=useState("");

   
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate=useNavigate();

   

    const deleteElement=(id)=>{
        let regobj={id,name,password,email,phone,country,address,gender}
        fetch(`http://localhost:8000/user/${id}`,{
          method:"Delete",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(regobj)
      }).then((res)=>{
          toast.success("Deleted successfully")
        //   navigate('/newEmployee')
      }).catch((err)=>{
          toast.error("Failed : "+err.message)
      })
    }

    
      const onSearch=(e)=>{
        setSearchTerm(e.target.value);
      }
      const filteredEmployees = data.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchTerm.toLowerCase())||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase())||
        employee.gender.toLowerCase().includes(searchTerm.toLowerCase())
      );

      useEffect(() => {
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
      }, [data]); 

  return (
    <div className='main-block mt-5'>
       <div className="container-fluid">
            <div className="heading d-flex">
                <h4>OnBoarding - Employees List</h4>
                <div className='button-container d-flex'>
                    <div className='search-box d-flex'>
                        <input className="search-input" type="text" onChange={onSearch} placeholder='Search...'></input>
                        <a className='search-btn' >
                            <img  src={search} width="30px" height="30px"></img></a>
                    </div>
                {/* <button onClick={()=>{openModal()}} className="btn">Add new Employee</button> */}
                <a href="/addEmployee" className="btn">Add new Employee</a>
                </div>
            </div>
        </div>
       
      <div className='table-container'>
      <div>
      <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Full Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Country</th>
      <th scope="col">Gender</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
 
        {filteredEmployees.map((item) => (
    <tr>
      <td  key={item.id}>{item.id}</td>
      <td  key={item.name}>{item.name}</td>
      <td  key={item.email}>{item.email}</td>
      <td  key={item.phone}>{item.phone}</td>
      <td  key={item.country}>{item.country}</td>
      <td  key={item.gender}>{item.gender}</td>
      <td><a href={`/updateEmployee/${item.id}`}><img src="https://cdn.icon-icons.com/icons2/2621/PNG/512/gui_edit_icon_157165.png" width="40px" height="40px"></img></a>
      <a  onClick={()=>{deleteElement(item.id)}}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" width="40px" height="40px"></img></a></td>

    </tr>
     ))}
    
  </tbody>
</table>
</div>

    </div>
    </div>
  )
}

export default NewEmployee;
