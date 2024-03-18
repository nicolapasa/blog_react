import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
const API_URL = "http://localhost:5005/api";

const SignupPage = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [fullName, setFullName]=useState('')
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault()
        // Create an object representing the request body
        const requestBody = { email, password, fullName };
        try {
          const res=await    axios.post(`${API_URL}/auth/signup`, requestBody)
          console.log(res.data)
          navigate('/login');
        } catch (error) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
       
  }
  return (
    <div className="flex flex-col justify-center items-center gap-2">

      <h1>SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
      <input type="text" placeholder="E-mail" className="input input-bordered w-full max-w-xs"
      onChange={(e)=>setEmail(e.target.value)} 
      />
      <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs"
      onChange={(e)=>setPassword(e.target.value)} 
      />
       <input type="text" placeholder="fullName" className="input input-bordered w-full max-w-xs"
      onChange={(e)=>setFullName(e.target.value)} 
      />
      <button className="btn" type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage