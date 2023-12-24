import React from 'react'
import {Text, View, TextInput, Button} from 'react-native'
import Styles from './Login.style'
import {Link} from '@react-navigation/native'
import {userStore} from '../../mobx'
import {useForm, Controller, SubmitHandler} from 'react-hook-form'
import axios from 'axios'
import {ComponentWithNavigation} from '../../types/types.ts'

type FormLoginValueType = {
    username: string
    password: string
}

type GetUserInfo = {
    id: number
    nickname: string
    email: string
    phone: string
    password: string
    role: string
    avatar: string
}

const Login: ComponentWithNavigation = ({navigation}) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormLoginValueType>({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onLoginSubmit: SubmitHandler<FormLoginValueType> = async (form) => {
        const formData = new FormData()

        formData.append('username', form.username)
        formData.append('password', form.password)

        const response = await axios.post('account/login', form, {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
        })
        if (response.status === 400) {
            userStore.clear()
            setError('username', {type: 'custom', message: 'chto-to ne tak'})
        } else {
            await axios.get<GetUserInfo>('/account/getUserInfo').then(({data}) => {
                userStore.setAll(
                    data.nickname,
                    data.email,
                    data.role,
                    data.phone,
                    data.avatar,
                )
                navigation.navigate('Личный кабинет')
            })
        }
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.formLabel}> Вход в личный кабинет </Text>
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder="Введите e-mail"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={Styles.inputStyle}
                        />
                    )}
                    name="username"
                />

                {errors.username && <Text>{errors.username.message}</Text>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder="Введите пароль"
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={Styles.inputStyle}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text>{errors.password.message}</Text>}
                <Button
                    title="Войти в личный кабинет"
                    onPress={handleSubmit(onLoginSubmit)}
                />
                <Link to={'/Регистрация'}>Зарегистрироваться</Link>
            </View>
        </View>
    )
}

export default Login
