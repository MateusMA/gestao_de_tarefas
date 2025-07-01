import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../contexts/dataSlice';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    cardUser: {
        width: '100%',
        backgroundColor: '#fff'
    },
    cardConteiner: {
        width: '48%',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '1%'
    },
    cardtitle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20
    },
    cardImage: {
        width: 38,
        height: 38,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    cardGroup: {
        color: '#555666'
    },
    groupContainer: {
        marginBottom: 20,
        width: '100%'
    },
    cardButton: {
        alignSelf: 'center',
    },
    cardData: {
        textAlign: 'center',
        fontSize: 11
    },
    cardStatus: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold'
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    txtAlert: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
    }
});

export default function UserCard() {

    const apiHost = process.env.EXPO_PUBLIC_API_HOST
    const apiProtocol = process.env.EXPO_PUBLIC_API_PROTOCOL
    const apiDoor = process.env.EXPO_PUBLIC_API_DOOR

    let data = useSelector((state) => state.dataSlice.value)
    const dispatch = useDispatch()

    function CardRender(data) {

        const navigation = useNavigation()

        if (data.data.data_prazo != null) {

            let year = String(data.data.data_prazo).split("-")[0]
            let month = String(data.data.data_prazo).split("-")[1]
            let day = String(data.data.data_prazo).split("-")[2].split("T")[0]

            let formatDate = day + "/" + month + "/" + year

            return (
                <View style={styles.cardConteiner}>
                    <Card style={styles.cardUser}>
                        <Image
                            source={require('../assets/group.jpg')}
                            style={styles.cardImage}
                        />
                        <Card.Content>
                            <Text style={styles.cardtitle} variant="titleLarge" >{data.data.categoria}</Text>
                            <View style={styles.groupContainer}>
                                <Text variant="bodyMedium" style={styles.cardGroup} >{data.data.nome}</Text>
                                <Text variant="bodyMedium" style={styles.cardGroup} >{data.data.nome2}</Text>
                                <Text variant="bodyMedium" style={styles.cardGroup} >{data.data.nome3}</Text>
                                <Text variant="bodyMedium" style={styles.cardGroup} >{data.data.nome4}</Text>
                            </View>
                            <Text style={styles.cardStatus}>
                                {data.data.status}
                            </Text>
                            <Text style={styles.cardData}>
                                Prazo: {formatDate}
                            </Text>
                        </Card.Content>
                        <Card.Actions style={styles.cardButton}>
                            <Button
                                onPress={() =>
                                    navigation.navigate('Detail',
                                        { id: data.data.id })}>
                                Visualizar
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
            );
        } else {
            return (<Text style={styles.txtAlert}>Nenhuma tarefa encontrada</Text>)
        }
    }
    
    if (data[0] != undefined) {
        if (data[0].trigger == "none") {
            fetch(apiProtocol + apiHost + apiDoor + '/adminTarefas', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    dispatch(setData(json))
                })
                .catch(() => alert("Falha ao conectar"))
        }
    }

    return (
        <View style={styles.container}>
            {data.map(data => <CardRender data={data} key={data.id} />)}
        </View>
    );

}