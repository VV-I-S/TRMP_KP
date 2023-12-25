import React, {useEffect, useState} from 'react'
import {Text, View, TextInput, Button, Pressable} from 'react-native'
import {Slider} from 'react-native-elements'
import Styles from './Service.style'
import {userStore} from '../../mobx'
import {observer} from 'mobx-react-lite'
import axios from 'axios'

const Calibration = () => {
  const [mmr, setMmr] = useState('')
  const [canOrder, setCanOrder] = useState(true)

  useEffect(() => {
    if (userStore.email) {
      axios.get('/order/isUserHasOrders').then(({data}) => {
        setCanOrder(!data)
      })
    }
  }, [userStore.email])

  const sendOrder = async () => {
    if (!canOrder) {
      alert('У вас уже есть заказ, завершите его или отмените')
    } else if (+mmr <= 0) {
      alert('ММР должен быть больше 0')
    } else {
      const boostOrder = {
        cost: 1088,
        countLP: 0,
        email: userStore.email as string,
        endMMR: +mmr,
        service: 'calibration',
        startMMR: +mmr + 400,
      }
      const {data: checkOrder} = await axios.post('/order/check', boostOrder)

      axios
        .post('/order/create', checkOrder)
        .then((r) => {
          setCanOrder(false)
          alert('Заказ успешно сформирован')
          setMmr('')
        })
        .catch((e) => console.info(e))
    }
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container3}>
        <Text style={Styles.formLabel}>Оформить заказ</Text>
        <TextInput
          style={Styles.inputStyle2}
          keyboardType={'number-pad'}
          placeholder="Текущий ммр"
          value={mmr}
          onChangeText={(text) => setMmr(text)}
        />
        <View />
        <View style={Styles.form}>
          <Text style={Styles.formText}>Конечный ммр: {+mmr + 400}</Text>
          <Text style={Styles.formText}>Стоимость: 1088 руб.</Text>
          <Text style={Styles.discount}>1200 руб.</Text>
          <Text style={Styles.formText}>От 1 до 3 дней</Text>

          {userStore.isLogin() ? (
            <Pressable style={Styles.button} onPress={sendOrder}>
              <Text style={Styles.textStyle}>Оформить заказ</Text>
            </Pressable>
          ) : (
            <Text style={Styles.textLogin}>Войдите в аккаунт</Text>
          )}
        </View>
      </View>
    </View>
  )
}
export default observer(Calibration)
