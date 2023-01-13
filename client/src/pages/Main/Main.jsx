import { useState } from 'react';
import PostListContainer from '../../components/PostList/PostListContainer';
import ModalCreatePost from '../../components/ModalCreatePost/ModalCreatePost';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Main.module.css';

const Main = () => {
  const [isCreatePostMode, setIsCreatePostMode] = useState(false);;

  const handleClick = () => {
    setIsCreatePostMode(true);
  };

  return (
    <div className={s.mainWrapper}>
      <MyButton onClick={handleClick}>Add new post</MyButton>
      <PostListContainer />
      {isCreatePostMode && <ModalCreatePost setIsCreatePostMode={setIsCreatePostMode} />}
    </div>
  );
};

export default Main;
