import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  top: {
    position: 'relative',
    backgroundColor: '#5257F2',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  textContainer: {
    color: '#fcfdff',
    fontFamily: 'Quicksand-Bold',
    fontSize: 24,
    marginBottom: 30,
    position: 'relative',
    top: '20%',
    alignSelf: 'center',
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    top: '20%',
    paddingBottom: 40,
    borderRadius: 10,
  },
  signIn: {
    top: 0,
    color: '#2d3057',
    margin: 15,
  },
  formItems: {
    marginTop: 15,
    borderBottomColor: '#2d3057',
  },
  Input: {
    fontSize: 12,
  },
  btn: {
    padding: 30.8,
    borderRadius: 5,
  },
  mainBtn: {
    backgroundColor: '#1ddcaf',
  },
  btnText: {
    color: '#2d3057',
    fontSize: 12,
  },
});

export default styles;
