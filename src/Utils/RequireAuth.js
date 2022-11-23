import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
export default function RequireAuth({ children }) {
  let location = useLocation();
  let jwt = localStorage.getItem("jwt");
  // console.log('jwt',jwt)
 
  if (!jwt) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
RequireAuth.defaultProps = {
  children: null,
};
RequireAuth.propTypes = {
  children: PropTypes.node,
};