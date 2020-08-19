import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {LoanList} from '../components';
import {Spinner} from 'native-base';
import {connect} from 'react-redux';
import {getLoanByUser} from '../redux/actions/loan';
import {styles} from '../styles/home';

class HistoryScreen extends Component {
  state = {
    isLoading: true,
    loans: [],
  };
  handleGetHistory = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;
    await this.props
      .dispatch(getLoanByUser(id, token))
      .then(() => {
        this.setState({
          loans: this.props.loan.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  componentDidMount = async () => {
    await this.handleGetHistory();
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Spinner />
        </View>
      );
    }
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.margin10}>
              <Text style={styles.titleSection}>Your History Book</Text>
              {this.state.loans.map((loan) => {
                let disabledButton = loan.status === 'borrow' ? false : true;
                return (
                  <TouchableOpacity
                    key={loan.id}
                    onPress={() =>
                      this.props.navigation.push('Detail', {
                        id: loan.book_id,
                      })
                    }>
                    <LoanList
                      data={loan}
                      disable={disabledButton}
                      {...this.props}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loan: state.loan,
});

export default connect(mapStateToProps)(HistoryScreen);
