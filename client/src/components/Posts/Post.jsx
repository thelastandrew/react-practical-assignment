import Like from '../../UI/Reactions/Like';
import Dislike from '../../UI/Reactions/Dislike';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <>
      {props.isFetching ? (
        <p>Loading...</p>
      ) : (
        props.posts.map((post) => {
          let postDate = new Date(Number(post.date)).toString();
          postDate = postDate.substring(0, postDate.length - 32);
          return (
            <div className={s.post} key={post.id}>
              <div className={s.postHeader}>
                <h2 className={s.postTitle}>{post.title}</h2>
                <p className={s.postAuthor}>by {post.username}</p>
              </div>
              {post.imageSrc && (
                <img
                  className={s.postPicture}
                  src={post.imageSrc}
                  alt="post pic"
                />
              )}
              <div className={s.postFooter}>
                <p className={s.postDate}>Posted on: {postDate}</p>
                <div className={s.postReactions}>
                  <Like likes={post.likes} />
                  <Dislike dislikes={post.dislikes} />
                </div>
              </div>
            </div>
          );
        }).reverse()
      )}
    </>
  );
};

export default Post;

