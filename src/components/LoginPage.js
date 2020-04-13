import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';


export const LoginPage = ({ startLogin }) => (
  <div className="box-layout"> 
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p className="box-layout__message">"Money is a terrible master but an excellent servant." – P.T. Barnum.</p>
      <button onClick={startLogin} className="button"> Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  // Return an object: 'startLogin' prop will dispatch 'startLogin' action
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
