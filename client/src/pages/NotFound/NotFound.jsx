import { Link } from 'react-router-dom';
import s from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={s.content}>
      <h1>404 Page not found</h1>
      <p><Link to='/'>Go home</Link></p>
    </div>
  );
};

export default NotFound;