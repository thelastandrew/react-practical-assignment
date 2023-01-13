import loader from './Loader.gif';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <img className={s.loader} src={loader} alt='loader-gif'/>
  );
};

export default Loader;