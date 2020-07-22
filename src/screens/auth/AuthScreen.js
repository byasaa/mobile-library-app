import React, {Component} from 'react';
import {View, Text, BackHandler, Alert, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Button, Toast} from 'native-base';
import styles from '../../styles/auth';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';

class AuthScreen extends Component {
  state = {
    username: '',
    password: '',
    showToast: false,
  };
  loginUser = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props
      .login(data)
      .then((res) => {
        console.log(res);
        Toast.show({
          text: 'Success',
          position: 'bottom',
        });
        this.props.navigation.navigate('Main');
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          text: 'Username or Password is Invalid',
          position: 'bottom',
        });
      });
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <Text style={styles.textContainer}>Welcome Back</Text>
          <View style={styles.formArea}>
            <Text style={[styles.textContainer, styles.signIn]}>Login</Text>

            <Form style={styles.mainForm}>
              <Item regular style={styles.formItems}>
                <Input
                  type="text"
                  placeholder="Username"
                  style={styles.Input}
                  value={this.state.username}
                  onChangeText={(val) => this.setState({username: val})}
                />
              </Item>
              <Item regular style={styles.formItems}>
                <Input
                  type="password"
                  placeholder="Password"
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={(val) => this.setState({password: val})}
                  style={styles.Input}
                />
              </Item>
              <View style={styles.btn}>
                <Button block style={styles.mainBtn} onPress={this.loginUser}>
                  <Text style={styles.btnText}>Login</Text>
                </Button>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text>Don't Have an Account? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={{fontStyle: 'italic'}}>Register</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {login};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
