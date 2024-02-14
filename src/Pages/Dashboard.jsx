import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    // localStorage.removeItem("loggedIn");
    Cookies.remove("loggedIn");
    sessionStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isChangePassVisible, setIsChangePassVisible] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [profileUpdated, setProfileUpdated] = useState("");

  useEffect(() => {
    const LoggedInCookiesData = Cookies.get("loggedIn");
    if (LoggedInCookiesData) {
      const loggedInUserObject = JSON.parse(LoggedInCookiesData);

      setLoggedInUser(loggedInUserObject);
      console.log(loggedInUserObject);

      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        const formData = JSON.parse(formDataString);

        const matchedUser = formData.find(
          (user) => user.email === loggedInUserObject.email
        );
        console.log(matchedUser);

        setUserDetails(matchedUser);
        setEditedFirstName(matchedUser.firstName);
        setEditedLastName(matchedUser.lastName);
      }
    } else {
      const LoggedInSessionData = sessionStorage.getItem("loggedIn");
      if (LoggedInSessionData) {
        const loggedInUserObject = JSON.parse(LoggedInSessionData);

        setLoggedInUser(loggedInUserObject);
        console.log(loggedInUserObject);

        const formDataString = localStorage.getItem("formData");
        if (formDataString) {
          const formData = JSON.parse(formDataString);

          const matchedUser = formData.find(
            (user) => user.email === loggedInUserObject.email
          );
          console.log(matchedUser);

          setUserDetails(matchedUser);
          setEditedFirstName(matchedUser.firstName);
          setEditedLastName(matchedUser.lastName);
        }
      }
    }
  }, []);

  const handleSave = () => {
    const formDataString = localStorage.getItem("formData");

    if (formDataString) {
      let formData = JSON.parse(formDataString);
      const index = formData.findIndex(
        (user) => user.email === loggedInUser.email
      );
      if (index !== -1) {
        formData[index].firstName = editedFirstName;
        formData[index].lastName = editedLastName;
        localStorage.setItem("formData", JSON.stringify(formData));
        setUserDetails({
          ...userDetails,
          firstName: editedFirstName,
          lastName: editedLastName,
        });
      }
    }
    setIsProfileVisible(true);

    // Update loggedIn user in local storage
    const updatedLoggedInUser = {
      ...loggedInUser,
      firstName: editedFirstName,
      lastName: editedLastName,
    };
    const isLoggedInCookies = Cookies.get("loggedIn");
    if (isLoggedInCookies) {
      Cookies.set("loggedIn", JSON.stringify(updatedLoggedInUser));
    } else {
      sessionStorage.setItem("loggedIn", JSON.stringify(updatedLoggedInUser));
    }
    //localStorage.setItem("loggedIn", JSON.stringify(updatedLoggedInUser));
    setIsProfileVisible(true);
    setProfileUpdated("Profile Succesfully Updated");
    setTimeout(() => {
      setProfileUpdated("");
    }, 4000);

    setTimeout(() => {
      setIsProfileVisible(false);
    }, 400);
  };

  const handleChangePassword = () => {
    if (oldPassword !== userDetails.password) {
      setPasswordError("Old password is incorrect.");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
    } else {
      // Update password in local storage
      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        let formData = JSON.parse(formDataString);
        const index = formData.findIndex(
          (user) => user.email === loggedInUser.email
        );
        if (index !== -1) {
          formData[index].password = newPassword;
          localStorage.setItem("formData", JSON.stringify(formData));
          setUserDetails({ ...userDetails, password: newPassword });
        }
      }
      setPasswordError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess("Password Succesfully Updated");
      setTimeout(() => {
        setPasswordSuccess("");
      }, 4000);

      setTimeout(() => {
        setIsChangePassVisible(false);
      }, 400);
    }
  };
  const handleProfileBtn = () => {
    if (isProfileVisible === false) {
      setIsProfileVisible(true);
    }
    if (isChangePassVisible === true) {
      setIsChangePassVisible(false);
    }
  };

  const handleChangePassBtn = () => {
    if (isChangePassVisible === false) {
      setIsChangePassVisible(true);
    }
    if (isProfileVisible === true) {
      setIsProfileVisible(false);
    }
  };
  const handleDashboardRetuen = () => {
    setIsProfileVisible(false);
    setIsChangePassVisible(false);
  };

  return (
    <>
      <div className="mainDashBoard">
        {/* navbar start */}
        <div className="navbar">
          <h2 onClick={handleDashboardRetuen}>Dashboard</h2>
          <button type="Submit" onClick={handleLogOut}>
            LogOut
          </button>
          <button onClick={handleProfileBtn}>Profile</button>
          <button onClick={handleChangePassBtn}>Change Password</button>
        </div>
        {/* navbar end */}

        {/* profile section start  */}
        {isProfileVisible && (
          <div className="container">
            {userDetails && (
              <div id="contact">
                <h3>Profile</h3>
                <fieldset>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    placeholder="First name"
                    value={editedFirstName}
                    type="text"
                    tabindex="1"
                    required
                    autofocus
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="LastName">Last Name:</label>
                  <input
                    placeholder="last name"
                    value={editedLastName}
                    type="text"
                    tabindex="1"
                    required
                    autofocus
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <button
                    type="submit"
                    id="contact-submit"
                    data-submit="...Sending"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </fieldset>
              </div>
            )}
          </div>
        )}
        {/* profile section end  */}

        {/* Dashboard  display section start */}
        {!isProfileVisible && !isChangePassVisible && (
          <div className="container">
            {userDetails && (
              <main>
                {<h5>{passwordSuccess}</h5>}
                {<h5>{profileUpdated}</h5>}
                <user-card>
                  <h2>User</h2>
                  <h1>First Name: {userDetails.firstName}</h1>
                  <h1>Last Name: {userDetails.lastName}</h1>
                </user-card>
              </main>
            )}
          </div>
        )}
        {/* Dashboard  display section end */}

        {/* PasswordChange section start */}
        {isChangePassVisible && (
          <div className="container">
            <div id="contact">
              <h3>Change Password</h3>
              {passwordError && <p>{passwordError}</p>}

              <fieldset>
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  placeholder="Old Password"
                  value={oldPassword}
                  type="password"
                  id="oldPassword"
                  required
                  autofocus
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="newPassword">New Password:</label>
                <input
                  placeholder="New Password"
                  value={newPassword}
                  type="password"
                  id="newPassword"
                  required
                  autofocus
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="newPassword">Confirm New Password:</label>
                <input
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  required
                  autofocus
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </fieldset>

              <fieldset>
                <button
                  name="submit"
                  type="submit"
                  id="contact"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </fieldset>
            </div>
          </div>
        )}
        {/* PasswordChange section end */}
      </div>
    </>
  );
};

export default Dashboard;
