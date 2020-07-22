import React, {Component} from 'react';
import {
  Container,
  Form,
  Input,
  Item,
  Textarea,
  Button,
  Picker,
  Thumbnail,
  Toast,
} from 'native-base';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {postAddBook} from '../redux/actions/book';
import {getGenre} from '../redux/actions/genre';
import {getAuthor} from '../redux/actions/author';
class FormAddScreen extends Component {
  state = {
    genres: [],
    authors: [],
    title: '',
    description: '',
    book_status: 'Available',
    author: '',
    genre: '',
    image: null,
    selected: undefined,
  };
  handleBrowseImage = () => {
    const options = {
      noData: true,
      title: 'Select Image',
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  handlePostAddBook = () => {
    let formdata = new FormData();
    const token = this.props.auth.data.token;
    formdata.append('title', this.state.title);
    formdata.append('description', this.state.description);
    formdata.append('author_id', this.state.author);
    formdata.append('genre_id', this.state.genre);
    formdata.append('book_status', this.state.book_status);
    formdata.append('image', {
      name: this.state.image.fileName,
      uri: this.state.image.uri,
      type: this.state.image.type,
    });
    this.props
      .dispatch(postAddBook(formdata, token))
      .then(async (res) => {
        console.log(res);
        await Toast.show({
          text: 'Success',
          type: 'success',
          position: 'bottom',
        });
        this.props.navigation.push('Main');
      })
      .catch((err) => {
        console.warn(JSON.stringify(err));
        Toast.show({
          text: err.message,
          type: 'danger',
          position: 'bottom',
        });
      });
  };
  componentDidMount = async () => {
    const token = this.props.auth.data.token;
    await this.props.dispatch(getGenre(token));
    await this.props.dispatch(getAuthor(token));
    this.setState({
      authors: this.props.author.data,
      genres: this.props.genre.data,
    });
  };
  render() {
    console.log(this.state);
    return (
      <Container>
        <ScrollView>
          <Form style={{paddingLeft: 20, paddingRight: 20, marginTop: 30}}>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => this.handleBrowseImage()}>
              <View style={styles.bookImage}>
                {this.state.image ? (
                  <Image
                    source={{
                      uri: this.state.image.uri,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.browseImage}>
                    <Text style={{color: 'blue', alignSelf: 'center'}}>
                      Browse Image
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <Item regular style={{marginTop: 20}}>
              <Input
                placeholder="Title Book"
                onChangeText={(val) => this.setState({title: val})}
              />
            </Item>
            <Item regular style={{marginTop: 20}}>
              <Textarea
                placeholder="Description"
                onChangeText={(val) => this.setState({description: val})}
              />
            </Item>
            <Item regular style={{marginTop: 20}}>
              <Picker
                selectedValue={this.state.author}
                placeholder="Select Author"
                onValueChange={(selected) => {
                  this.setState({
                    author: selected,
                  });
                }}
                mode="dropdown"
                style={{paddingLeft: 20}}>
                {this.state.authors.map((author) => (
                  <Picker.Item
                    key={author.id}
                    label={author.name}
                    value={author.id}
                  />
                ))}
              </Picker>
            </Item>
            <Item regular style={{marginTop: 20}}>
              <Picker
                selectedValue={this.state.genre}
                placeholder="Select Genre"
                onValueChange={(selected) => {
                  this.setState({
                    genre: selected,
                  });
                }}
                mode="dropdown"
                style={{paddingLeft: 20}}>
                {this.state.genres.map((genre) => (
                  <Picker.Item
                    key={genre.id}
                    label={genre.name}
                    value={genre.id}
                  />
                ))}
              </Picker>
            </Item>

            <Item regular style={{marginTop: 20, marginBottom: 40}}>
              <Button
                onPress={() => this.handlePostAddBook()}
                block
                style={{backgroundColor: 'orange', width: '100%'}}>
                <Text style={{color: '#fff', fontSize: 20}}>ADD BOOK</Text>
              </Button>
            </Item>
          </Form>
        </ScrollView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  genre: state.genre,
  author: state.author,
});
export default connect(mapStateToProps)(FormAddScreen);

const styles = StyleSheet.create({
  bookImage: {
    width: 150,
    height: 230,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  browseImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    borderWidth: 1,
  },
});
