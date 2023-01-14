import { connect } from 'react-redux';
import PostListAPIContainer from './PostListAPIContainer';
import { getInitPosts } from '../../store/postsReducer';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  page: state.posts.page,
  totalPages: state.posts.totalPages,
  arePostsFetching: state.posts.arePostsFetching,
});

export default connect(mapStateToProps, { getInitPosts })(PostListAPIContainer);
