import { connect } from 'react-redux';
import PostListAPIContainer from './PostListAPIContainer';
import { getPosts } from '../../store/postsReducer';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  totalPosts: state.posts.totalPosts,
  page: state.posts.page,
  totalPages: state.posts.totalPages,
  isFetching: state.posts.isFetching,
});

export default connect(mapStateToProps, { getPosts })(PostListAPIContainer);
