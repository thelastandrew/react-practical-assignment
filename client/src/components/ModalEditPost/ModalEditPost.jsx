import { connect } from 'react-redux';
import { useState } from 'react';
import { updatePost } from '../../store/postsReducer';
import MyButton from '../../UI/MyButton/MyButton';
import s from './ModalEditPost.module.css';

const ModelEditPost = (props) => {
  const [postTitle, setPostTitle] = useState(props.postValue);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handleUpdate = () => {
    if (!postTitle) {
      setIsError(true);
    } else {
      props.updatePost(props.id, postTitle);
      props.setIsEditPostMode(false);
    }
  };
  const handleCancel = () => {
    setIsError(false);
    setPostTitle('');
    props.setIsEditPostMode(false);
  };

  return (
    <div onClick={handleCancel} className={s.modal}>
      <form
        className={s.addPostForm}
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={s.formTitle}>Edit post</p>
        <input
          className={s.postTitle}
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={handleChange}
          autoFocus={true}
          required={true}
        />
        {isError && <p className={s.error}>Title cannot be empty!</p>}
        <MyButton onClick={handleUpdate}>Save</MyButton>
        <MyButton onClick={handleCancel}>Cancel</MyButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { updatePost })(ModelEditPost);

