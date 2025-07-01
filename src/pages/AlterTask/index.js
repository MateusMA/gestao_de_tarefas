import { Formik } from 'formik';
import * as React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AlterTask(transation) {

    const apiHost = process.env.EXPO_PUBLIC_API_HOST;
    const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
    const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

    let idFormat = transation.route.params.id;
    let [errors, setError] = React.useState({});
    let [dataObj, setData] = React.useState({});
    const navigation = useNavigation()

    fetch(apiProtocol + apiHost + apiDoor + "/myTask/" + idFormat, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            setData(json[0])
        })
        .catch((error) => console.log(error))

    function submit(values) {

        let yearPrazo = String(values.date_limit).split("/")[2];
        let monthPrazo = String(values.date_limit).split("/")[1];
        let dayPrazo = String(values.date_limit).split("/")[0];

        let yearIni = String(values.date_ini).split("/")[2];
        let monthIni = String(values.date_ini).split("/")[1];
        let dayIni = String(values.date_ini).split("/")[0];

        let formatDataPrazo = yearPrazo + "-" + monthPrazo + "-" + dayPrazo;

        let formatDataIni = yearIni + "-" + monthIni + "-" + dayIni;

        fetch(apiProtocol + apiHost + apiDoor + "/alterTask", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idFormat,
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
                alert(json.message)
            })
            .catch((error) => console.log(error))
    }

    function validationSchema(values) {

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
                    setError({ date_ini: "ERRO: (Ano Bissexto) Fevereiro só tem 28 dias " })
                    return false;
                }
                else
                    if ((leapYear == true) && (day > 29)) {
                        setError({ date_ini: "ERRO: Fevereiro só tem 29 dias " })
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
        submit(values)
        return true;
    }

    function deleteTask(id) {
        fetch(apiProtocol + apiHost + apiDoor + '/del', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(() => alert("Tarefa excluída"))
            .catch(response => console.log(response.error))
    }

    function DelButton() {

        return (
            <Button onPress={() =>
                deleteTask(idFormat)
            } title='Deletar Tarefa' />
        )

    }

    let limitDate = ''
    let iniDate = ''

    if (dataObj.data_prazo != undefined) {

        let yearlimit = String(dataObj.data_prazo).split("-")[0]
        let monthlimit = String(dataObj.data_prazo).split("-")[1]
        let daylimit = String(dataObj.data_prazo).split("-")[2].split("T")[0]

        limitDate = daylimit + "/" + monthlimit + "/" + yearlimit

        let yearIni = String(dataObj.data_ini).split("-")[0]
        let monthIni = String(dataObj.data_ini).split("-")[1]
        let dayIni = String(dataObj.data_ini).split("-")[2].split("T")[0]

        iniDate = dayIni + "/" + monthIni + "/" + yearIni

    }

    return (
        <View>
            <Formik initialValues={{
                categoria: '', description: '', date_ini: '', date_limit: '',
                name1: '', name2: '', name3: '', name4: '', client: '',
                location: ''
            }}
                onSubmit={values => validationSchema(values)}>
                {({ handleBlur, handleChange, handleSubmit, values }) => (
                    <View style={styles.form}>

                        <Text style={styles.title}>Alterar</Text>

                        <TextInput
                            onChangeText={handleChange('categoria')}
                            onBlur={handleBlur('categoria')}
                            value={values.categoria}
                            style={styles.txtInput}
                            placeholder={dataObj.categoria} />

                        <TextInput
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            style={styles.inputDesc}
                            placeholder={dataObj.descricao}
                            maxLength={255}
                            multiline={true} />

                        <TextInput
                            onChangeText={handleChange('name1')}
                            onBlur={handleBlur('name1')}
                            value={values.name1}
                            style={styles.txtInput}
                            placeholder={dataObj.nome} />

                        <TextInput
                            onChangeText={handleChange('name2')}
                            onBlur={handleBlur('name2')}
                            value={values.name2}
                            style={styles.inputNames}
                            placeholder={dataObj.nome2} />

                        <TextInput
                            onChangeText={handleChange('name3')}
                            onBlur={handleBlur('name3')}
                            value={values.name3}
                            style={styles.inputNames}
                            placeholder={dataObj.nome3} />

                        <TextInput
                            onChangeText={handleChange('name4')}
                            onBlur={handleBlur('name4')}
                            value={values.name4}
                            style={styles.inputNames}
                            placeholder={dataObj.nome4} />

                        <View style={styles.dateBox}>
                            <Text aria-label='date_ini' nativeID='iniLabel'
                                style={styles.txtLabel}>
                                Data de início:</Text>
                            <TextInput
                                onChangeText={handleChange('date_ini')}
                                onBlur={handleBlur('date_ini')}
                                value={values.date_ini}
                                style={styles.inputDate}
                                placeholder={iniDate} />
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
                                placeholder={limitDate} />
                            {errors.date_limit && <Text style={styles.txtError}>{errors.date_limit}</Text>}
                        </View>

                        <TextInput
                            onChangeText={handleChange('client')}
                            onBlur={handleBlur('client')}
                            value={values.client}
                            style={styles.txtInput}
                            placeholder={dataObj.cliente} />

                        <TextInput
                            onChangeText={handleChange('local')}
                            onBlur={handleBlur('local')}
                            value={values.local}
                            style={styles.txtInput}
                            placeholder={dataObj.local} />
                        <View>
                            <Button onPress={handleSubmit} title="Alterar tarefa" />
                        </View>
                        <View style={styles.btnDel}>
                            <DelButton />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}