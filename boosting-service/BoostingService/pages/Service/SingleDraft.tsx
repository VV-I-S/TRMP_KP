import React, {useEffect, useState} from 'react'
import {Text, View, TextInput, Button, Pressable} from 'react-native'
import {Slider} from 'react-native-elements'
import Styles from './Service.style'
import {userStore} from '../../mobx'
import axios from 'axios'
import {observer} from 'mobx-react-lite'

const SingleDraft = () => {
  const [lp, setLp] = useState('')
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
    } else if (+lp <= 0) {
      alert('ММР должен быть больше 0')
    } else {
      const boostOrder = {
        cost: +lp * 50,
        countLP: +lp,
        email: userStore.email as string,
        endMMR: 0,
        service: 'lp',
        startMMR: 0,
      }
      const {data: checkOrder} = await axios.post('/order/check', boostOrder)

      axios
        .post('/order/create', checkOrder)
        .then((r) => {
          setCanOrder(false)
          alert('Заказ успешно сформирован')
          setLp('')
        })
        .catch((e) => console.info(e))
    }
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container}>
        <Text style={Styles.formLabel}>Оформить заказ</Text>
        <TextInput
          style={Styles.inputStyle2}
          placeholder="Количество игр"
          keyboardType={'number-pad'}
          value={lp}
          onChangeText={(text) => setLp(text)}
        />
        <View />
        <View style={Styles.formText}>
          <Text style={Styles.formText}>
            Стоимость (со скидкой): {+lp * 50}
          </Text>
          <Text style={Styles.formText}>Стоимость: {+lp * 60}</Text>
          <Text style={Styles.formText}>От 1 до 5 дней</Text>

          {userStore.isLogin() ? (
            <Pressable style={Styles.button} onPress={sendOrder}>
              <Text style={Styles.textStyle}>Оформить заказ</Text>
            </Pressable>
          ) : (
            <Text>Войдите в аккаунт</Text>
          )}
        </View>
      </View>
    </View>
  )
}
export default observer(SingleDraft)
