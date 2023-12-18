import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import Styles from "./Login.style";
import {Link} from '@react-navigation/native';
import {userStore} from "../../mobx";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from "axios";


type FormLoginValueType = {
    username: string;
    password: string;
}

const Login = () => {
    const [value, setValue] = useState(0);
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        reset: loginReset,
        setError: loginSetError,
        formState: {
            errors: loginErrors
        }
    } = useForm<FormLoginValueType>();

    const onLoginSubmit: SubmitHandler<FormLoginValueType> = async (data) => {
        const formData = new FormData()

        formData.append('username', data.username)
        formData.append('password', data.password)

        const response = await axios.post("/api/account/login", formData)
        if (response.status === 400) {
            userStore.clear()
            loginSetError("username", {type: "custom", message: "chto-to ne tak"})
        } else {
            axios.get('/api/account/getUserInfo')
                .then(({data}) => {
                    userStore.setAll(data.nickname, data.email, data.role, data.phone, data.avatar)
                    //navigate("/profile")
                })

        }
    }
    return (
        <View style={Styles.container}>
            <Text style={Styles.formLabel}> Вход в личный кабинет </Text>
            <View>
                <TextInput placeholder="Введите e-mail"
                           style={Styles.inputStyle}
                           {...loginRegister("username", { required: true })}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Введите пароль"
                    style={Styles.inputStyle}
                    {...loginRegister("password", { required: true })}
                />
                <Button
                    title="Войти в личный кабинет"
                />
                <Link to={'/Register'}>
                    Зарегистрироваться
                </Link>
            </View>
        </View>
    );
};

export default Login