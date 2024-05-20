import React, { useState, useContext, useEffect } from "react";
import "./RegistrationPage.css";
import { authContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function RegistrationPage() {
  const { handleRegister, setError } = useContext(authContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const createUser = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Some inputs are empty!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords are not the same!");
      return;
    }

    setIsLoading(true);

    let newObj = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await handleRegister(newObj);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(false);
  }, []);

  const openConfirm = () => {
    createUser();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim() ||
      password !== passwordConfirm
    ) {
      // alert("You filled the form incorrectly!!");
      // return;
    } else {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <div className="register__inner">
        <ArrowBackIcon onClick={() => navigate("/")} className="arrowimg" />
        <form action="">
          <div>REGISTRATION</div>
          <label>First name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            name="name"
          />

          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
          />
          <label>Confirm password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm password"
            name="con_password"
          />
          <button onClick={openConfirm}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
