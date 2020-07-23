import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: 17,
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
