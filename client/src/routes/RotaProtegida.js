import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

/*
const navigate = useNavigate()

const RotaProtegida = ({ component: Component, ...rest }) => (

  function hasJWT() {
    let flag = false;

    localStorage.getItem("token") ? flag=true : flag=false
   
    return flag
  },

  <Route
    {...rest}
    render={(props) =>
      hasJWT() ? (
        <Component {...props} />
      ) : (
        <Navigate to="/" />
      )
    }
  />
);

export default RotaProtegida;
*/