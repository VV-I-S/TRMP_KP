import React, {useState} from 'react'
import {Text, View, Button, Modal, Pressable, ScrollView, Alert} from 'react-native'
import axios from 'axios'
import { Avatar } from "react-native-paper";
import Styles from './BoosterProfile.style'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const BoosterProfile = () => {
    const state = {
        tableHead: ["ID", "Дата оформления", "Стоимость"],
        widthArr: [100, 150, 150],
    };
    const generateTableData = (rowCount: number, columnCount: number) => {
        const data = [];

        for (let i = 1; i <= rowCount; i++) {
            const row = [];
            for (let j = 1; j <= columnCount; j++) {
                row.push(`R${i} C${j}`);
            }
            data.push(row);
        }

        return data;
    };
    const data = generateTableData(5, 3);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={Styles.container}>
            <View style={Styles.container2}>
                <Avatar.Icon size={100} icon="folder" />

            </View>
            <View>
                <Text style={Styles.userName}>Текущий заказ</Text>
                <Text>Начальный ММР:</Text>
                <Text>Конечный ММР: </Text>
                <Text>Количество игр SD: </Text>
                <Text>Стоимость:  руб.</Text>
                <Text>Статус</Text>
                <Button title="В зависимости от статуса"></Button>
            </View>
            <View>
                <Text style={Styles.userName}>Список заказов</Text>
                <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                    <Row
                        data={state.tableHead}
                        widthArr={state.widthArr}
                    />
                </Table>
                <ScrollView>
                    <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                        {data.map((dataRow, index) => (
                            <Row
                                key={index}
                                data={dataRow}
                                widthArr={state.widthArr}
                            />
                        ))}
                    </Table>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={Styles.centeredView}>
                        <View style={Styles.modalView}>
                            <Text style={Styles.modalText} >Начальный ММР:</Text>
                            <Text style={Styles.modalText}>Конечный ММР: </Text>
                            <Text style={Styles.modalText}>Количество игр SD: </Text>
                            <Text style={Styles.modalText}>Стоимость:  руб.</Text>
                            <Text style={Styles.modalText}>Статус</Text>
                            <Pressable
                                style={[Styles.button, Styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text  style={Styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={Styles.textStyle}>Show Modal</Text>
                </Pressable>
                <Pressable
                    style={[Styles.button, Styles.buttonOpen]}>
                    <Text style={Styles.textStyle}>В каждом заказе кнопочка "Принять в работу"</Text>
                </Pressable>
            </View>
            <View>
                <Text style={Styles.userName}>История заказов</Text>
                <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                    <Row
                        data={state.tableHead}
                        widthArr={state.widthArr}
                    />
                </Table>
                <ScrollView>
                    <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                        {data.map((dataRow, index) => (
                            <Row
                                key={index}
                                data={dataRow}
                                widthArr={state.widthArr}
                            />
                        ))}
                    </Table>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={Styles.centeredView}>
                        <View style={Styles.modalView}>
                            <Text style={Styles.modalText} >Начальный ММР:</Text>
                            <Text style={Styles.modalText}>Конечный ММР: </Text>
                            <Text style={Styles.modalText}>Количество игр SD: </Text>
                            <Text style={Styles.modalText}>Стоимость:  руб.</Text>
                            <Text style={Styles.modalText}>Статус</Text>
                            <Pressable
                                style={[Styles.button, Styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text  style={Styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={Styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default BoosterProfile