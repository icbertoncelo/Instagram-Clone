import React, { Component } from 'react';
import api from '~/services/api';
import io from 'socket.io-client';

import { Image, TouchableOpacity, FlatList } from 'react-native';
import {
  Container,
  FeedItem,
  Header,
  UserInfo,
  Name,
  Place,
  Post,
  Footer,
  Actions,
  Action,
  Likes,
  Description,
  Hashtags,
} from './styles';

import Camera from '~/assets/camera.png';
import More from '~/assets/more.png';
import Like from '~/assets/like.png';
import Comment from '~/assets/comment.png';
import Send from '~/assets/send.png';

class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
        <Image source={Camera} />
      </TouchableOpacity>
    ),
  });

  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('/posts');

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://192.168.0.12:5000');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => (post._id === likedPost._id ? likedPost : post)),
      });
    });
  };

  handleLike = id => {
    api.post(`posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;

    return (
      <Container>
        <FlatList
          data={feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <FeedItem>
              <Header>
                <UserInfo>
                  <Name>{item.author}</Name>
                  <Place>{item.place}</Place>
                </UserInfo>

                <Action onPress={() => {}}>
                  <Image source={More} />
                </Action>
              </Header>

              <Post source={{ uri: `http://192.168.0.12:5000/files/${item.image}` }} />

              <Footer>
                <Actions>
                  <Action onPress={() => this.handleLike(item._id)}>
                    <Image source={Like} />
                  </Action>
                  <Action onPress={() => {}}>
                    <Image source={Comment} />
                  </Action>
                  <Action onPress={() => {}}>
                    <Image source={Send} />
                  </Action>
                </Actions>

                <Likes>{item.likes} curtidas</Likes>
                <Description>{item.description}</Description>
                <Hashtags>{item.hashtags}</Hashtags>
              </Footer>
            </FeedItem>
          )}
        />
      </Container>
    );
  }
}

export default Feed;
