import {Modal, Pressable, Text, TextInput, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {userStore} from '../../../mobx'
import axios from 'axios'
import {observer} from 'mobx-react-lite'
import Styles from './EditProfile.style'

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
      <Pressable
        onPress={() => setModalVisible((prevState) => !prevState)}
        style={Styles.button}>
        <Text style={Styles.textStyle}>Редактировать</Text>
      </Pressable>
      <Modal visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.userName}>Редактирование</Text>
            <TextInput
              style={Styles.inputStyle}
              placeholder={'Аватарка'}
              value={avatar}
              onChangeText={(text) => setAvatar(text)}
            />
            <TextInput
              style={Styles.inputStyle}
              placeholder={'Никнейм'}
              value={nickname}
              onChangeText={(text) => setNickname(text)}
            />
            <TextInput
              style={Styles.inputStyle}
              placeholder={'Телефон'}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={Styles.inputStyle}
              placeholder={'Пароль'}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={submitChange} style={Styles.button2}>
              <Text style={Styles.textStyle}>Сохранить</Text>
            </Pressable>
            <Pressable
              style={Styles.button2}
              onPress={() => setModalVisible((prevState) => !prevState)}>
              <Text style={Styles.textStyle}>Отменить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default observer(EditProfile)
