import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../../components/Input/Input";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./Login.scss";

const Login = () => {
  const initialFormValue = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);

  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", formValue);
    setFormValue(initialFormValue);
  };

  const onChange = (e) => {
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
