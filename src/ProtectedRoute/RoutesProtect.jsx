  import React from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  import Cookies from 'js-cookie';



  export const NonAuthRoute= () => {
    const isLoggedInCookies = Cookies.get('loggedIn');
    const isLoggedInSession = JSON.parse(sessionStorage.getItem('loggedIn'));
    if(isLoggedInCookies){
      return (
        <>
          {!isLoggedInCookies ? <Outlet/> : <Navigate to={"/"}/>}
          
        </>
      );
    }
    else{
      return (
        <>
          {!isLoggedInSession ? <Outlet/> : <Navigate to={"/"}/>}
          
        </>
      );
    }
  };

  export const AuthRoute= () => {
    const isLoggedInCookies = Cookies.get('loggedIn');
    const isLoggedInSession = JSON.parse(sessionStorage.getItem('loggedIn'));
    if(isLoggedInCookies){
    return (
      <>
        {isLoggedInCookies ? <Outlet/> : <Navigate to={"/login"}/>}
      
      </>
    );
    }
    else{
      return (
        <>
          {isLoggedInSession ? <Outlet/> : <Navigate to={"/login"}/>}
        
        </>
      );
    }
  };
