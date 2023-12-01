import React, { useState } from "react";
import {Button, TextInput, View} from 'react-native';
import axios from "axios";

const UserProfile = () =>{

    const [emailForBlock, setEmail] = useState();

    const changeEmail = (event: any) => {
        setEmail(event.target.value);
    };

return (
    <View>
        <TextInput value={emailForBlock}
                        onChange={changeEmail}></TextInput>
        <Button
            title="Заблокировать"
            onPress={() => { axios.get(`/admin/blockUser?email=${emailForBlock}`) }}
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