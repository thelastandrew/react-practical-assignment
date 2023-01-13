import { Component } from 'react';
import Post from './Post';

class PostAPIContainer extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.page);
  }

  render() {
    return (
      <Post
        posts={this.props.posts}
        totalPosts={this.props.totalPosts}
        page={this.props.page}
        totalPages={this.props.totalPages}
        isFetching={this.props.isFetching}
      />
    );
  }
}

export default PostAPIContainer;

