import { connect } from 'react-redux';
import { useState } from 'react';
import { deletePost, updatePost } from '../../store/postsReducer';
import Like from '../Reactions/Like';
import Dislike from '../Reactions/Dislike';
import MyButton from '../../UI/MyButton/MyButton';
import ModalEditPost from '../ModalEditPost/ModalEditPost';
import CommentList from '../CommentList/CommentList';
import { dateToReadable } from '../../utils/utils';
import s from './Post.module.css';

const Post = (props) => {
  const [isEditPostMode, setIsEditPostMode] = useState(false);
  const [isLiked, setIsLiked] = useState(
    props.likes.includes(props.currentUser)
  );
  const [isDisliked, setIsDisliked] = useState(
    props.dislikes.includes(props.currentUser)
  );

  const handleLike = () => {
    if (!isLiked) {
      props.likes.push(props.currentUser);
      props.updatePost(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage
      );
      setIsLiked(true);
    } else {
      const userToRemove = props.likes.indexOf(props.currentUser);
      props.likes.splice(userToRemove, 1);
      props.updatePost(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage
      );
      setIsLiked(false);
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      props.dislikes.push(props.currentUser);
      props.updatePost(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage
      );
      setIsDisliked(true);
    } else {
      const userToRemove = props.dislikes.indexOf(props.currentUser);
      props.dislikes.splice(userToRemove, 1);
      props.updatePost(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage
      );
      setIsDisliked(false);
    }
  };

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <h2 className={s.postTitle}>{props.title}</h2>
        <p className={s.postAuthor}>by {props.username}</p>
      </div>
      <img className={s.postPicture} src={props.imageSrc} alt="post pic" />
      <div className={s.postFooter}>
        <p className={s.postDate}>{dateToReadable(props.date)}</p>
        {props.username === props.currentUser && (
          <div className={s.authActions}>
            <MyButton onClick={() => setIsEditPostMode(true)}>Edit</MyButton>
            <MyButton
              onClick={() => props.deletePost(props.id, props.currentPage)}
            >
              Delete
            </MyButton>
          </div>
        )}
        <div className={s.postReactions}>
          <Like isLiked={isLiked} handleLike={handleLike} likes={props.likes} />
          <Dislike
            isDisliked={isDisliked}
            handleDislike={handleDislike}
            dislikes={props.dislikes}
          />
        </div>
      </div>
      <CommentList
        comments={props.comments}
        postId={props.id}
        username={props.currentUser}
        currentPage={props.currentPage}
      />
      {isEditPostMode && (
        <ModalEditPost
          setIsEditPostMode={setIsEditPostMode}
          id={props.id}
          title={props.title}
          likes={props.likes}
          dislikes={props.dislikes}
        />
      )}
    </div>
  );
};

const mapStateTotProps = (state) => ({
  currentUser: state.auth.username,
  currentPage: state.posts.page,
});

export default connect(mapStateTotProps, { deletePost, updatePost })(Post);

