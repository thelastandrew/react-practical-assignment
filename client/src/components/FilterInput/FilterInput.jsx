import { connect } from 'react-redux';
import { getInitPosts, searchPosts } from '../../store/postsReducer';
import { debounce } from '../../utils/utils';
import s from './FilterInput.module.css';

const FilterInput = (props) => {

const filter = (e) => {
  const keyword = e.target.value;
  if (keyword) {
    props.searchPosts(keyword);
  } else {
    props.getInitPosts(props.page);
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

export default connect(mapStateToProps, { getInitPosts, searchPosts })(FilterInput);