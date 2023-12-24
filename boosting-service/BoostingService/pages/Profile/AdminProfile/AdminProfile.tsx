import React, {useState} from 'react'
import {Button, TextInput, View} from 'react-native'
import axios from 'axios'

const AdminProfile = () => {
    const [emailForBlock, setEmail] = useState('')

    const changeEmail = (text: string) => {
        setEmail(text)
    }

    return (
        <View>
            <TextInput value={emailForBlock} onChangeText={changeEmail} />
            <Button
                title="Заблокировать"
                onPress={() => {
                    axios.get(`/admin/blockUser?email=${emailForBlock}`)
                }}
            />
            <Button
                title="Разблокировать"
                onPress={() => {
                    axios.get(`/admin/unblockUser?email=${emailForBlock}`)
                }}
            />
            <Button
                title="Сделать бустером"
                onPress={() => {
                    axios.get(`/admin/setrolebooster?email=${emailForBlock}`)
                }}
            />
        </View>
    )
}
export default AdminProfile