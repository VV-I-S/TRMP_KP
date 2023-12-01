import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import Styles from "./Login.style";
import {Link} from '@react-navigation/native';

const Login = () => {
    const [value, setValue] = useState(0);
    return (
        <View style={Styles.container}>
            <Text style={Styles.formLabel}> Вход в личный кабинет </Text>
            <View>
                <TextInput placeholder="Введите e-mail" style={Styles.inputStyle} />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Введите пароль"
                    style={Styles.inputStyle}
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