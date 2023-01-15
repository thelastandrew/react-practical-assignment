import { useState } from 'react';
import { connect } from 'react-redux';
import Like from '../../components/Reactions/Like';
import Dislike from '../../components/Reactions/Dislike';
import MyButton from '../../UI/MyButton/MyButton';
import { dateToReadable } from '../../utils/utils';
import { updateComment, deleteComment } from '../../store/postsReducer';
import s from './Comment.module.css';

const Comment = (props) => {
  const [isEditCommentMode, setIsEditCommentMode] = useState(false);
  const [isLiked, setIsLiked] = useState(
    props.likes.includes(props.currentUser)
  );
  const [isDisliked, setIsDisliked] = useState(
    props.dislikes.includes(props.currentUser)
  );
  const [commentText, setCommentText] = useState(props.text);
  const [isError, setIsError] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      props.likes.push(props.currentUser);
      props.updateComment(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage,
        props.isFiltered,
        props.keyword
      );
      setIsLiked(true);
    } else {
      const userToRemove = props.likes.indexOf(props.currentUser);
      props.likes.splice(userToRemove, 1);
      props.updateComment(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage,
        props.isFiltered,
        props.keyword
      );
      setIsLiked(false);
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      props.dislikes.push(props.currentUser);
      props.updateComment(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage,
        props.isFiltered,
        props.keyword
      );
      setIsDisliked(true);
    } else {
      const userToRemove = props.dislikes.indexOf(props.currentUser);
      props.dislikes.splice(userToRemove, 1);
      props.updateComment(
        props.id,
        props.title,
        props.likes,
        props.dislikes,
        props.currentPage,
        props.isFiltered,
        props.keyword
      );
      setIsDisliked(false);
    }
  };

  const handleSave = () => {
    if (!!commentText) {
      setIsError(false);
      setIsEditCommentMode(false);
      props.updateComment(
        props.id,
        commentText,
        props.likes,
        props.dislikes,
        props.currentPage,
        props.isFiltered,
        props.keyword
      );
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={s.comment}>
      {isEditCommentMode ? (
        <div>
          <textarea
            className={s.editInput}
            autoFocus={true}
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          {isError && <p className={s.error}>Comment cannot be empty</p>}
        </div>
      ) : (
        <p className={s.commentText}>
          <span className={s.username}>{props.username}</span> {props.text}
        </p>
      )}
      <div>
        <div className={s.commentFooter}>
          <p className={s.commentDate}>{dateToReadable(props.date)}</p>
          {props.username === props.currentUser && (
            <div className={s.authActions}>
              {isEditCommentMode ? (
                <MyButton onClick={handleSave}>Save</MyButton>
              ) : (
                <MyButton onClick={() => setIsEditCommentMode(true)}>
                  Edit
                </MyButton>
              )}
              <MyButton
                onClick={() =>
                  props.deleteComment(
                    props.id,
                    props.currentPage,
                    props.isFiltered,
                    props.keyword
                  )
                }
              >
                Delete
              </MyButton>
            </div>
          )}
          <div className={s.commentReactions}>
            <Like
              isLiked={isLiked}
              handleLike={handleLike}
              likes={props.likes}
            />
            <Dislike
              isDisliked={isDisliked}
              handleDislike={handleDislike}
              dislikes={props.dislikes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.username,
  currentPage: state.posts.page,
  isFiltered: state.posts.isFiltered,
  keyword: state.posts.keyword,
});

export default connect(mapStateToProps, { updateComment, deleteComment })(
  Comment
);

