import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Formik } from 'formik';
import { logged } from '../../contexts/authSlice';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
    txtInput: {
        backgroundColor: 'white',
        height: 50,
        width: 350,
        alignSelf: 'center',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 100,
        padding: 10,
        marginTop: 15,
        marginBottom: 5
    },
    form: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        height: '100%'
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    btnLogin: {
        width: 140,
        alignSelf: 'center',
        marginTop: 15
    }
})

export async function accessToken(dataObject) {

    try {
        await AsyncStorage.setItem('dataLogin', JSON.stringify(dataObject));
    } catch (error) {
        console.log("erro na função assincrona")
    }

}

export default function Login() {

    const dispatch = useDispatch()

    function submit(values) {
        
        const apiHost = process.env.EXPO_PUBLIC_API_HOST;
        const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
        const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

        if (values.name != '') {
            fetch(apiProtocol + apiHost + apiDoor + '/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    password: values.password
                })
            })
                .then(response => response.json())
                .then((json) => validateLogin(json))
                .catch((error) => alert("Falha ao conectar"))
        }

        function validateLogin(json) {

            if (json.message === 'Usuário Logado') {

                dispatch(logged())

                let dataObject = {
                    token: json.token,
                    userName: json.name,
                    accessLevel: json.access_level
                }

                accessToken(dataObject)
            } else {
                alert(json.message)
            }
        }
    }

    return (
        <Formik
            initialValues={{ name: '', password: '' }}
            onSubmit={values => submit(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}

                        style={styles.txtInput}
                        placeholder='Nome: '
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}

                        style={styles.txtInput}
                        placeholder='Senha: '
                        secureTextEntry={true}
                    />
                    <View style={styles.btnLogin}>
                        <Button onPress={handleSubmit} title="Entrar" />
                    </View>
                </View>
            )}
        </Formik>
    )
}

