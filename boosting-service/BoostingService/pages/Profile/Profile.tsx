import {Button, Text, View, Pressable} from 'react-native'
import {ComponentWithNavigation} from '../../types/types.ts'
import {userStore} from '../../mobx'
import axios from 'axios'
import AdminProfile from './AdminProfile/AdminProfile'
import BoosterProfile from './BoosterProfile/BoosterProfile'
import UserProfile from './UserProfile/UserProfile'
import {observer} from 'mobx-react-lite'
import Styles from './Profile.style'

const Profile: ComponentWithNavigation = ({navigation}) => {
  const onExit = () => {
    axios.get('/account/logout')
    userStore.clear()
    navigation.navigate('Вход в личный кабинет')
  }

  const profiles = {
    admin: <AdminProfile />,
    booster: <BoosterProfile />,
    user: <UserProfile />,
    '': <Text>Не войдено</Text>,
    block: <Text>Вы в бане</Text>,
  }

  return (
    <View style={Styles.container}>
      {!userStore.isLogin() ? (
        <Pressable
          onPress={() => navigation.navigate('Вход в личный кабинет')}
          style={Styles.buttonEnter}>
          <Text style={Styles.textButton}>Войти</Text>
        </Pressable>
      ) : (
        <>
          <Pressable onPress={onExit} style={Styles.button}>
            <Text style={Styles.textButton}>Выйти</Text>
          </Pressable>
          {/*@ts-ignore*/}
          {profiles[userStore?.role as keyof profiles]}
        </>
      )}
    </View>
  )
}

export default observer(Profile)
