import { connect } from 'react-redux';
import { updatePost } from '../../store/postsReducer';
import { useState } from 'react';
import s from './Reactions.module.css';

const Like = ({ id, title, likes, dislikes, currentUser, updatePost }) => {
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser));
  const likesCount = likes.length;
  const color = isLiked ? 'red' : 'black';

  const handleLike = () => {
    if (!isLiked) {
      likes.push(currentUser);
      updatePost(id, title, likes, dislikes);
      setIsLiked(true);
    } else {
      const newLikes = likes.filter((l) => l !== currentUser);
      updatePost(id, title, newLikes, dislikes);
      setIsLiked(false);
    }
  };

  const likeList = likes.join('\n');

  return (
    <div className={s.reaction} title={likeList}>
      {!!likesCount && <p className={s.reactionCounter}>{likesCount}</p>}
      <button onClick={handleLike} className={s.reactionBtn}>
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m7 3c-2.76142 0-5 2.21619-5 4.95 0 2.207.87466 7.4447 9.4875 12.7403.3119.1918.7131.1918 1.025 0 8.6128-5.2956 9.4875-10.5333 9.4875-12.7403 0-2.73381-2.2386-4.95-5-4.95s-5 3-5 3-2.23858-3-5-3z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
};

const mapStateTotProps = (state) => ({
  currentUser: state.auth.username,
});

export default connect(mapStateTotProps, { updatePost })(Like);

