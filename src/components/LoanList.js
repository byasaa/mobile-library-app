import React, {Component} from 'react';
import {Text, View, Image, Alert} from 'react-native';
import {Button, Toast} from 'native-base';
import styles from '../styles/book';
import {REACT_APP_API_URL} from '@env';
import {connect} from 'react-redux';
import {patchReturnBook} from '../redux/actions/loan';

class LoanList extends Component {
  handleReturnBook = (id, book_id, token) => {
    this.props
      .dispatch(patchReturnBook(id, book_id, token))
      .then(() => {
        Toast.show({
          text: 'Return Success',
          type: 'success',
          position: 'bottom',
        });
        this.props.navigation.replace('Main', {
          screen: 'History',
        });
        this.handleGetHistory();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleConfirmReturn = () => {
    Alert.alert('Return this Book', 'Are You Sure', [
      {
        text: 'Cancel',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () =>
          this.handleReturnBook(
            this.props.data.id,
            this.props.data.book_id,
            this.props.auth.data.token,
          ),
      },
    ]);
  };
  render() {
    const loan = this.props.data;
    return (
      <View style={styles.bookGroup}>
        <Image
          style={styles.bookImg}
          source={{uri: `${REACT_APP_API_URL}img/${loan.image}`}}
        />
        <View style={{paddingLeft: 15}}>
          <Text style={styles.titleSection}>{loan.title}</Text>
          <Text>Status : {loan.status}</Text>
          <Button
            style={{width: '100%', justifyContent: 'center', marginTop: 50}}
            warning
            onPress={() => this.handleConfirmReturn()}
            disabled={this.props.disable}>
            <Text style={{color: '#fff'}}>Return</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  loan: state.loan,
});
export default connect(mapStateToProps)(LoanList);
