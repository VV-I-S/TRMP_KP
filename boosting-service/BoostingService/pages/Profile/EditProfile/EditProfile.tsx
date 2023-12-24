import {Modal, Pressable, Text} from 'react-native'
import React, {useState} from 'react'

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <Pressable onPress={() => setModalVisible((prevState) => !prevState)}>
        <Text>Изменить</Text>
      </Pressable>
      <Modal visible={modalVisible}>
        <Text>Модалка</Text>
        <Pressable onPress={() => setModalVisible((prevState) => !prevState)}>
          <Text>Закрыть</Text>
        </Pressable>
      </Modal>
    </>
  )
}

export default EditProfile
