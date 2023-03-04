import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Button from "../../components/Button/Button";
import Register from "../../images/register.svg";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Redux/action/auth.action";
const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const signupHandler = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/", { replace: true });
    }
  }, [auth.authenticate, navigate]);
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-form">
          <form className="signup-box" onSubmit={signupHandler}>
            <h1 className="signup-header">Sign Up</h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "5px",
              }}
            >
              <div className="input-box">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <FaUser className="input--icon" />
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-box">
              <MdEmail className="input--icon" />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <FaLock className="input--icon" />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="successful-msg">
              {auth.message.length > 0
                ? auth.message
                  ? auth.message
                  : ""
                : ""}
            </p>

            <Button
              style={{ backgroundColor: "#4481eb", color: "#fff" }}
              type="submit"
            >
              SIGN UP
            </Button>
          </form>
          {/* others login box  */}
          <div className="others-login-box">
            <p>Or sign in with special platforms</p>
            <div className="others-icon-box">
              <FaFacebookF className="icon" />
              <BsGoogle className="icon" />
              <BsTwitter className="icon" />
              <FaLinkedinIn className="icon" />
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="login-information">
            <h1>One of us ?</h1>
            <p>
              This is admin dashboard. If you new please <br />
              create an account!
            </p>
            <Button
              style={{ border: "2px solid #fff", color: "#fff" }}
              onClick={() => navigate("/signing", { replace: true })}
            >
              SIGN IN
            </Button>
          </div>
          <img src={Register} alt="" className="register-img" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
