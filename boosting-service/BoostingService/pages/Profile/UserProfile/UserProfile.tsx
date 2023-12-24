import React, {useEffect} from 'react'
import {Text, View} from 'react-native'
import axios from 'axios'
import { Avatar } from "react-native-paper";
import Styles from './UserProfile.style'

export type OrderWaitingTypes = {
    id: number
    startMMR: number
    endMMR: number
    countLP: number
    cost: number
    status: string
}

type UserProfileTypes = {
    nickname: string
    email: string
    phone: string
    orders: OrderWaitingTypes[]
}

const UserProfile = () => {
    const [user, setUser] = React.useState<UserProfileTypes>({
        nickname: '',
        email: '',
        orders: [],
        phone: '',
    })

    useEffect(() => {
        //TODO: как-то странно это все работает, не сразу записывается
        axios.get('/user/getUserInfo').then(({data}) => setUser(data))
    }, [])

    return (
        <View style={Styles.container}>
            <View style={Styles.container2}>
                <Avatar.Icon size={100} icon="folder" />
                <Text style={Styles.userName}>{user.nickname}</Text>
                <Text style={Styles.userData}>{user.email}</Text>
                <Text style={Styles.userData}>{user.phone}</Text>
            </View>
            <View>
                <Text style={Styles.userName}>Текущий заказ</Text>
            </View>
            <View>
                <Text style={Styles.userName}>История заказов</Text>
            </View>
        </View>
    )
}
export default UserProfile
