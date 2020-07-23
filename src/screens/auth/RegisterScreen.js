import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Button, Toast} from 'native-base';
import styles from '../../styles/auth';
import {connect} from 'react-redux';
import {register} from '../../redux/actions/auth';

class RegisterScreen extends Component {
  state = {
    username: '',
    password: '',
    showToast: false,
  };
  regUser = (e) => {
    console.log(this.state);
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props
      .dispatch(register(data))
      .then((res) => {
        console.log(res);
        Toast.show({
          text: 'Success',
          position: 'bottom',
        });
        this.props.navigation.navigate('Auth');
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          text: 'Something Wrong',
          position: 'bottom',
        });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <Text style={styles.textContainer}>Please Register</Text>
          <View style={styles.formArea}>
            <Text style={[styles.textContainer, styles.signIn]}>Register</Text>

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
                <Button block style={styles.mainBtn} onPress={this.regUser}>
                  <Text style={styles.btnText}>Register</Text>
                </Button>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text>Already Have an Account? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Auth')}>
                  <Text style={{fontStyle: 'italic'}}>Login</Text>
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
  register: state.register,
});

export default connect(mapStateToProps)(RegisterScreen);
