import {Modal, Pressable, Text, TextInput} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {userStore} from '../../../mobx'
import axios from 'axios'
import {observer} from 'mobx-react-lite'

type EditProfileProps = {
  updateInfo: () => void
}

const EditProfile: FC<EditProfileProps> = ({updateInfo}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [avatar, setAvatar] = useState(userStore.avatar)
  const [nickname, setNickname] = useState(userStore.nickname)
  const [phone, setPhone] = useState(userStore.telephone)
  const [password, setPassword] = useState('')

  const submitChange = () => {
    const formData = {
      avatar,
      nickname,
      phone,
      password,
    }

    axios.post('/account/changeInfo', formData).then(() => {
      setModalVisible((prevState) => !prevState)
      updateInfo()
    })
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
          onChangeText={(text) => setAvatar(text)}
        />
        <TextInput
          placeholder={'Никнейм'}
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
        <TextInput
          placeholder={'Телефон'}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          placeholder={'Пароль'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
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

export default observer(EditProfile)
