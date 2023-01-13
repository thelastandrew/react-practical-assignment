import Loader from '../Loader/Loader';
import Post from '../Post/Post';

const PostList = (props) => {
  return (
    <>
      {props.isFetching ? (
        <Loader />
      ) : (
        props.posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            date={post.date}
            title={post.title}
            username={post.username}
            imgSrc={post.imgSrc}
            likes={post.likes}
            dislikes={post.dislikes}
          />
        ))
      )}
    </>
  );
};

export default PostList;

