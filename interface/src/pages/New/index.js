import React, { Component } from 'react';
import api from '../../services/api';

import './styles.sass';

class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      image, author, place, description, hashtags,
    } = this.state;

    const { history } = this.props;

    const data = new FormData();

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('/posts', data);

    history.push('/');
  };

  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      author, place, description, hashtags,
    } = this.state;

    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Post author"
          onChange={this.handleChange}
          value={author}
        />
        <input
          type="text"
          name="place"
          placeholder="Post place"
          onChange={this.handleChange}
          value={place}
        />
        <input
          type="text"
          name="description"
          placeholder="Post description"
          onChange={this.handleChange}
          value={description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Post hashtags"
          onChange={this.handleChange}
          value={hashtags}
        />

        <button type="submit">Send</button>
      </form>
    );
  }
}

export default New;
