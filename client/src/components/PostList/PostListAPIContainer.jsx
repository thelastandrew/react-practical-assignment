import { Component } from 'react';
import PostList from './PostList';

class PostListAPIContainer extends Component {
  componentDidMount() {
    this.props.getInitPosts(this.props.page);
  }

  render() {
    return (
      <PostList
        posts={this.props.posts}
        page={this.props.page}
        totalPages={this.props.totalPages}
        isFetching={this.props.isFetching}
      />
    );
  }
}

export default PostListAPIContainer;

