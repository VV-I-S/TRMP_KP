import React, { useState } from "react";
import {Button, TextInput, View} from 'react-native';
import axios from "axios";

const UserProfile = () =>{

    const [emailForBlock, setEmail] = useState('');

    const changeEmail = (text:string) => {
        setEmail(text);
    };

return (
    <View>
        <TextInput value={emailForBlock}
                        onChangeText={changeEmail}></TextInput>
        <Button
            title="Заблокировать"
            onPress={() => { axios.get(`tran/blockUser?email=${emailForBlock}`) }}
            //onPress={() => { axios.get(`tran/test`).then(({data})=>console.log(data))}}
            />
        <Button
            title="Разблокировать"
        />
        <Button
            title="Сделать бустером"
        />
    </View>)
}
export default UserProfile