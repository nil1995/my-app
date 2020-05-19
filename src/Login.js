import React from 'react';
import { login } from './service/auth';
import { connect } from 'react-redux';
import { changeAuth } from './actions';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        login: '',
        password: '',
        error: '',
      }
    }
  
    onClick = () => {

      let isError = false;

      if (this.state.login.trim().length === 0) {
          this.setState({error: 'Введите логин'});
          isError = true;
      }
      if (this.state.password.length === 0) {
          this.setState({error: 'Введите пароль'});
          isError = true;
      }

      
      if (!isError) {

            const data = {
                login: this.state.login,
                password: this.state.password,
            }
            // подглючаюсь к api одного сервиса. Если все норм то иду дальше
            login(data)
            .then((res) => res.json())
            .then(data => {
              // постоянно проваливается
              // localStorage.setItem('AUTH', 'AUTH');
              console.log(data);
            })
            .catch((err) => console.log(err))
            .finally((e) => {
              const { setNewAuth } = this.props;
              setNewAuth('auth', data.login);
                // localStorage.setItem('AUTH', 'AUTH');
                // localStorage.setItem('LOGIN', this.state.login);
                // window.location.assign('http://localhost:3000/dashboard/');
            });
        }
    }
  
    onChange = (event) => {
        this.setState({error: ''});
        this.setState({
        [event.target.name]: event.target.value,
        })
        console.log(this.state);
    }

    toRegistration = () => {
      window.location.assign('http://localhost:3000/register');
    }
  
  
    render() {
      const {error} = this.state;
      return (
        <div>
          { (error !== '') && <div>{ error }</div>}
          <div>
            <span>Login</span>
            <input name="login" onChange={this.onChange} value={this.state.login}/>
          </div>
          <div>
            <span>Password</span>
            <input name="password" onChange={this.onChange} value={this.state.password}/>
          </div>
          
          <button onClick={this.onClick}>Войти</button>
          <button onClick={this.toRegistration}>Регистрация</button>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      auth : state.auth,   
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setNewAuth: (auth, login) => {
        dispatch(changeAuth(auth, login));
      }
    }
  }
  
  Login.propTypes = {
    auth: PropTypes.string,
    setNewAuth: PropTypes.func.isRequired,
  };
   
  export default connect(mapStateToProps, mapDispatchToProps)(Login);