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
} from 'react-native';
import {} from '../components';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
// import {REACT_APP_API_URL} from 'react-native-dotenv';
import {REACT_APP_API_URL} from '@env';

class HomeScreen extends Component {
  state = {
    search: '',
  };
  componentDidMount() {
    console.log(REACT_APP_API_URL);
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImJ5YXNhYSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA2LTExVDA3OjI2OjQ1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNi0xMVQwNzoyNjo0NS4wMDBaIn0sImlhdCI6MTU5NDk1NDU0MCwiZXhwIjoxNTk0OTU4MTQwfQ.ICmcKnub8eqmM_I8WykYRbhgmUJ4ZDhlrDEpuTq36mg';
    axios({
      method: 'GET',
      url: REACT_APP_API_URL + 'books/',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
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
          <ScrollView>
            <View style={styles.margin10}>
              <Text style={styles.titleSection}>Latest Book</Text>
              <ScrollView horizontal>
                <View
                  style={styles.slider}
                  onTouchStart={() => this.props.navigation.navigate('Detail')}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
                <View style={styles.slider}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
                <View style={styles.slider}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
                <View style={styles.slider}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
                <View style={styles.slider}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
                <View style={styles.slider}>
                  <Image
                    style={styles.bookImg}
                    source={require('../images/dummy.jpg')}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.margin10}>
              <Text style={styles.titleSection}>All Book</Text>
              <View style={styles.bookGroup}>
                <Image
                  style={styles.bookImg}
                  source={require('../images/dummy.jpg')}
                />
                <View style={{paddingLeft: 15}}>
                  <Text style={styles.titleSection}>Title</Text>
                  <Text>Penulis</Text>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate, illum.
                  </Text>
                </View>
              </View>
              <View style={styles.bookGroup}>
                <Image
                  style={styles.bookImg}
                  source={require('../images/dummy.jpg')}
                />
                <View style={{paddingLeft: 15}}>
                  <Text style={styles.titleSection}>Title</Text>
                  <Text>Penulis</Text>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate, illum.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

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
