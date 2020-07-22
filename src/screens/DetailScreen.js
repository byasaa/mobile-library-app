import React, {Component} from 'react';
import {Image, View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {Container, Item, Button, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  getDetailBook,
  patchBorrowBook,
  deleteBook,
} from '../redux/actions/book';
import {REACT_APP_API_URL} from '@env';

class DetailScreen extends Component {
  state = {
    book: [],
  };
  handleConfirmDelete = () => {
    Alert.alert('Delete this Book', 'Are You Sure', [
      {
        text: 'Cancel',
        onPress: () => console.warn('NO Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.handleDeleteBook()},
    ]);
  };
  handleDeleteBook = () => {
    const token = this.props.auth.data.token;
    const id = this.props.route.params.id;
    this.props
      .dispatch(deleteBook(id, token))
      .then((res) => {
        Toast.show({
          text: 'Book Deleted',
          position: 'bottom',
          type: 'success',
        });
        this.props.navigation.push('Main');
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          text: 'Oops Something bad Happen',
          position: 'bottom',
          type: 'danger',
        });
      });
  };
  getDetailBook = () => {
    const token = this.props.auth.data.token;
    const id = this.props.route.params.id;
    this.props
      .dispatch(getDetailBook(id, token))
      .then(() => {
        this.setState({
          book: this.props.book.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleBorrowBook = async (e) => {
    e.preventDefault();
    const token = this.props.auth.data.token;
    const id = this.props.route.params.id;
    await this.props
      .dispatch(patchBorrowBook(id, token))
      .then(() => {
        this.getDetailBook();
        this.getLoanBook();
        this.props.navigation.replace('Detail', {id: id});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.getDetailBook();
  };
  render() {
    let disabledButton = this.state.book.status === 'Available' ? false : true;
    return (
      <Container style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={24} color="#52575D" />
            </Button>
            <Button transparent>
              <Icon
                name="ellipsis-horizontal-outline"
                size={24}
                color="#52575D"
              />
            </Button>
          </View>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.bookImage}>
              <Image
                source={{
                  uri: `${REACT_APP_API_URL}img/${this.state.book.image}`,
                }}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 26}]}>
              {this.state.book.title}
            </Text>
            <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
              {this.state.book.author}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
              <Text style={[styles.statusBox, {fontSize: 18}]}>
                {this.state.book.status}
              </Text>
              <Text style={[styles.text, styles.subText]}>Status</Text>
            </View>
            <View
              style={[
                styles.statusBox,
                {
                  borderColor: '#DFD8C8',
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                },
              ]}>
              <Text style={[styles.text, {fontSize: 18}]}>5.0</Text>
              <Text style={[styles.text, styles.subText]}>Rating</Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={[styles.text, {fontSize: 18}]}>
                {this.state.book.genre}
              </Text>
              <Text style={[styles.text, styles.subText]}>Genre</Text>
            </View>
          </View>
          <View style={styles.descContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 26}]}>
              Description
            </Text>
            <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
              {this.state.book.description}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          {this.props.auth.data.role !== 'admin' ? (
            <>
              <Item regular style={{marginTop: 20, flex: 4}}>
                <Button
                  disabled={disabledButton}
                  onPress={this.handleBorrowBook}
                  warning
                  block
                  style={{width: '100%'}}>
                  <Text style={{color: '#fff', fontSize: 20}}>Borrow</Text>
                </Button>
              </Item>
            </>
          ) : (
            <>
              <Item regular style={{marginTop: 20, flex: 1}}>
                <Button success block style={{width: '100%'}}>
                  <Icon name="create-outline" size={20} color="#fff" />
                </Button>
              </Item>
              <Item regular style={{marginTop: 20, flex: 4}}>
                <Button
                  disabled={disabledButton}
                  onPress={this.handleBorrowBook}
                  warning
                  block
                  style={{width: '100%'}}>
                  <Text style={{color: '#fff', fontSize: 20}}>Borrow</Text>
                </Button>
              </Item>
              <Item regular style={{marginTop: 20, flex: 1}}>
                <Button
                  block
                  danger
                  style={{width: '100%'}}
                  onPress={() => this.handleConfirmDelete()}>
                  <Icon name="trash-outline" size={20} color="#fff" />
                </Button>
              </Item>
            </>
          )}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  book: state.book,
  auth: state.auth,
});
export default connect(mapStateToProps)(DetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'QuickSand-Bold',
    color: '#52575D',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  bookImage: {
    width: 150,
    height: 230,
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 20,
  },
  statusBox: {
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
  },
  descContainer: {
    paddingLeft: 30,
    paddingRight: 20,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 20,
    marginBottom: 30,
  },
});
