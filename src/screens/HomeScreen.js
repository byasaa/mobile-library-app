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
  BackHandler,
  Alert,
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
import {styles} from '../styles/home';

class HomeScreen extends Component {
  state = {
    search: '',
    searchStore: '',
    books: [],
    page: 1,
    isLoading: true,
    spinnerLoading: false,
    refresh: false,
  };
  onRefresh = async () => {
    await this.setState({isLoading: true, refresh: true, page: 1, search: ''});
    const token = this.props.auth.data.token;
    const {page, search} = this.state;
    await this.props
      .dispatch(getBook(token, page, search))
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
  onSearch = async () => {
    await this.setState({
      isLoading: true,
      page: 1,
      search: this.state.searchStore,
    });
    const token = this.props.auth.data.token;
    const {page, search} = this.state;
    await this.props
      .dispatch(getBook(token, page, search))
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
          books: [],
        });
      });
  };
  getAllBook = () => {
    const token = this.props.auth.data.token;
    const {page, search} = this.state;
    this.props
      .dispatch(getBook(token, page, search))
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
  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  componentDidMount() {
    this.getAllBook();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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
                onSubmitEditing={() => this.onSearch()}
                onChangeText={(val) => this.setState({searchStore: val})}
                underlineColorAndroid="transparent"
                placeholder="Search"
                defaultValue=""
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
            {/* <View style={styles.margin10}> */}
            {/* <Text style={styles.titleSection}>Latest Book</Text> */}
            {/* <ScrollView horizontal>
                {this.state.books.map((book) => {
                  return (
                    <TouchableOpacity
                      key={book.id}
                      onPress={() =>
                        this.props.navigation.push('Detail', {id: book.id})
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
              </ScrollView> */}
            {/* </View> */}
            <View style={styles.margin10}>
              {this.state.search === '' ? (
                <>
                  <Text style={styles.titleSection}>All Book</Text>
                </>
              ) : (
                <Text style={styles.titleSection}>
                  Result of '{this.state.search}'
                </Text>
              )}
              {this.state.books.map((book) => {
                return (
                  <TouchableOpacity
                    key={book.id}
                    onPress={() =>
                      this.props.navigation.push('Detail', {
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
