import React, {useState} from 'react'
import {Button, TextInput, View, Pressable, Text} from 'react-native'
import axios from 'axios'
import Styles from './AdminProfile.style'

const AdminProfile = () => {
  const [emailForBlock, setEmail] = useState('')

  const changeEmail = (text: string) => {
    setEmail(text)
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <Text style={Styles.formLabel}>Управление аккаунтом</Text>
        <TextInput
          value={emailForBlock}
          onChangeText={changeEmail}
          style={Styles.inputStyle}
          placeholder={'Введите e-mail'}
        />
        <Pressable
          style={Styles.button}
          onPress={() => {
            axios.get(`/admin/blockUser?email=${emailForBlock}`)
          }}>
          <Text style={Styles.textStyle}>Заблокировать</Text>
        </Pressable>
        <Pressable
          style={Styles.button}
          onPress={() => {
            axios.get(`/admin/unblockUser?email=${emailForBlock}`)
          }}>
          <Text style={Styles.textStyle}>Разблокировать</Text>
        </Pressable>
        <Pressable
          style={Styles.button}
          onPress={() => {
            axios.get(`/admin/setrolebooster?email=${emailForBlock}`)
          }}>
          <Text style={Styles.textStyle}>Сделать бустером</Text>
        </Pressable>
      </View>
    </View>
  )
}
export default AdminProfile
