import s from './MyButton.module.css';

const MyButton = (props) => {
  return (
    <button
      className={s.MyButton}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default MyButton;