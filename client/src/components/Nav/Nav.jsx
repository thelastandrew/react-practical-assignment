import { connect } from 'react-redux';
import { logout } from '../../store/authReducer';
import MyButton from '../../UI/MyButton/MyButton';
import logo from './logo.jpg';
import s from './Nav.module.css';

const Nav = (props) => {
  const handleClick = () => {
    localStorage.removeItem('username');
    props.logout();
  };

  return (
    <nav className={s.nav}>
      <img className={s.logo} src={logo} alt='logo' />
      <p className={s.username}>{props.username}</p>
      <MyButton onClick={handleClick}>LogOut</MyButton>
    </nav>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { logout })(Nav);

