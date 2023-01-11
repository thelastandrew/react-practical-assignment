import { Link } from 'react-router-dom';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Nav.module.css';

const Nav = () => {
  const handleClick = () => {
    console.log('logout in progress...');
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
      <MyButton onClick={handleClick}>LogOut</MyButton>
    </nav>
  );
};

export default Nav;

