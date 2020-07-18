import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import {} from '../components';

class HomeScreen extends Component {
  state = {
    search: '',
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.head}>
          <View>
            <TextInput
              style={styles.search}
              value={this.state.search}
              onChange={(e) => this.setState({search: e.target.value})}
              placeholder="Cari Disini"
            />
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView horizontal>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
            <View style={styles.slider}>
              <Image source={require('../images/bookshelf.png')} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  head: {
    backgroundColor: 'green',
    paddingTop: 16,
    paddingLeft: 45,
    paddingRight: 45,
    height: 60,
  },
  content: {
    flex: 1,
    backgroundColor: 'blue',
    position: 'relative',
    top: 40,
  },
  search: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    height: 40,
    fontSize: 13,
    paddingLeft: 45,
    paddingRight: 45,
  },
  slider: {
    flex: 1,
  },
});
