import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  SafeAreaView,
  Platform,
  Button,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BookList} from '../components';
import {Toast, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getBook} from '../redux/actions/book';
import {REACT_APP_API_URL} from '@env';
import {refresh} from '../redux/actions/auth';

class HomeScreen extends Component {
  state = {
    search: '',
    books: [],
    page: 1,
    isLoading: true,
    spinnerLoading: false,
    refresh: false,
  };
  onRefresh = async () => {
    await this.setState({isLoading: true, refresh: true, page: 1});
    const token = this.props.auth.data.token;
    const {page} = this.state;
    await this.props
      .dispatch(getBook(token, page))
      .then((res) => {
        this.setState({
          books: res.action.payload.data.data,
          refresh: false,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          refresh: false,
          isLoading: false,
        });
      });
  };
  getAllBook = () => {
    const token = this.props.auth.data.token;
    const {page} = this.state;
    this.props
      .dispatch(getBook(token, page))
      .then((res) => {
        console.log(res);
        this.setState({
          books: this.state.books.concat(res.action.payload.data.data),
          isLoading: false,
          spinnerLoading: false,
        });
      })
      .catch((err) => {
        this.setState({isLoading: false, spinnerLoading: false});
        Toast.show({
          text: err.message,
          position: 'bottom',
        });
      });
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
        spinnerLoading: true,
      },
      () => {
        this.getAllBook();
      },
    );
  };
  componentDidMount() {
    this.getAllBook();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getAllBook();
    }
  }
  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator />
          <Spinner />
        </View>
      );
    }
    const spinner = this.state.spinnerLoading ? <Spinner /> : false;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.searchSection}>
              <Icon name="ios-search" size={20} style={styles.inputIcon} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="grey"
                style={styles.search}
              />
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.onRefresh}
              />
            }
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.handleLoadMore();
              }
            }}
            scrollEventThrottle={400}>
            <View style={styles.margin10}>
              <Text style={styles.titleSection}>Latest Book</Text>
              <ScrollView horizontal>
                {this.state.books.map((book) => {
                  return (
                    <TouchableOpacity
                      key={book.id}
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {id: book.id})
                      }>
                      <View key={book.id} style={styles.slider}>
                        <Image
                          style={styles.bookImg}
                          source={{
                            uri: `${REACT_APP_API_URL}img/${book.image}`,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.margin10}>
              <Text style={styles.titleSection}>All Book</Text>
              {this.state.books.map((book) => {
                return (
                  <TouchableOpacity
                    key={book.id}
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {
                        id: book.id,
                      })
                    }>
                    <BookList data={book} />
                  </TouchableOpacity>
                );
              })}
              {spinner}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
});
export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    height: 80,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  inputIcon: {
    marginTop: 13,
    marginRight: 10,
    marginLeft: 5,
  },
  search: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'white',
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS === 'android' ? 17 : null,
  },
  slider: {
    paddingRight: 10,
  },
  bookImg: {
    width: 100,
    height: 160,
    borderRadius: 6,
  },
  titleSection: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  margin10: {
    margin: 10,
  },
  bookGroup: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
});
