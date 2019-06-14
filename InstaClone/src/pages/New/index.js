import React, { Component } from 'react';
import api from '~/services/api';
import ImagePicker from 'react-native-image-picker';

import {
  Container,
  SelectButton,
  SelectImageText,
  Preview,
  TextInput,
  ShareButton,
  ShareButtonText,
} from './styles';

import { Text } from 'react-native';

class New extends Component {
  static navigationOptions = {
    headerTitle: <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 80 }}>New post</Text>,
  };

  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    preview: null,
    image: null,
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select a picture',
      },
      upload => {
        if (!upload.error && !upload.didCancel) {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime;
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          this.setState({ preview, image });
        }
      },
    );
  };

  handleSubmit = async () => {
    const { image, author, place, description, hashtags } = this.state;

    const { navigation } = this.props;
    const data = new FormData();

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('/posts', data);

    navigation.navigate('Feed');
  };

  render() {
    const { author, place, description, hashtags, preview } = this.state;

    return (
      <Container>
        <SelectButton onPress={this.handleSelectImage}>
          <SelectImageText>Select image</SelectImageText>
        </SelectButton>

        {preview && <Preview source={preview} />}

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Author"
          placeholderTextColor="#999"
          value={author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Place"
          placeholderTextColor="#999"
          value={place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="HashTags"
          placeholderTextColor="#999"
          value={hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <ShareButton onPress={this.handleSubmit}>
          <ShareButtonText>Share</ShareButtonText>
        </ShareButton>
      </Container>
    );
  }
}

export default New;
