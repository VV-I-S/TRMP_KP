import React, {useEffect, useState} from 'react'
import {
  Text,
  View,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native'
import axios from 'axios'
import {Avatar} from 'react-native-paper'
import Styles from './UserProfile.style'
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component'
import {observer} from 'mobx-react-lite'
import {userStore} from '../../../mobx'
import EditProfile from '../EditProfile/EditProfile'

export type OrderWaitingTypes = {
  id: number
  dateOfCreate: string
  startMMR: number
  endMMR: number
  countLP: number
  cost: number
  status: string
}

type UserProfileTypes = {
  nickname: string
  email: string
  phone: string
  orders: OrderWaitingTypes[]
}

const buttonVariants = {
  'Ожидает оплаты': 'Оплатить',
  'Ожидает подтверждения': 'Отменить',
}

const UserProfile = () => {
  const [user, setUser] = React.useState<UserProfileTypes>({
    nickname: '',
    email: '',
    orders: [],
    phone: '',
  })
  const [newOrder, setNewOrder] = React.useState<OrderWaitingTypes>()
  const [canReloadOrder, setCanReloadOrder] = React.useState(false)

  const state = {
    tableHead: ['ID', 'Дата', 'Стоимость', 'Информация'],
    widthArr: [40, 100, 100, 120],
  }

  useEffect(() => {
    //TODO: как-то странно это все работает, не сразу записывается
    axios
      .get<UserProfileTypes>('/user/getUserInfo')
      .then(({data}) => setUser(data))
    axios
      .get<OrderWaitingTypes>('/user/getNewOrderInfo')
      .then(({data}) => setNewOrder(data))
  }, [canReloadOrder])

  const [modalVisible, setModalVisible] = useState(false)
  const [modalState, setModalState] = useState<OrderWaitingTypes>({
    id: 0,
    dateOfCreate: '',
    startMMR: 0,
    endMMR: 0,
    countLP: 0,
    cost: 0,
    status: '',
  })

  const toggleModal = (index: number) => () => {
    setModalVisible((prevState) => !prevState)
    if (index === -1) {
      setModalState({
        id: 0,
        dateOfCreate: '',
        startMMR: 0,
        endMMR: 0,
        countLP: 0,
        cost: 0,
        status: '',
      })
    } else {
      setModalState(user.orders[index])
    }
  }

  const onPay = () => {
    axios
      .get('/user/getStatusInProcess')
      .then(() => setCanReloadOrder((prevState) => !prevState))
  }

  const onCancel = () => {
    axios
      .get('/user/getStatusDelete')
      .then(() => setCanReloadOrder((prevState) => !prevState))
  }

  const updateInfo = () => {
    axios
      .get<UserProfileTypes>('/user/getUserInfo')
      .then(({data}) => setUser(data))
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <Avatar.Image
          size={100}
          source={{
            uri:
              userStore.avatar !== ''
                ? userStore.avatar
                : 'https://cdn-icons-png.flaticon.com/512/25/25400.png',
          }}
        />
        <Text style={Styles.userName}>{user.nickname}</Text>
        <Text style={Styles.userData}>{user.email}</Text>
        <Text style={Styles.userData}>{user.phone}</Text>
        <EditProfile updateInfo={updateInfo} />
      </View>
      {newOrder ? (
        <View>
          <Text style={Styles.userName}>Текущий заказ</Text>
          <Text>Начальный ММР: {newOrder?.startMMR}</Text>
          <Text>Конечный ММР: {newOrder?.endMMR}</Text>
          <Text>Количество игр SD: {newOrder?.countLP}</Text>
          <Text>Стоимость: {newOrder?.cost}руб.</Text>
          <Text>Статус: {newOrder?.status}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {newOrder?.status === 'Ожидает оплаты' && (
              <Button title="Оплатить" onPress={onPay} />
            )}
            {[
              'Ожидает оплаты',
              'Ожидает подтверждения',
              'Выполняется',
            ].includes(newOrder?.status ?? '') && (
              <Button title="Отменить" onPress={onCancel} />
            )}
          </View>
        </View>
      ) : (
        <Text>Текущего заказа нет</Text>
      )}

      <View>
        <Text style={Styles.userName}>История заказов</Text>
        <ScrollView>
          <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row data={state.tableHead} widthArr={state.widthArr} />
            {user.orders.map((dataa, index) => (
              <TableWrapper key={index} style={Styles.row}>
                <Cell data={dataa.id} width={state.widthArr[0]} />
                <Cell data={dataa.dateOfCreate} width={state.widthArr[1]} />
                <Cell data={dataa.cost} width={state.widthArr[2]} />
                <Cell
                  data={
                    <Pressable onPress={toggleModal(index)}>
                      {/*Карина лучшая ❤️ */}
                      <Text>Нажмите сюда!</Text>
                    </Pressable>
                  }
                  width={state.widthArr[3]}
                />
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal(-1)}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>
                Начальный ММР: {modalState.startMMR}
              </Text>
              <Text style={Styles.modalText}>
                Конечный ММР: {modalState.endMMR}
              </Text>
              <Text style={Styles.modalText}>
                Количество игр SD: {modalState.countLP}
              </Text>
              <Text style={Styles.modalText}>
                Стоимость: {modalState.cost}руб.
              </Text>
              <Text style={Styles.modalText}>Статус: {modalState.status}</Text>
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={toggleModal(-1)}>
                <Text style={Styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
export default observer(UserProfile)
