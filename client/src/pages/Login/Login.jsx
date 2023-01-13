import { connect } from 'react-redux';
import { useState } from 'react';
import { login } from '../../store/authReducer';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Login.module.css';

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleClick = () => {
    if (!userName) {
      setError(true);
    } else {
      setError(false);
      setUserName('');
      props.login(userName);
    }
  };

  return (
    <div className={s.loginWrapper}>
      <h1>Login</h1>
      <form className={s.loginForm} onSubmit={(e) => e.preventDefault()}>
        <input
          className={s.loginInput}
          type="text"
          placeholder="Username"
          value={userName}
          onChange={handleChange}
          required={true}
        />
        {error && <p className={s.error}>Username can not be empty!</p>}
        <MyButton onClick={handleClick}>Sign in</MyButton>
      </form>
    </div>
  );
};

export default connect(null, { login })(Login);

