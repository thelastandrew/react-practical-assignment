import s from './Reactions.module.css';

const Like = (props) => {

  const likesCount = props.likes.length;
  const color = props.isLiked ? 'red' : 'black';
  const likeList = props.likes.join('\n');

  return (
    <div className={s.reaction} title={likeList}>
      {!!likesCount && <p className={s.reactionCounter}>{likesCount}</p>}
      <button onClick={props.handleLike} className={s.reactionBtn}>
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

export default Like;

