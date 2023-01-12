import s from './Reactions.module.css';

const Dislike = (props) => {
  const dislikesCount = props.dislikes.length;

  return (
    <div className={s.reaction}>
      {!!dislikesCount && <p className={s.reactionCounter}>{dislikesCount}</p>}
      <button className={s.reactionBtn}>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m20 3h-3-10.307c-.829 0-1.581.521-1.873 1.298l-2.757 7.351c-.042.112-.063.231-.063.351v2c0 1.103.897 2 2 2h5.612l-1.122 3.367c-.203.608-.101 1.282.274 1.802.376.52.982.831 1.624.831h1.612c.297 0 .578-.132.769-.36l4.7-5.64h2.531c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684c.103-.305.051-.64-.137-.901s-.49-.415-.811-.415h-7v-1.819l2.693-7.181h9.307v9.638zm6.469-6v-9h2l.001 9z"
            stroke="#000"
          />
        </svg>
      </button>
    </div>
  );
};

export default Dislike;

