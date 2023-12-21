import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import search from "./assets/search.png"
import './OnBoarding.css';
import { useNavigate } from 'react-router-dom';

const CandidateStatus = () => {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [DOJFilter, setDOJFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employeeList").then((res) => {
            return res.json();
        }).then((resp) => {
            setData(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const LoadEdit = (id) => {
        navigate("/updateCandidate/edit/" + id);
    }
    const onSearch=(e)=>{
        setSearchTerm(e.target.value);
      }
      const filteredEmployees = data.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchTerm.toLowerCase())||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase())||
        employee.gender.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const onFilter=()=>{
        let filtereddata=[];
        if(genderFilter!=null || genderFilter!=""){
             filtereddata = data.filter(employee =>
                employee.gender.toLowerCase()===genderFilter.toLowerCase()
              );
              console.log(filtereddata)
        }

        if(countryFilter!=null || countryFilter!=""){
            filtereddata = data.filter(employee =>
                employee.country.toLowerCase()===countryFilter.toLowerCase()
              );
              console.log(filtereddata)
        }

      

      }

  return (
    <div className='header-block d-flex mt-5'>
    <div className='filter-block '>
        <div className='filter-head'>
            <h5>Add Filter</h5>
        </div>
        <div className='filter-body'>
        <form onSubmit={onFilter}>
            {/* <div className="row">
                        <div className="form-group">
                            <select  className="form-control">
                            <option value="india">Filter By Status</option>
                                    <option value="india">Open</option>
                                    <option value="china">Draft</option>
                                    <option value="china">Processed</option>
                            </select>
                        </div>
            </div> */}
       
            <div className="row ">
                        <div className="form-group">
                            <select value={genderFilter}  onChange={e=>setGenderFilter(e.target.value)} className="form-control">
                            <option >Filter By gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    
                            </select>
                        </div>
            </div>
            <div className="row mt-3">
                        <div className="form-group">
                            <select value={countryFilter}  onChange={e=>setCountryFilter(e.target.value)} className="form-control">
                            <option>Filter By country</option>
                                    <option value="india">India</option>
                                    <option value="china">China</option>
                                    
                            </select>
                        </div>
            </div>

            <div className="row mt-3">
                        <div className="form-group">
                           <input type="date" value={DOJFilter}  onChange={e=>setDOJFilter(e.target.value)} placeholder='Filter By joining Date'></input>
                        </div>
            </div>

            </form>
        </div>
        <div className='filter-footer  mt-5'>
            <button className='btn' onClick={()=>{onFilter()}}>Filter</button>
        </div>
        
    </div>
    <div className='main-block'>
   <div className="container-fluid">
        <div className="heading d-flex">
            <h4>OnBoarding List</h4>
            <div className='button-container d-flex'>
                <div className='search-box d-flex'>
                    <input className="search-input" type="text" onChange={onSearch} placeholder='Search...'></input>
                    <a className='search-btn' >
                        <img  src={search} width="30px" height="30px"></img></a>
                </div>
            {/* <button onClick={()=>{openModal()}} className="btn">Add new Employee</button> */}
            <a href="/addCandidate" className="btn">Add new Candidate</a>
            </div>
        </div>
    </div>
   
  <div className='table-container'>
  <div>
  <table className="table">
<thead className="thead-dark">
<tr>
  <th scope="col">#</th>
  <th scope="col">Empployee Name</th>
  <th scope="col">Employee Designation</th>
  <th scope="col">Date of Joining</th>
  <th scope="col">Phone Number</th>
  <th scope="col">Email</th>
  <th scope="col">Country</th>
  <th scope="col">Gender</th>
  {/* <th scope="col">Status</th> */}
  <th scope="col">Action</th>
</tr>
</thead>
<tbody>

{filteredEmployees &&
    filteredEmployees.map(item => (
<tr key={item.id}>
  <td >{item.id}</td>
  <td>{item.name}</td>
  <td>{item.designation}</td>
  <td>{item.DOJ}</td>
  <td>{item.phone}</td>
  <td>{item.email}</td>
  <td>{item.country}</td>
  <td>{item.gender}</td>
  {/* <td>{item.status}</td> */}
   {/* <td><a href={`/updateEmployee/${item.id}`}><img src="https://cdn.icon-icons.com/icons2/2621/PNG/512/gui_edit_icon_157165.png" width="40px" height="40px"></img></a> */}
 <td>
   
     <a  onClick={() => { LoadEdit(item.id) }} ><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/draft-1764815-1501695.png" width="40px" height="40px"></img></a>

    </td>

</tr>
 ))}

</tbody>
</table>
</div>

</div>
</div>
</div>
  )
}

export default CandidateStatus