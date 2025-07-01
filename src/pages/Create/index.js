import * as React from 'react';
import { Formik } from 'formik';
import {
    View, TextInput, Button,
    StyleSheet, Text
} from 'react-native';

styles = StyleSheet.create({
    form: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%'
    },
    txtInput: {
        backgroundColor: 'white',
        height: 40,
        width: '95%',
        alignSelf: 'center',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 50,
        padding: 10,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 14,
        alignContent: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30
    },
    txtError: {
        color: 'red',
        fontSize: 11
    },
    inputDesc: {
        backgroundColor: 'white',
        minHeight: 60,
        width: '95%',
        alignSelf: 'center',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 4,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 14,
        textAlignVertical: 'top'
    },
    dateBox: {
        width: '40%',
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 5
    },
    inputDate: {
        backgroundColor: 'white',
        minHeight: 20,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 10,
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center'
    },
    txtLabel: {
        fontSize: 15
    },
    inputNames: {
        width: '31.5%',
        backgroundColor: 'white',
        borderColor: '#555',
        borderWidth: 0.4,
        borderRadius: 10,
        fontSize: 14,
        paddingLeft: 5,
    },
    btnDel: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    }
})

export default function Create() {

    let [errors, setError] = React.useState({})

    const apiHost = process.env.EXPO_PUBLIC_API_HOST;
    const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
    const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

    function submitForm(values) {

        let yearPrazo = String(values.date_limit).split("/")[2];
        let monthPrazo = String(values.date_limit).split("/")[1];
        let dayPrazo = String(values.date_limit).split("/")[0];

        let yearIni = String(values.date_ini).split("/")[2];
        let monthIni = String(values.date_ini).split("/")[1];
        let dayIni = String(values.date_ini).split("/")[0];

        let formatDataPrazo = yearPrazo + "-" + monthPrazo + "-" + dayPrazo;

        let formatDataIni = yearIni + "-" + monthIni + "-" + dayIni;

        fetch(apiProtocol + apiHost + apiDoor + '/criar', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoria: values.categoria,
                descricao: values.description,
                data_ini: formatDataIni,
                data_prazo: formatDataPrazo,
                nome: values.name1,
                nome2: values.name2,
                nome3: values.name3,
                nome4: values.name4,
                cliente: values.client,
                local: values.local
            })
        })
            .then(response => response.json())
            .then((json) => {
                if (json.message === 'Tarefa Criada') {
                    alert(json.message)
                } else {
                    console.log(json.error)
                }
            })
            .catch(() => alert("Falha ao Cadastrar"))
    }

    function validationSchema(values) {

        // let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

        let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])[\/]\d{4}$/;

        if (values.date_ini.match(dateformat)) {

            let operator = values.date_ini.split('/');
            let datepart = [];

            if (operator.length > 1) {
                datepart = values.date_ini.split('/');
            }

            let day = parseInt(datepart[0]);
            let month = parseInt(datepart[1]);
            let year = parseInt(datepart[2]);

            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (month == 1 || month > 2) {
                if (day > ListofDays[month - 1]) {
                    setError({ date_ini: "Este mês tem apenas 30 dias" })
                    return false;
                }
            } else if (month == 2) {
                let leapYear = false;
                if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
                if ((leapYear == false) && (day >= 29)) {
                    setError({ date_ini: "ERRO: Fevereiro só tem 28 dias " })
                    return false;
                }
                else
                    if ((leapYear == true) && (day > 29)) {
                        setError({ date_ini: "ERRO: (Ano Bissexto) Fevereiro só tem 29 dias " })
                        return false;
                    }
            }
        } else {
            setError({ date_ini: "Formato incorreto, tente: Dia/Mês/Ano" })
            return false;
        }

        if (values.date_limit.match(dateformat)) {

            let operator = values.date_limit.split('/');
            let datepart = [];

            if (operator.length > 1) {
                datepart = values.date_ini.split('/');
            }

            let day = parseInt(datepart[0]);
            let month = parseInt(datepart[1]);
            let year = parseInt(datepart[2]);

            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (month == 1 || month > 2) {
                if (day > ListofDays[month - 1]) {
                    setError({ date_limit: "Este mês tem apenas 30 dias" })
                    return false;
                }
            } else if (month == 2) {
                let leapYear = false;
                if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
                if ((leapYear == false) && (day >= 29)) {
                    setError({ date_limit: "ERRO: (Ano Bissexto) Fevereiro só tem 28 dias " })
                    return false;
                }
                else
                    if ((leapYear == true) && (day > 29)) {
                        setError({ date_limit: "ERRO: Fevereiro só tem 29 dias " })
                        return false;
                    }
            }
        } else {
            setError({ date_limit: "Formato incorreto, tente: Dia/Mês/Ano" })
            return false;
        }
        setError({})
        submitForm(values)
        return true;
    }

    return (

        <Formik
            initialValues={{
                categoria: '', description: '', date_ini: '', date_limit: '',
                name1: '', name2: '', name3: '', name4: '', client: '',
                location: ''
            }}
            onSubmit={values => validationSchema(values)}>
            {({ handleBlur, handleChange, handleSubmit, values }) => (
                <View style={styles.form}>

                    <Text style={styles.title}>Nova Tarefa</Text>

                    <TextInput
                        onChangeText={handleChange('categoria')}
                        onBlur={handleBlur('categoria')}
                        value={values.categoria}
                        style={styles.txtInput}
                        placeholder='Categoria: '
                    />

                    <TextInput
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        style={styles.inputDesc}
                        placeholder='Descrição: '
                        maxLength={255}
                        multiline={true}
                    />

                    <TextInput
                        onChangeText={handleChange('name1')}
                        onBlur={handleBlur('name1')}
                        value={values.name1}
                        style={styles.txtInput}
                        placeholder='Nome: '
                    />

                    <TextInput
                        onChangeText={handleChange('name2')}
                        onBlur={handleBlur('name2')}
                        value={values.name2}
                        style={styles.inputNames}
                        placeholder='Nome2: '
                    />

                    <TextInput
                        onChangeText={handleChange('name3')}
                        onBlur={handleBlur('name3')}
                        value={values.name3}
                        style={styles.inputNames}
                        placeholder='Nome3: '
                    />

                    <TextInput
                        onChangeText={handleChange('name4')}
                        onBlur={handleBlur('name4')}
                        value={values.name4}
                        style={styles.inputNames}
                        placeholder='Nome4: '
                    />

                    <View style={styles.dateBox}>
                        <Text aria-label='date_ini' nativeID='iniLabel' 
                            style={styles.txtLabel}>
                            Data de início:</Text>
                        <TextInput
                            onChangeText={handleChange('date_ini')}
                            onBlur={handleBlur('date_ini')}
                            value={values.date_ini}
                            style={styles.inputDate}
                            placeholder='Ex: 20/02/2009'
                        />

                        {errors.date_ini && <Text style={styles.txtError}>{errors.date_ini}</Text>}
                    </View>
                    <View style={styles.dateBox}>
                        <Text aria-label='date_limit' nativeID='limitLabel'
                         style={styles.txtLabel}>
                            Prazo de conclusão:</Text>
                        <TextInput
                            onChangeText={handleChange('date_limit')}
                            onBlur={handleBlur('date_limit')}
                            value={values.date_limit}
                            style={styles.inputDate}
                            placeholder='Ex: 21/02/2009'
                        />

                        {errors.date_limit && <Text style={styles.txtError}>{errors.date_limit}</Text>}
                    </View>

                    <TextInput
                        onChangeText={handleChange('client')}
                        onBlur={handleBlur('client')}
                        value={values.client}
                        style={styles.txtInput}
                        placeholder='Cliente: '
                    />

                    <TextInput
                        onChangeText={handleChange('local')}
                        onBlur={handleBlur('local')}
                        value={values.local}
                        style={styles.txtInput}
                        placeholder='Local: '
                    />
                    <View>
                        <Button onPress={handleSubmit} title="Criar tarefa" />
                    </View>
                </View>

            )}
        </Formik>
    )
}