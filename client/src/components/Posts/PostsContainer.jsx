import { connect } from 'react-redux';
import PostAPIContainer from './PostAPIContainer';
import { getPosts } from '../../store/postsReducer';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  totalPosts: state.posts.totalPosts,
  page: state.posts.page,
  totalPages: state.posts.totalPages,
  isFetching: state.posts.isFetching,
});

const PostsContainer = connect(mapStateToProps, { getPosts })(PostAPIContainer);

export default PostsContainer;