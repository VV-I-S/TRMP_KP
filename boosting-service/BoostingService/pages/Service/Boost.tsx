import React from 'react'
import {Text, View, TextInput, Button, Pressable} from 'react-native'
import {Slider} from 'react-native-elements'
import Styles from './Service.style'

const Boost = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <Text style={Styles.formLabel}>Оформить заказ</Text>
        <TextInput
          style={Styles.inputStyle}
          placeholder="Текущий ммр"></TextInput>
        <TextInput
          style={Styles.inputStyle}
          placeholder="Конечный ммр"></TextInput>
        <Slider
          thumbStyle={Styles.thumb}
          maximumValue={500}
          minimumValue={100}
          step={50}
        />
        <Text>Value</Text>
        <View style={Styles.formText}>
          <Text style={Styles.formText}>Конечный ммр:</Text>
          <Text style={Styles.formText}>Стоимость (со скидкой)</Text>
          <Text style={Styles.formText}>Стоимость</Text>
          <Text style={Styles.formText}>Дней</Text>
        </View>
        <Pressable style={Styles.button}>
          <Text style={Styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    </View>
  )
}
export default Boost
