import React from 'react'
import {Text, View, TextInput, Button, Pressable} from 'react-native'
import {Slider} from 'react-native-elements'
import Styles from './Service.style'
import {userStore} from '../../mobx'
import {observer} from 'mobx-react-lite'

const Calibration = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.container3}>
        <Text style={Styles.formLabel}>Оформить заказ</Text>
        <TextInput style={Styles.inputStyle2} placeholder="Текущий ммр" />
        <View />
        <View style={Styles.formText}>
          <Text style={Styles.formText}>Конечный ммр:</Text>
          <Text style={Styles.formText}>Стоимость (со скидкой)</Text>
          <Text style={Styles.formText}>Стоимость</Text>
          <Text style={Styles.formText}>Дней</Text>
        </View>

        {userStore.isLogin() ? (
          <Pressable style={Styles.button}>
            <Text style={Styles.textStyle}>Оформить заказ</Text>
          </Pressable>
        ) : (
          <Text>Войдите в аккаунт</Text>
        )}
      </View>
    </View>
  )
}
export default observer(Calibration)
