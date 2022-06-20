import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { withRouter } from 'react-router-dom';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default withRouter(PostFeed);
