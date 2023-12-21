import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, allowedRoles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user && allowedRoles.includes(user.role) ? (
          <Component {...props} />
        ) : ""
      }
    />
  );
};

export default PrivateRoute;