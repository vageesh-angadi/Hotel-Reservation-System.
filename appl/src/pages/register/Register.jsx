import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import "./register.css";
// import { createError } from "../../../../api/utils/error";

const Register = () => {
  
  const [credentials, setCredentials] = useState({
    username: undefined,
    email:undefined,
    password: undefined,
  });

//   const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    // console.log({username:credentials["username"],email:credentials["email"],password:credentials["password"]});
    try {
      const res = await axios.post("http://localhost:8800/auth", {username:credentials["username"],email:credentials["email"],password:credentials["password"]});
    //   console.log(res.data.otherDetails);
    //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data.otherDetails });
    //   console.log(res.data.otherDetails);
      console.log("succesfully registered");
      navigate("/login")
    } catch (err) {
    //   dispatch({ type: "LOGIN_FAILURE", payload: err });
        console.log("error in register");
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email address"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button  onClick={handleClick} className="lButton">
          Register
        </button>
        {/* {error && <span>{error.message}</span>} */}
      </div>
    </div>
  );
};

export default Register;