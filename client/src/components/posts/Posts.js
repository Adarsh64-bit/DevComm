import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { withRouter } from 'react-router-dom';
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/spinner';

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if(posts === null || loading) {
        postContent = <Spinner />
    } else {
        postContent = <PostFeed posts={posts} />
    }

    return (
      <div className='feed'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <PostForm />
                    {postContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Posts.porpTypes = {
    getPosts: PropTypes.func.object,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(withRouter(Posts));