import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  return (
    <div className=" p-5">
<div className="flex justify-between">
<ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
  <li>
  <Link to="/" className=""> Home </Link>

  </li>
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