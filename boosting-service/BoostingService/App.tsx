import * as React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Boost from './pages/Service/Boost'
import Calibration from './pages/Service/Calibration'
import SingleDraft from './pages/Service/SingleDraft'
import {userStore} from './mobx'
import {observer} from 'mobx-react-lite'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Вход в личный кабинет"
        drawerStyle={{backgroundColor: 'white'}}
        screenOptions={{
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'black',
        }}>
        <Drawer.Screen
          name="Вход в личный кабинет"
          component={Login}
          options={{
            drawerItemStyle: {height: 0},
            drawerLabel: 'Вход в личный кабинет',
            drawerStyle: {backgroundColor: '#D0A2F7'},
          }}
        />
        <Drawer.Screen
          name="Регистрация"
          component={Register}
          options={{
            drawerItemStyle: {height: 0},
            drawerLabel: 'Регистрация',
            drawerStyle: {backgroundColor: '#e0b0ff'},
          }}
        />
        <Drawer.Screen
          name="Личный кабинет"
          component={Profile}
          options={{
            drawerLabel: 'Личный кабинет',
            drawerStyle: {backgroundColor: '#e0b0ff'},
          }}
        />
        <Drawer.Screen
          name="Повышение рейтинга"
          component={Boost}
          options={{
            drawerLabel: 'Повышение рейтинга',
            drawerStyle: {backgroundColor: '#e0b0ff'},
          }}
        />
        <Drawer.Screen
          name="Калибровка"
          component={Calibration}
          options={{
            drawerLabel: 'Калибровка',
            drawerStyle: {backgroundColor: '#e0b0ff'},
          }}
        />
        <Drawer.Screen
          name="Single Draft"
          component={SingleDraft}
          options={{
            drawerLabel: 'Single Draft',
            drawerStyle: {backgroundColor: '#e0b0ff'},
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default observer(App)
