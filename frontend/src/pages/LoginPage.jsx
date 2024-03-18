import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/auth.context";  // <== IMPORT

const API_URL = "http://localhost:5005/api";


const LoginPage = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const requestBody = { email, password };
    try {
      const res =await axios.post(`${API_URL}/auth/login`, requestBody)
      console.log(res)
      storeToken(res.data.authToken)

        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 
      authenticateUser();   
      navigate('/')
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }


  }
  return (
    <div className="flex flex-col justify-center items-center gap-2">

    <h1>Login</h1>
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
    <input type="text" placeholder="E-mail" className="input input-bordered w-full max-w-xs"
    onChange={(e)=>setEmail(e.target.value)} 
    />
    <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs"
    onChange={(e)=>setPassword(e.target.value)} 
    />
     
    <button className="btn" type="submit">Login</button>
    </form>

    { errorMessage && <p className="error-message">{errorMessage}</p> }

    <p>No account?</p>
    <Link to={"/signup"}> signup</Link>
  </div>
  )
}

export default LoginPage
