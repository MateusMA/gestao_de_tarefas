import React from 'react';
import { View, StyleSheet, Button, RefreshControl, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import UserCard from '../../components/UserCard';
import { initData, setData, voidData } from '../../contexts/dataSlice';

const styles = StyleSheet.create({
  btnAgenda: {
    width: '50%',
    padding: 20
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 40
  }
});

function ReadyAgenda() {

  const apiHost = process.env.EXPO_PUBLIC_API_HOST;
  const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL;
  const apiDoor = process.env.EXPO_PUBLIC_API_DOOR;

  const dispatch = useDispatch()

  function checkOut() {

    dispatch(voidData())

    let name = 'josé'

    fetch(apiProtocol + apiHost + apiDoor + "/myAgenda/" + name, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((json) => {
        dataObj = json
        dispatch(voidData())
        if (dataObj.error != 'Nenhuma tarefa foi atribuida a você') {
          dispatch(setData(dataObj))
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <View style={styles.btnAgenda}>
      <Button
        title='consultar Minha Agenda'
        color='#000'
        onPress={() => checkOut()}
      />
    </View>
  );
};

export default function Home() {

  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch()

  const onRefresh = React.useCallback(() => {
    dispatch(initData())
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.btnContainer}>
            <ReadyAgenda />
            <Text>Bem Vindo: Luiz</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.cardConteiner}>
          <UserCard />
        </View>
      </ScrollView>
    </>
  );
}


