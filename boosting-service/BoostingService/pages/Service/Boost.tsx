import React, {useEffect, useState} from 'react'
import {Text, View, TextInput, Button, Pressable, Alert} from 'react-native'
import {Slider} from 'react-native-elements'
import Styles from './Service.style'
import {userStore} from '../../mobx'
import axios from 'axios'
import {ComponentWithNavigation} from '../../types/types.ts'

const Boost: ComponentWithNavigation = ({navigation}) => {
  const [mmrnow, setMmrnow] = useState('')
  const [lastmmr, setLastmmr] = useState('')
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
    } else if (+lastmmr - +mmrnow < 0) {
      alert('Конечный ммр должен быть больше начального')
    } else {
      const boostOrder = {
        cost: +lastmmr - +mmrnow * 2.5 * 0.66,
        countLP: 0,
        email: userStore.email as string,
        endMMR: lastmmr,
        service: 'boost',
        startMMR: +mmrnow,
      }
      const {data: checkOrder} = await axios.post('/order/check', boostOrder)

      axios
        .post('/order/create', checkOrder)
        .then((r) => {
          setCanOrder(false)
          alert('Заказ успешно сформирован')
          setMmrnow('')
          setLastmmr('')
        })
        .catch((e) => console.info(e))
    }
  }

  const getValue = () => {
    const value = +lastmmr - +mmrnow
    return value < 0 ? 0 : value
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <Text style={Styles.formLabel}>Оформить заказ</Text>
        <TextInput
          style={Styles.inputStyle}
          keyboardType={'number-pad'}
          placeholder="Текущий ммр"
          value={mmrnow}
          onChangeText={(text) => setMmrnow(text)}
        />
        <TextInput
          style={Styles.inputStyle}
          keyboardType={'number-pad'}
          placeholder="Конечный ммр"
          value={lastmmr}
          onChangeText={(text) => setLastmmr(text)}
        />
        <Text style={Styles.valueStyle}>{getValue()}</Text>
        <View style={Styles.formText}>
          <Text style={Styles.formText}>
            Стоимость (со скидкой):{' '}
            {Math.round(getValue() * 2.5 * 0.66 * 100) / 100}
          </Text>
          <Text style={Styles.formText}>Стоимость: {getValue() * 2.5}</Text>
          <Text style={Styles.formText}>
            Дней:{' '}
            {5 * (Math.trunc(getValue() / 1000) + 1) -
              5 * (Math.trunc(getValue() / 1000) + 1) +
              3}
          </Text>
          <Pressable style={Styles.button}>
            <Text style={Styles.textStyle} onPress={sendOrder}>
              Оформить заказ
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
export default Boost
