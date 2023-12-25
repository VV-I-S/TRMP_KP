import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EAFF',
    height: 100,
  },
  container2: {
    paddingTop: 20,
    backgroundColor: '#E5D4FF',
    alignItems: 'center',
    height: 250,
  },
  container3: {
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D0A2F7',
    alignItems: 'center',
    height: 250,
  },
  userName: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  userData: {
    color: 'black',
    fontSize: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D0A2F7',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#D0A2F7',
  },
  buttonOpen: {
    backgroundColor: '#D0A2F7',
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#D0A2F7',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  row: {flexDirection: 'row', backgroundColor: 'white'},
  head: {
    height: 40,
    backgroundColor: '#E5D4FF',
    textAlign: 'center',
    color: 'black',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  cellText: {
    textAlign: 'center',
    color: 'black',
  },
  info: {
    backgroundColor: '#D0A2F7',
    paddingVertical: 10,
  },
  orderText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
  },
})
export default Styles
