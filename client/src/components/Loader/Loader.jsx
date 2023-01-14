import loader from './Loader.gif';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <img className={s.loaderContent} src={loader} alt='loader-gif'/>
    </div>
  );
};

export default Loader;