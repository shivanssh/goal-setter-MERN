import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.scss";
import Input from "../../components/Input/Input";
import CustomButton from "../../components/CustomButton/CustomButton";

const Register = () => {
  const initialFormValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const [error, setError] = useState("");

  const { name, email, password, confirmPassword } = formValue;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate('/')
      toast.success("User registered successfully");
    }
  }, [user, isError, message, isSuccess, dispatch, navigate]);
  const handleSubmit = (e) => {
    if (name) e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
          } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(register(user));
      setFormValue(initialFormValue);
    }
  };

  const onChange = (e) => {
    setError("");
    setFormValue((preValue) => ({
      ...preValue,
      [e.target?.name]: e.target?.value,
    }));
  };

  return (
    <div className="register">
      <div className="container">
        <section className="header">
          <h1>
            <FaUser />
            Register
          </h1>
          <p>Please register yourself to add goals</p>
        </section>
        <section>
          <form onSubmit={handleSubmit} className="register-form">
            <Input
              name="name"
              id="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={onChange}
              required
            />
            <Input
              name="email"
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email id"
              onChange={onChange}
              value={email}
              required
            />
            <Input
              name="password"
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={onChange}
              value={password}
              required
            />
            <Input
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-Enter your password"
              onChange={onChange}
              value={confirmPassword}
              required
            />
            <div className="error">{error && error}</div>
            <CustomButton
              label="Submit"
              type="submit"
              className="register-button"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
