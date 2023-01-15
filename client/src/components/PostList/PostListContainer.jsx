import { connect } from 'react-redux';
import PostListAPIContainer from './PostListAPIContainer';
import { getInitPosts } from '../../store/postsReducer';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  page: state.posts.page,
  totalPages: state.posts.totalPages,
  isFetching: state.posts.isFetching,
});

export default connect(mapStateToProps, { getInitPosts })(PostListAPIContainer);
