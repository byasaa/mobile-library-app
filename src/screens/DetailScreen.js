import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import styles from '../styles/auth';

class DetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.top,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Image
            style={{width: 100, height: 160, borderRadius: 6}}
            source={require('../images/dummy.jpg')}
          />
          <Text>Title</Text>
          <Text>Penulis</Text>
        </View>
      </View>
    );
  }
}

export default DetailScreen;
