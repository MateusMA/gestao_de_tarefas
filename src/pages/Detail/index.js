import { View, StyleSheet, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function Detail(transation) {

  const apiHost = process.env.EXPO_PUBLIC_API_HOST;
  const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
  const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

  let idFormat = transation.route.params.id;
  let [dataObj, setData] = useState({});

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

  function updateCheck(id) {

    fetch(apiProtocol + apiHost + apiDoor + '/check', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .catch(() => alert("Falha ao alterar"))

  }

  function CheckBoolean(boolean) {

    if (boolean.check === 0) {
      return (
        <View>
          <Button onPress={() => updateCheck(idFormat)} title="Checar" />
        </View>
      );
    } else if (boolean.check === 1) {
      return (
        <Text>Checado por um administrador: Sim</Text>
      )
    } else {
      return (
        <Text>Erro</Text>
      )
    }

  }

  function statusUpload(id) {

    let now = new Date()
    let dayNow = now.getDate()
    let monthNow = now.getMonth() + 1
    let yearNow = now.getFullYear()

    let status = "Pendente"

    if (dataObj.data_prazo != null) {

      let yearLimit = String(dataObj.data_prazo).split("-")[0]
      let monthLimit = String(dataObj.data_prazo).split("-")[1]
      let dayLimit = String(dataObj.data_prazo).split("-")[2].split("T")[0]

      if (dayNow > dayLimit && monthNow == monthLimit && yearNow == yearLimit || 
        monthNow > monthLimit && yearNow == yearLimit || 
        yearNow > yearLimit) {
        status = "Concluído com atraso"
      } else if (dayNow == dayLimit && monthNow == monthLimit && yearNow == yearLimit) {
        status = "Concluído no prazo"
      } else if (dayNow < dayLimit && monthNow == monthLimit && yearNow == yearLimit || 
        monthNow < monthLimit && yearNow == yearLimit || 
        yearNow < yearLimit) {
        status = "Concluído com antecedência"
      }

    }

    let date_end = yearNow + "-" + monthNow + "-" + dayNow

    fetch(apiProtocol + apiHost + apiDoor + '/setStatus', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        status: status,
        data_fim: date_end
      })
    })
      .then(() => alert("Tarefa Alterada"))
      .catch(() => alert("Falha ao alterar"))

  }

  function EndTask(statusValue) {

    if (statusValue.statusValue == "Pendente") {
      return (
        <Button onPress={() => statusUpload(idFormat)} title='Concluir Tarefa' />
      )
    } else {
      return (
        <Text>Status: {statusValue.statusValue}</Text>
      )
    }

  }

  const navigation = useNavigation()
  let formatDatePrazo = ''
  let formatDateIni = ''
  let formatDateEnd = ''

  if (dataObj.data_prazo != undefined) {

    let yearPrazo = String(dataObj.data_prazo).split("-")[0]
    let monthPrazo = String(dataObj.data_prazo).split("-")[1]
    let dayPrazo = String(dataObj.data_prazo).split("-")[2].split("T")[0]

    formatDatePrazo = dayPrazo + "/" + monthPrazo + "/" + yearPrazo

    let yearIni = String(dataObj.data_ini).split("-")[0]
    let monthIni = String(dataObj.data_ini).split("-")[1]
    let dayIni = String(dataObj.data_ini).split("-")[2].split("T")[0]

    formatDateIni = dayIni + "/" + monthIni + "/" + yearIni
  }

  if(dataObj.data_fim != undefined){
    let yearEnd = String(dataObj.data_fim).split("-")[0]
    let monthEnd = String(dataObj.data_fim).split("-")[1]
    let dayEnd = String(dataObj.data_fim).split("-")[2].split("T")[0]

    formatDateEnd = dayEnd + "/" + monthEnd + "/" + yearEnd

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoria: {dataObj.categoria}</Text>
      <Text>Cliente: {dataObj.cliente}</Text>
      <Text>Data fim: {formatDateEnd}</Text>
      <Text>Data de início: {formatDateIni}</Text>
      <Text>Prazo: {formatDatePrazo}</Text>
      <Text>Descrição {dataObj.descricao}</Text>
      <Text>Local: {dataObj.local}</Text>
      <Text>Nome1: {dataObj.nome}</Text>
      <Text>Nome2: {dataObj.nome2}</Text>
      <Text>Nome3: {dataObj.nome3}</Text>
      <Text>Nome4: {dataObj.nome4}</Text>
      <EndTask statusValue={dataObj.status} />
      <CheckBoolean check={dataObj.boss_check}></CheckBoolean>
      <Button
        onPress={() =>
          navigation.navigate('AlterTask',
            { id: dataObj.id })} title="Alterar">
      </Button>
    </View>
  );
}