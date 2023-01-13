import { Component } from 'react';
import PostList from './PostList';

class PostListAPIContainer extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.page);
  }

  render() {
    return (
      <PostList
        posts={this.props.posts}
        totalPosts={this.props.totalPosts}
        page={this.props.page}
        totalPages={this.props.totalPages}
        isFetching={this.props.isFetching}
      />
    );
  }
}

export default PostListAPIContainer;

