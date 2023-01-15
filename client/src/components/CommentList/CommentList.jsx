import { connect } from 'react-redux';
import { useState } from 'react';
import { createComment } from '../../store/postsReducer';
import Comment from '../Comment/Comment';
import MyButton from '../../UI/MyButton/MyButton';
import s from './CommentList.module.css';

const CommentList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAddComment = () => {
    if (!!text) {
      setIsError(false);
      props.createComment(text, props.postId, props.username, props.currentPage);
      setText('');
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={s.commentBlock}>
      <button className={s.expandBtn} onClick={handleClick}>
        {isOpen ? 'Hide comments' : 'Show comments'}
      </button>
      {isOpen && (
        <div className={s.commentList}>
          <div className={s.addCommentControls}>
            <input type="text" placeholder='Add your comment...' value={text} onChange={(e) => {setText(e.target.value)}} required={true}/>
            <MyButton onClick={handleAddComment}>+</MyButton>
          </div>
            {isError && <p className={s.error}>Comment cannot be empty</p>}

          {props.comments.map((c) => {
            return <Comment
              key={c.id}
              id={c.id}
              text={c.text}
              postId={c.postId}
              username={c.username}
              likes={c.likes}
              dislikes={c.dislikes}
              date={c.date}
            />;
          })}
        </div>
      )}
    </div>
  );
};

export default connect(null, { createComment })(CommentList);
