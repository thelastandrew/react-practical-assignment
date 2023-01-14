import { useState } from 'react';
import PostListContainer from '../../components/PostList/PostListContainer';
import ModalCreatePost from '../../components/ModalCreatePost/ModalCreatePost';
import Pagination from '../../components/Pagination/Pagination';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Main.module.css';

const Main = () => {
  const [isCreatePostMode, setIsCreatePostMode] = useState(false);;

  const handleClick = () => {
    setIsCreatePostMode(true);
  };

  return (
    <div className={s.mainWrapper}>
      <div className={s.postListOptions}>
        <Pagination />
        <MyButton onClick={handleClick}>Add new post</MyButton>
      </div>
      <PostListContainer />
      {isCreatePostMode && <ModalCreatePost setIsCreatePostMode={setIsCreatePostMode} />}
    </div>
  );
};

export default Main;
