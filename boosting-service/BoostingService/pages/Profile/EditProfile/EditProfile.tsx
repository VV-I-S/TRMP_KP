import {Modal, Pressable, Text, TextInput} from 'react-native'
import React, {useEffect, useState} from 'react'
import {userStore} from '../../../mobx'
import axios from 'axios'

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [nickname, setNickname] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setAvatar(userStore.avatar)
    setNickname(userStore.nickname)
    setPhone(userStore.telephone)
  }, [modalVisible])

  const submitChange = () => {
    const formData = {
      avatar,
      nickname,
      phone,
      password,
    }

    axios
      .post('/account/changeInfo', formData)
      .then(() => setModalVisible((prevState) => !prevState))

    setModalVisible(false)
  }

  return (
    <>
      <Pressable onPress={() => setModalVisible((prevState) => !prevState)}>
        <Text>Изменить</Text>
      </Pressable>
      <Modal visible={modalVisible}>
        <Text>Редактирование</Text>
        <TextInput
          placeholder={'Аватарка'}
          value={avatar}
          onChangeText={(text) => setAvatar(text)}></TextInput>
        <TextInput
          placeholder={'Никнейм'}
          value={nickname}
          onChangeText={(text) => setNickname(text)}></TextInput>
        <TextInput
          placeholder={'Телефон'}
          value={phone}
          onChangeText={(text) => setPhone(text)}></TextInput>
        <TextInput
          placeholder={'Пароль'}
          value={password}
          onChangeText={(text) => setPassword(text)}></TextInput>
        <Pressable onPress={submitChange}>
          <Text>Сохранить</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible((prevState) => !prevState)}>
          <Text>Отменить</Text>
        </Pressable>
      </Modal>
    </>
  )
}

export default EditProfile
