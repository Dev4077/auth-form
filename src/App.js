import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Register from './Components/Register';
import Login from './Components/Login';
import { AuthRoute, NonAuthRoute } from './ProtectedRoute/RoutesProtect';




const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route element={<AuthRoute />}>
          <Route path='/' element={<Dashboard/>}/>

        </Route>
        <Route element={<NonAuthRoute/>}>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
