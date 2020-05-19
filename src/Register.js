import React from 'react';
import { register } from './service/auth';
import { connect } from 'react-redux';
import { changeAuth } from './actions';
import PropTypes from 'prop-types';

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        login: '',
        password: '',
        passwordRepeat: '',
        error: '',     
      }
    }
  
    onClick = () => {

        let isError = false;

        if (this.state.login.trim().length === 0) {
            this.setState({error: 'Введите логин'});
            isError = true;
        }
        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({error: 'Пароли не совпадают'});
            isError = true;
        }

        
        if (!isError) {

            const data = {
                login: this.state.login,
                email: 'sdf@mail.ru',
                password: this.state.password,
            }
            register(data)
            .then((res) => res.json())
            .then(data => {
              // регистрация постоянно проваливается
              // localStorage.setItem('AUTH', 'AUTH');
              console.log(data);
            })
            .catch((err) => console.log(err))
            .finally((e) => {
              const { setNewAuth } = this.props;
              setNewAuth('auth', data.login);
            });  
        }
    }
  
    onChange = (event) => {
        this.setState({error: ''});
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    
    toLogin = () => {
      window.location.assign('http://localhost:3000/login');
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
          <div>
            <span>Repeat Password</span>
            <input name="passwordRepeat" onChange={this.onChange} value={this.state.passwordRepeat}/>
          </div>
          
          <button onClick={this.onClick}>Регистрация</button>
          <button onClick={this.toLogin}>На авторизацию</button>
        </div>
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      setNewAuth: (auth, login) => {
        dispatch(changeAuth(auth, login));
      }
    }
  }
  
  Register.propTypes = {
    setNewAuth: PropTypes.func,
  };
   
  export default connect(null, mapDispatchToProps)(Register);