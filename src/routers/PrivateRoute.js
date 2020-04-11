import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';


// Stateless component
export const PrivateRoute = ({
  hasAuthenticated,
  component: Component,
  ...rest // Destruct other props without showing them up (It is path in this case)
}) => (
  <Route {...rest} component={(props) => (
    hasAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

// Getting the id from database 'firebase'
const mapStateToProps = (state) => ({
  hasAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

