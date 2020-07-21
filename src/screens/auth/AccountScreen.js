import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';

class AccountScreen extends Component {
  handleLogout = async () => {
    await this.props.dispatch(logout());
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageToCenter}>
            <View style={styles.profileImage}>
              <Image
                source={require('../../images/user.png')}
                style={styles.image}
                resizeMode="center"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.name]}>
                {this.props.auth.data.username}
              </Text>
              <Text style={[styles.text, styles.role]}>
                {this.props.auth.data.role}
              </Text>
              <Button title="logout" onPress={this.handleLogout} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageToCenter: {
    alignSelf: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#52575d',
    fontFamily: 'QuickSand-Bold',
  },
  name: {
    fontWeight: '200',
    fontSize: 26,
  },
  role: {
    color: '#AEB5BC',
    fontSize: 14,
  },
});
