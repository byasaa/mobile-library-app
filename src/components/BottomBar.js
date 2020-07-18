import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

class BottomBar extends Component {
  render() {
    return (
      <View style={styles.bottomNav}>
        <View
          style={styles.bottomOption}
          onTouchStart={() => this.props.navigation.navigate('Home')}>
          <View style={styles.bottomIcon}>
            <Image
              style={styles.iconImage}
              source={require('../icons/home-run.png')}
            />
          </View>
          <Text>Home</Text>
        </View>
        <View
          style={styles.bottomOption}
          onTouchStart={() => this.props.navigation.navigate('Home')}>
          <View style={styles.bottomIcon}>
            <Image
              style={styles.iconImage}
              source={require('../icons/history.png')}
            />
          </View>
          <Text>History</Text>
        </View>
        <View
          style={styles.bottomOption}
          onTouchStart={() => this.props.navigation.navigate('Auth')}>
          <View style={styles.bottomIcon}>
            <Image
              style={styles.iconImage}
              source={require('../icons/account.png')}
            />
          </View>
          <Text>Account</Text>
        </View>
      </View>
    );
  }
}

export default BottomBar;

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'white',
    height: 54,
    flexDirection: 'row',
  },
  bottomOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 28,
    height: 28,
  },
  iconImage: {
    width: 26,
    height: 26,
  },
});
