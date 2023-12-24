import React, {useEffect} from 'react'
import {Text, View} from 'react-native'
import axios from 'axios'

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
        <View>
            <Text>{user.nickname}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phone}</Text>
        </View>
    )
}
export default UserProfile
