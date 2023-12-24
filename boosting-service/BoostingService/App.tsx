import * as React from 'react'
import {Button, View} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminProfile from './pages/Profile/AdminProfile/AdminProfile'
import UserProfile from './pages/Profile/UserProfile/UserProfile'
import axios from 'axios'
import Profile from './pages/Profile/Profile.tsx'

// const routConfig = {
//   Login:{
//     screen: Login
//   }
// }

const Drawer = createDrawerNavigator()

export default function App() {
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
                    name="Управление аккаунтами"
                    component={AdminProfile}
                    options={{
                        drawerLabel: 'Управление аккаунтами',
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
            </Drawer.Navigator>
        </NavigationContainer>
    )
}