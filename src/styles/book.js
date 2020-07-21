import {StyleSheet} from 'react-native';

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

export default styles;
