import React, {useState} from 'react'
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
import Styles from './BoosterProfile.style'
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell,
} from 'react-native-table-component'
import {userStore} from '../../../mobx'
import {observer} from 'mobx-react-lite'
import EditProfile from '../EditProfile/EditProfile.tsx'

type UserProfileTypes = {
  nickname: string
  email: string
  phone: string
  orders: OrderWaitingTypes[]
}

type OrderWaitingTypes = {
  id: number
  dateOfCreate: string
  startMMR: number | null
  endMMR: number | null
  countLP: number | null
  cost: number
  status: string
}

const defaultOrder = {
  id: 0,
  dateOfCreate: '',
  startMMR: 0,
  endMMR: 0,
  countLP: 0,
  cost: 0,
  status: '',
}

const BoosterProfile = () => {
  const [user, setUser] = React.useState<UserProfileTypes>({
    nickname: '',
    email: '',
    orders: [],
    phone: '',
  })
  const [newOrder, setNewOrder] = React.useState<UserProfileTypes>({
    nickname: '',
    email: '',
    orders: [],
    phone: '',
  })
  const [orderNow, setOrderNow] = React.useState<OrderWaitingTypes>()
  const [canReloadOrder, setCanReloadOrder] = React.useState(false)

  React.useEffect(() => {
    axios.get('/booster/getBoosterInfo').then(({data}) => setUser(data))
    axios.get('/booster/getNewBoosterInfo').then(({data}) => setNewOrder(data))
    axios.get('/booster/check').then(({data}) => setOrderNow(data))
  }, [userStore, canReloadOrder])

  const state = {
    tableHead: ['ID', 'Дата', 'Стоимость', 'Информация'],
    widthArr: ['10%', '30%', '30%', 120],
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [modalState, setModalState] = useState<OrderWaitingTypes>(defaultOrder)

  const onDone = () => {
    axios
      .get('/booster/getStatusComplete')
      .then(() => setCanReloadOrder((prevState) => !prevState))
  }

  const toggleModal = (item: OrderWaitingTypes) => () => {
    setModalVisible((prevState) => !prevState)
    setModalState(item)
  }

  const onTake = (id: number) => () => {
    axios.get(`/booster/getNewOrder?orderid=${id}`).then(() => {
      setCanReloadOrder((prevState) => !prevState)
      setModalVisible((prevState) => !prevState)
    })
  }

  const onCancel = (id: number) => () => {
    axios.get(`/booster/getOrderStatusCancel?orderid=${id}`).then(() => {
      setCanReloadOrder((prevState) => !prevState)
      setModalVisible((prevState) => !prevState)
    })
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
      {orderNow ? (
        <View style={Styles.container3}>
          <Text style={Styles.title}>Текущий заказ</Text>
          <Text style={Styles.orderText}>
            Начальный ММР: {orderNow?.startMMR}
          </Text>
          <Text style={Styles.orderText}>Конечный ММР: {orderNow?.endMMR}</Text>
          <Text style={Styles.orderText}>
            Количество игр SD: {orderNow?.countLP}
          </Text>
          <Text style={Styles.orderText}>Стоимость: {orderNow?.cost}руб.</Text>
          <Text style={Styles.orderText}>Статус: {orderNow?.status}</Text>
          {orderNow?.status === 'Выполняется' && (
            <Button title="Выполнен" onPress={onDone} />
          )}
        </View>
      ) : (
        <Text style={Styles.orderText}>Текущего заказа нет</Text>
      )}

      {!orderNow && (
        <View>
          <Text style={Styles.userName}>Список заказов</Text>
          {newOrder && newOrder.orders.length !== 0 ? (
            <>
              <ScrollView>
                <Table borderStyle={{borderColor: '#D0A2F7', borderWidth: 2}}>
                  <Row
                    data={state.tableHead}
                    widthArr={state.widthArr}
                    style={Styles.head}
                    textStyle={Styles.headText}
                  />
                  {newOrder.orders.map((dataRow, index) => (
                    <TableWrapper>
                      <Cell data={dataRow.id} width={state.widthArr[0]} />
                      <Cell
                        data={dataRow.dateOfCreate}
                        width={state.widthArr[1]}
                      />
                      <Cell data={dataRow.cost} width={state.widthArr[2]} />
                      <Cell
                        data={
                          <Pressable onPress={toggleModal(dataRow)}>
                            <Text>Нажмите сюда!</Text>
                          </Pressable>
                        }
                        width={state.widthArr[3]}
                      />
                    </TableWrapper>
                  ))}
                </Table>
              </ScrollView>
            </>
          ) : (
            <Text>Нет новых заказов</Text>
          )}
        </View>
      )}
      <View>
        <Text style={Styles.userName}>История заказов</Text>
        <ScrollView>
          <Table borderStyle={{borderColor: '#D0A2F7', borderWidth: 2}}>
            <Row data={state.tableHead} widthArr={state.widthArr} />
            {user.orders.map((dataRow, index) => (
              <TableWrapper>
                <Cell data={dataRow.id} width={state.widthArr[0]} />
                <Cell data={dataRow.dateOfCreate} width={state.widthArr[1]} />
                <Cell data={dataRow.cost} width={state.widthArr[2]} />
                <Cell
                  data={
                    <Pressable onPress={toggleModal(dataRow)}>
                      <Text>Нажмите сюда!</Text>
                    </Pressable>
                  }
                  width={state.widthArr[3]}
                />
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal(defaultOrder)}>
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
              onPress={toggleModal(defaultOrder)}>
              <Text style={Styles.textStyle}>Hide Modal</Text>
            </Pressable>
            {modalState.status === 'Ожидает подтверждения' && (
              <>
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={onTake(modalState.id)}>
                  <Text style={Styles.textStyle}>Принять в работу</Text>
                </Pressable>
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={onCancel(modalState.id)}>
                  <Text style={Styles.textStyle}>Отменить</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default observer(BoosterProfile)
