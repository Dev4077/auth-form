import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const formDataFromStorage = localStorage.getItem("formData");
    if (formDataFromStorage) {
      setFormData(JSON.parse(formDataFromStorage));
    }
  }, []);


  const handleLogOut = () => {
    Cookies.remove("loggedIn");
    sessionStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <>
      <div className="adminDashBoard">
        <div className="navbar">
          <h2>Dashboard</h2>
          <button type="Submit" onClick={handleLogOut}>
            LogOut
          </button>
        </div>
        <div className="container-table">
<h1>Register User</h1>
  <table className="rwd-table">
    <tbody>
      <tr>
        <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
      </tr>
        {formData.map((data, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
      </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </>
  );
};

export default AdminDashboard;
