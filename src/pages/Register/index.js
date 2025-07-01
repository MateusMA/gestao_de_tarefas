import * as React from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    txtInput: {
        backgroundColor: 'white',
        height: 40,
        width: '95%',
        alignSelf: 'center',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 14,
        alignContent: 'center'
    },
    radioGroup: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5
    },
    radioTxt: {
        height: 'auto',
        width: 'auto',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    radioTittle: {
        paddingTop: 10,
        paddingEnd: '15%',
        alignSelf: 'flex-end',
        color: '#999999'
    },
})

export default function RegisterScreen() {

    const apiHost = process.env.EXPO_PUBLIC_API_HOST;
    const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
    const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

    function submit(values) {

        if (values.name != '' && values.password != '' 
        && values.profession != ''&& values.accessLevel != '') {
            fetch(apiProtocol + apiHost + apiDoor + '/cadastrar', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    password: values.password,
                    cargo: values.profession,
                    access_level: values.accessLevel 
                })
            })
                .then(response => response.json())
                .then((json) => {if (json.message === 'Usuário criado') {
                    alert("Usuário cadastrado")
                } else {
                    console.log(json.message)
                }})
                .catch(() => alert("Falha ao Cadastrar"))
        }else{
            alert("Um campo está vazio")
        }
    }

    return (
        <Formik
            initialValues={{ name: '', password: '', profession: '', accessLevel: '' }}
            onSubmit={values => submit(values)}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>

                    <Text style={styles.title}>Tela de Cadastro</Text>

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

                    <TextInput
                        onChangeText={handleChange('profession')}
                        onBlur={handleBlur('profession')}
                        value={values.profession}
                        style={styles.txtInput}
                        placeholder='Cargo: '
                    />

                    <Text style={styles.radioTittle}>Nível de acesso: </Text>

                    <View style={styles.radioGroup}>
    
                        <RadioButton.Group onValueChange={handleChange('accessLevel')}
                            value={values.accessLevel}
                        >

                            <View style={styles.radioGroup}>
                                <Text style={styles.radioTxt}>Usuário: </Text>
                                <RadioButton value='0'></RadioButton>
                                <Text style={styles.radioTxt}>Administrador: </Text>
                                <RadioButton value='1'></RadioButton>
                            </View>

                        </RadioButton.Group>
                        
                    </View>

                    <View>
                        <Button onPress={handleSubmit} title="Cadastrar" />
                    </View>
                </View>
            )}
        </Formik>
    );
}