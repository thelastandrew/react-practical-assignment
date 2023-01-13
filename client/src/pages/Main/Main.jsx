import { useState } from 'react';
import PostsContainer from '../../components/Posts/PostsContainer';
import Modal from '../../components/Modal/Modal';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Main.module.css';

const Main = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleClick = () => {
    setIsModalActive(true);
  };

  return (
    <div className={s.mainWrapper}>
      <MyButton onClick={handleClick}>Add new post</MyButton>
      <PostsContainer />
      {isModalActive && <Modal setIsModalActive={setIsModalActive} />}
    </div>
  );
};

export default Main;
