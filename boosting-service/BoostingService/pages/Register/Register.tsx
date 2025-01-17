import React, {useState} from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native'
import Styles from './Register.style'
import {Link} from '@react-navigation/native'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import axios from 'axios'
import {ComponentWithNavigation} from '../../types/types.ts'

type FormRefisterValueType = {
  regNickname: string
  regEmail: string
  regPhone: string
  regPassword: string
}

const Register: ComponentWithNavigation = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<FormRefisterValueType>({
    defaultValues: {
      regNickname: '',
      regEmail: '',
      regPhone: '',
      regPassword: '',
    },
  })

  const onRegister: SubmitHandler<FormRefisterValueType> = async (form) => {
    const usersWithEmail = await axios
      .get('/account/existsemail', {params: {email: form.regEmail}})
      .then(({data}) => data)

    if (!usersWithEmail) {
      setError('regEmail', {
        type: 'custom',
        message: 'userEmail is using',
      })
    } else {
      await axios.post('/account/register', form)
      // registerReset()
      navigation.navigate('Личный кабинет')
    }
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <Text style={Styles.formLabel}> Регистрация </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Введите никнейм"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={Styles.inputStyle}
            />
          )}
          name="regNickname"
        />
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
          name="regEmail"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Введите номер телефона"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={Styles.inputStyle}
            />
          )}
          name="regPhone"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              secureTextEntry={true}
              placeholder="Введите пароль"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={Styles.inputStyle2}
            />
          )}
          name="regPassword"
        />
        <View style={Styles.formButton}>
          <Pressable onPress={handleSubmit(onRegister)} style={Styles.button}>
            <Text style={Styles.textStyle}>Регистрация</Text>
          </Pressable>
        </View>
        <Link to={'/Вход в личный кабинет'} style={Styles.formLink}>
          Вход в личный кабинет
        </Link>
      </View>
    </View>
  )
}

export default Register
