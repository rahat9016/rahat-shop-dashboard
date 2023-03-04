import React, { useEffect, useState } from "react";
import "./style.css";
import { FaLock, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import Button from "../../components/Button/Button";
import Log from "../../images/log.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/action/auth.action";
const Signing = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  //If auth is authenticated then replace to main location
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/", { replace: true });
    }
  }, [auth.authenticate, navigate]);
  return (
    <div className="signing-container">
      <div className="signing-wrapper">
        <div className="right-wrapper">
          <div className="signup-information">
            <h1>New Here ?</h1>
            <p>
              This is admin dashboard. If you new please <br />
              create an account!
            </p>
            <Button
              style={{ border: "2px solid #fff", color: "#fff" }}
              type="submit"
              onClick={() => navigate("/signup", { replace: true })}
            >
              Signup
            </Button>
          </div>
          <img src={Log} alt="" className="log-img" />
        </div>
        <div className="signing-form">
          <form className="login-box" onSubmit={userLogin}>
            <h1 className="login-header">Sign in</h1>
            <div className="input-box">
              <MdEmail />
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                required
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              style={{ backgroundColor: "#4481eb", color: "#fff" }}
              type="submit"
            >
              Login
            </Button>
          </form>
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
      </div>
    </div>
  );
};

export default Signing;
