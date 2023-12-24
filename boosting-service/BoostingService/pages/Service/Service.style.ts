import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EAFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  container2: {
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 100,
    elevation: 3,
    marginVertical: 170,
    marginHorizontal: 30,
    flex: 1,
    backgroundColor: '#E5D4FF',
    height: 100,
  },
  formLabel: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  formLink: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  inputStyle: {
    marginTop: 20,
    marginHorizontal: 5,
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  inputStyle2: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 5,
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#D0A2F7',
    marginTop: 30,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
export default Styles
