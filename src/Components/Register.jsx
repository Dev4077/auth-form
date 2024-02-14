import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "./yup";
import "./Register.css";
import { useNavigate } from "react-router-dom";


const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
  alertForEmail: "",
};

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      let existingData = JSON.parse(localStorage.getItem("formData")) || [];

      const emailExists = existingData.some(
        (user) => user.email === values.email
      );
      if (emailExists) {
        values.alertForEmail =
          "Email already exists. Please choose a different email.";
        return;
      }
      const Payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      console.log(existingData);
      existingData.push(Payload);
      localStorage.setItem("formData", JSON.stringify(existingData));
      navigate("/login");

      // console.log(values);
    },
  });

  //
  return (
    <>
      <div className="RegCss">
        <div class="wrapper">
          <h2>Registration</h2>
          {values.alertForEmail && (
            <p className="alertForWrong">{values.alertForEmail}</p>
          )}

          <form action="#" onSubmit={handleSubmit}>
            <div class="input-box">
              <input
                type="text"
                placeholder="Enter your first name*"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && touched.firstName ? (
              <p>{errors.firstName}</p>
            ) : null}
            <div class="input-box">
              <input
                type="text"
                placeholder="Enter your last name*"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.lastName && touched.lastName ? (
              <p>{errors.lastName}</p>
            ) : null}
            <div class="input-box">
              <input
                type="text"
                placeholder="Enter your email*"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && touched.email ? <p>{errors.email}</p> : null}
            <div class="input-box">
              <input
                type="password"
                placeholder="Create password*"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password ? (
              <p>{errors.password}</p>
            ) : null}
            <div class="input-box">
              <input
                type="password"
                placeholder="Confirm password*"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
              />
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <p>{errors.confirm_password}</p>
            ) : null}
            <div class="input-box button">
              <input type="Submit"></input>
            </div>
            <div class="text">
              <h3>
                Already have an account? <a href="/login">Login now</a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
