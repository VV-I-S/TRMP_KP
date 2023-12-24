import {Button, Text, View} from 'react-native'
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
        <Button
          title={'Войти'}
          onPress={() => navigation.navigate('Вход в личный кабинет')}
        />
      ) : (
        <>
          <Button title={'Выйти'} onPress={onExit} />
          {/*@ts-ignore*/}
          {profiles[userStore?.role as keyof profiles]}
        </>
      )}
    </View>
  )
}

export default observer(Profile)
