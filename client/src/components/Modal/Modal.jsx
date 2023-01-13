import { connect } from 'react-redux';
import { useState } from 'react';
import { createPost } from '../../store/postsReducer';
import MyButton from '../../UI/MyButton/MyButton';
import s from './Modal.module.css';

const Modal = (props) => {
  const [postTitle, setPostTitle] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handleCreate = () => {
    if (!postTitle) {
      setIsError(true);
    } else {
      props.createPost(postTitle, props.username);
      props.setIsModalActive(false);
    }
  };
  const handleCancel = () => {
    setIsError(false);
    setPostTitle('');
    props.setIsModalActive(false);
  };

  return (
    <div onClick={handleCancel} className={s.modal}>
      <form
        className={s.addPostForm}
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={s.formTitle}>Create new post</p>
        <input
          className={s.postTitle}
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={handleChange}
        />
        {isError && <p className={s.error}>Title cannot be empty!</p>}
        <MyButton onClick={handleCreate}>Add post</MyButton>
        <MyButton onClick={handleCancel}>Cancel</MyButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { createPost })(Modal);

