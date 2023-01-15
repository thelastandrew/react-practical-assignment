import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import s from './PostList.module.css';

const PostList = (props) => {
  return (
    <div className={`${props.posts.length ? s.postListGrid : ''} ${props.isFetching && s.blocked}`}>
        {props.posts.length ? props.posts.map((post) => (
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
            comments={post.comments}
          />
        )) : <p className={s.nothing}>Nothing to show</p>}
        {props.isFetching && <Loader />}
    </div>
  );
};

export default PostList;

