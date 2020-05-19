import React from 'react';
import Login from "./Login";
import Register from "./Register";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Dashboard} from "./Dashboard"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      error: '',
    }
  }

  render() {

    const { auth } = this.props;
    const login = 'asdf';

    return (
      <div>
        <h2>My App</h2>
        <Router>
          { !auth && <Switch>
            <Route path="/login">
              <Login/>
            </Route>  
            <Route path="/register">
              <Register/>
            </Route>
            <Redirect to="/login"/> 
          </Switch> }
          { !!auth && <Switch>
            <Route path="/dashboard">
              <Dashboard login={login}/>
            </Route>
            <Redirect to="/dashboard"/>
          </Switch>}      
        </Router> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth : state.user.auth,
    login : state.user.login, 
  }
}

App.propTypes = {
  auth: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired
};
 
export default connect(mapStateToProps)(App);
