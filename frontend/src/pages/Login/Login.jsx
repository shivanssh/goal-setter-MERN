import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../../features/auth/authSlice";
import Input from "../../components/Input/Input";
import CustomButton from "../../components/CustomButton/CustomButton";
import Spinner from "../../components/Spinner/Spinner";

import "./Login.scss";

const Login = () => {
  const initialFormValue = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );

  const [formValue, setFormValue] = useState(initialFormValue);

  const { email, password } = formValue;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate("/");
      dispatch(reset());
      toast.success("User Logged-In successfully");
    }
  }, [user, isError, message, isSuccess, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formValue));
    setFormValue(initialFormValue);
  };

  const onChange = (e) => {
    setFormValue((preValue) => ({
      ...preValue,
      [e.target?.name]: e.target?.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register">
      <div className="container">
        <section className="header">
          <h1>
            <FaSignInAlt />
            Login
          </h1>
          <p>Login and Start setting goals</p>
        </section>
        <section>
          <form onSubmit={handleSubmit} className="register-form">
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

            <CustomButton
              label="Login"
              type="submit"
              className="register-button"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
