import { useState } from 'react';
import PostListContainer from '../../components/PostList/PostListContainer';
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
      <PostListContainer />
      {isModalActive && <Modal setIsModalActive={setIsModalActive} />}
    </div>
  );
};

export default Main;
