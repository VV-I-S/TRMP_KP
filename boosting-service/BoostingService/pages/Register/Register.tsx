import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import Styles from "./Register.style";
import {Link} from "@react-navigation/native";

const Register = () => {
    const [value, setValue] = useState(0);
    return (
        <View style={Styles.container}>
            <Text style={Styles.formLabel}> Регистрация </Text>
            <View>
                <TextInput placeholder="Введите никнейм" style={Styles.inputStyle} />
                <TextInput placeholder="Введите e-mail" style={Styles.inputStyle} />
                <TextInput placeholder="Введите номер телефона" style={Styles.inputStyle} />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Введите пароль"
                    style={Styles.inputStyle}
                />
                <Button
                    title="Регистрация"
                />
                <Link to={'/Login'}>
                    Вход в личный кабинет
                </Link>
            </View>
        </View>
    );
};

export default Register