import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import s from './PostList.module.css';

const PostList = (props) => {
  return (
    <div className={s.postListGrid}>
        {props.posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            date={post.date}
            title={post.title}
            username={post.username}
            imageSrc={post.imageSrc}
            imgSrc={post.imgSrc}
            likes={post.likes}
            dislikes={post.dislikes}
          />
        ))}
        {props.isFetching && <Loader />}
    </div>
  );
};

export default PostList;

