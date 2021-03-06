import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./Styles/RegisterLogin.css";

export const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | e-mart shopping platform";
  }, []);

  const userDetails = {
    name,
    email,
    mobile,
    password,
    repassword,
  };

  const getRegister = (event) => {
    event.preventDefault();

    fetch(`https://emart-server.herokuapp.com/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/user/login");
      })

      .catch((error) => console.log(error));
  };

  return (
    <div className="register_container">
      <Navbar />
      <div>
        <form onSubmit={getRegister} className="form" action="">
          <h2>Signup</h2>
          <input
            required
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            type={showPass ? `password` : "text"}
            placeholder="Password"
            autocomplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>
            <input
              type="checkbox"
              onClick={() => {
                setShowPass(!showPass);
              }}
            />{" "}
            <span>Show Password</span>
          </span>
          <input
            required
            type={showPass ? `password` : "text"}
            placeholder="Confirm Password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />

          <input
            className="mobile_input_feild"
            required
            type="number"
            placeholder="+91 | Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input type="submit" value="Signup" />

          <div className="term_privacy">
            By continuing, I agree to the <a href="#">Terms of Use</a> &amp;{" "}
            <a href="#">Privacy Policy</a>
          </div>

          <p className="login_redirect_link">
            Already have an account? <Link to={"/user/login"}>Sign in</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
