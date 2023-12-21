import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SignatureCanvas from 'react-signature-canvas';
import './SignatureSubmit.css';


const SignatureSubmit = () => {
    const { id } = useParams();
  const signatureRef = useRef(null);
  const [data, setData] = useState([]);
  const [signature , setSignature]=useState("");
  const [userValue, setUserValue] = useState([]);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signatureImage = signatureRef.current.toDataURL();
    setSignature(signatureImage)

    const postData = {
        signature: [
            {
                signatureImage
            }
        ]
    }
    const updatedEmployeeList = userValue.map(employee => {
        if(employee.task) {
          // Assuming task is an array
          employee.signature=postData;
        } else {
          // If task doesn't exist, create a new array with the user value
          employee.signature.push(postData);
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
    // Pass the signature image data to the parent component or form
    // onSign(signatureImage);
  };

  useEffect(() => {
    fetch("http://localhost:8000/employeeList/" + id).then((res) => {
        return res.json();
    }).then((resp) => {
        setSignature(resp.signature.signature[0].signatureImage)
    }).catch((err) => {
        console.log(err.message);
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/employeeList?id="+id).then((res) => {
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
        
        <div className="signature-container">
        <div className='container head-name'>
                <h3>Signature</h3>
            </div>
    <div className="signature d-flex">
        <div className="current-signature">
            <h5>Signature</h5>
      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
      />
      <div>
     
        <button className="btn" onClick={handleClear}>Clear</button>
        <button className="btn" onClick={handleSave}>Submit</button>
      </div>
      </div>
      <div className="present-signature">
      {signature && (
        <div>
          <p>Current Signature:</p>
          <img src={signature} alt="User Signature" />
        </div>
      )}
      </div>
      
      </div>
      <div className="container acknowladge">
        <h6>Note : By sign this you have Submiting the onboarding form once u submit you cant re-edit the form please make sure the details provided by you and the document attached is valid</h6>
      </div>
      </div>
    </div>
  );
}

export default SignatureSubmit
