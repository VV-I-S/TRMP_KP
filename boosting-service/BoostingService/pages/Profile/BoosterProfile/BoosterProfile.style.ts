import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1EAFF',
        height: 100,
    },
    container2: {
        backgroundColor: '#E5D4FF',
        alignItems: 'center',
        height: 200,
    },
    userName: {
        color: 'black',
        fontSize: 30,
    },
    userData: {
        color: 'black',
        fontSize: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
        padding: 10,
        elevation: 2,
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
});
export default Styles