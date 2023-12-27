import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext);
  function handleClick(e){
    const s=e.target.value;
    if(s==="Register") navigate("/register")
    else if(s==="logout"){
      console.log("logout pressed");
      localStorage.removeItem("user");
      navigate("/");
    }
    else navigate("/login")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? ( <div className="navItems">
            {/* <button onClick={handleClick} value="User" className="">{user.username}</button> */}
            {user.username}
            <button onClick={handleClick} value="logout" className="navButton">Logout</button>
          </div> ) : (
          <div className="navItems">
            <button onClick={handleClick} value="Register" className="navButton">Register</button>
            <button onClick={handleClick} value="login" className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar