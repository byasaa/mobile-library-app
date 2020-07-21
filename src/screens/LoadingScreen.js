import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import ilustration from '../images/bookshelf.png';
import {connect} from 'react-redux';
import {refresh, logout} from '../redux/actions/auth';

class LoadingScreen extends Component {
  state = {
    logoAnimation: new Animated.Value(0),
    logoText: new Animated.Value(0),
    loadingSpinner: false,
    redirect: '',
  };
  componentDidMount() {
    const {logoAnimation, logoText} = this.state;
    Animated.parallel([
      Animated.spring(logoAnimation, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
        useNativeDriver: false,
      }).start(),

      Animated.timing(logoText, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }).start(() => {
        this.setState({
          loadingSpinner: true,
        });
      }),
    ]);
    const data = {
      token: this.props.auth.data.refreshToken,
    };
    this.props
      .dispatch(refresh(data))
      .then((res) => {
        console.log(res);
        this.props.navigation.navigate('Main');
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        this.props.dispatch(logout());
        this.props.navigation.navigate('Auth');
      });
  }
  render() {
    return (
      <View style={style.container}>
        <Animated.View
          style={{
            opacity: this.state.logoAnimation,
            top: this.state.logoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={ilustration} style={style.ilustration} />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.logoText,
          }}>
          <Text style={style.logoText}>Library App</Text>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(LoadingScreen);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    width: 300,
    color: 'red',
  },
  ilustration: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: '300',
  },
});
