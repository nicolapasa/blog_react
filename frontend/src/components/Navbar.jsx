import { useContext, useEffect, useState } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005/api";


const Navbar = () => {

const [pages, setPages] = useState([])


useEffect(() => {
  const getAllPages=async()=>{
    const response=await axios.get(`${API_URL}/page/`)

    setPages(response.data.pages)
  }
  
 getAllPages()
  
}, [pages])


  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  return (
    <div className=" p-5">
<div className="flex justify-between">
<ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
  <li>
  <Link to="/" className=""> Home </Link>
  </li>
  {pages.map((page)=>{

    return(
      <>
      <li>
      <Link to={`/page/${page._id}`} >{page.title}</Link>
      </li>
      </>
    )
  })
  
  }



{  
  isLoggedIn && (
    <>
    <li>
     <Link to="/dashboard" className=" " > Dashboard </Link>
     </li>
    </>
  )
}
</ul>
<ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
{!isLoggedIn && (
        <>
        <li>
          <Link to="/signup" className=""> <button>Sign Up</button> </Link>
          </li>
          <li>
          <Link to="/login" className=" "> <button>Login</button> </Link>
          </li>
        </>
      )}
      {
  isLoggedIn && (
    <>
      <button className="" onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
    </>
  )
}
  </ul>    
  </div>
  <div className="text-center text-6xl text-slate-950 roboto-bold">OCTONEWS</div>
    </div>
  )
}

export default Navbar