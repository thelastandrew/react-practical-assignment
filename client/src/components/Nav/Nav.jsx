import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/authReducer';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Nav.module.css';

const Nav = (props) => {
  const handleClick = () => {
    props.logout();
  };

  return (
    <nav className={s.nav}>
      <ul className={s.navLinks}>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <p className={s.username}>{props.username}</p>
      <MyButton onClick={handleClick}>LogOut</MyButton>
    </nav>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { logout })(Nav);

