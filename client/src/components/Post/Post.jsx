import { connect } from 'react-redux';
import { useState } from 'react';
import { deletePost } from '../../store/postsReducer';
import Like from '../../UI/Reactions/Like';
import Dislike from '../../UI/Reactions/Dislike';
import MyButton from '../../UI/MyButton/MyButton';
import ModalEditPost from '../ModalEditPost/ModalEditPost';
import s from './Post.module.css';

const Post = (props) => {
  const [isEditPostMode, setIsEditPostMode] = useState(false);

  let postDate = new Date(Number(props.date)).toString();
  postDate = postDate.substring(0, postDate.length - 32);

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <h2 className={s.postTitle}>{props.title}</h2>
        <p className={s.postAuthor}>by {props.username}</p>
      </div>
      {props.imageSrc && (
        <img className={s.postPicture} src={props.imageSrc} alt="post pic" />
      )}
      <div className={s.postFooter}>
        <p className={s.postDate}>Posted on {postDate}</p>
        {props.username === props.currentUser && (
          <div className={s.authActions}>
            <MyButton onClick={() => setIsEditPostMode(true)}>Edit</MyButton>
            <MyButton onClick={() => props.deletePost(props.id)}>Delete</MyButton>
          </div>
        )}
        <div className={s.postReactions}>
          <Like likes={props.likes} />
          <Dislike dislikes={props.dislikes} />
        </div>
      </div>
      {isEditPostMode && <ModalEditPost setIsEditPostMode={setIsEditPostMode} postValue={props.title} id={props.id}/>}
    </div>
  );
};

const mapStateTotProps = state => ({
  currentUser: state.auth.username,
});

export default connect(mapStateTotProps, { deletePost })(Post);

