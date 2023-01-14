import { connect } from 'react-redux';
import { getPosts, searchPosts } from '../../store/postsReducer';
import s from './FilterInput.module.css';

const FilterInput = (props) => {
const debounce = (fn, delay) => (...args) => {
  setTimeout(() => { fn(...args) }, delay);
};

const filter = (e) => {
  const keyword = e.target.value;
  if (keyword) {
    props.searchPosts(keyword);
  } else {
    props.getPosts(props.page);
  }
};

  return (
    <div className={s.searchBar}>
      <input
        placeholder='Search...'
        onInput={debounce(filter, 500)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  page: state.posts.page
});

export default connect(mapStateToProps, { getPosts, searchPosts })(FilterInput);