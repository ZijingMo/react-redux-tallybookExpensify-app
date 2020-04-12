import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


// Stateless component
export const PublicRoute = ({
  hasAuthenticated,
  component: Component,
  ...rest // Destruct other props without showing them up (It is path in this case)
}) => (
  <Route {...rest} component={(props) => (
    hasAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

// Getting the id from database 'firebase'
const mapStateToProps = (state) => ({
  hasAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);



