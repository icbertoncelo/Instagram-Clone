import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../../services/api';

import './styles.sass';

import More from '../../assets/more.svg';
import Comment from '../../assets/comment.svg';
import Like from '../../assets/like.svg';
import Send from '../../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('/posts');

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://localhost:5000');

    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', (likedPost) => {
      this.setState({
        feed: this.state.feed.map(post => (post._id === likedPost._id ? likedPost : post)),
      });
    });
  };

  handleLike = (id) => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;

    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={More} alt="More" />
            </header>
            <img src={`http://localhost:5000/files/${post.image}`} alt="Post" />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={Like} alt="Like" />
                </button>
                <img src={Comment} alt="Comment" />
                <img src={Send} alt="Send" />
              </div>

              <strong>{post.likes} likes</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
