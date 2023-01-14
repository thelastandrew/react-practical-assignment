import { connect } from 'react-redux';
import { useState, useRef } from 'react';
import { createPost, uploadPostPicture } from '../../store/postsReducer';
import MyButton from '../../UI/MyButton/MyButton';
import s from './ModalCreatePost.module.css';

const ModalCreatePost = (props) => {
  const [postTitle, setPostTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const fileInput = useRef();

  const handleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handleCreate = () => {
    if (!postTitle || !fileInput.current.files.length) {
      setIsError(true);
    } else {
      let formData = new FormData();
      formData.append('picture', fileInput.current.files[0], "[PROXY]");
      props.createPost(postTitle, props.username, formData, props.currentPage);
      props.setIsCreatePostMode(false);
    }
  };
  const handleCancel = () => {
    setIsError(false);
    setPostTitle('');
    props.setIsCreatePostMode(false);
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
          autoFocus={true}
          required={true}
        />
        <input type="file" ref={fileInput} />
        {isError && <p className={s.error}>Title and (or) image cannot be empty!</p>}
        <MyButton onClick={handleCreate}>Add post</MyButton>
        <MyButton onClick={handleCancel}>Cancel</MyButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
  currentPage: state.posts.page
});

export default connect(mapStateToProps, { createPost, uploadPostPicture })(ModalCreatePost);

