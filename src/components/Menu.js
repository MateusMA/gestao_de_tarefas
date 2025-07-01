import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import Home from '../pages/Home';
import RegisterScreen from '../pages/Register';
import Create from '../pages/Create';
import Detail from '../pages/Detail';
import AlterTask from '../pages/AlterTask';
// import Header from '../components/Header'
import Reports from '../pages/Reports'

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MenuDrawer() {

  async function a() {
    const data = await AsyncStorage.getItem('dataLogin');
    console.log(JSON.parse(data))
  }

  const accessLevel = useSelector((state) => state.accessLevelSlice.value)

  console.log(accessLevel)

  if (accessLevel == 1) {
    return (
      <Drawer.Navigator initialRouteName='App'
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: '100%',
            overlayColor: 'white'
          },
        }}
      >
        <Drawer.Screen
          name=' '
          component={Home}
          options={{ drawerLabel: 'Home' }}
        />
        <Drawer.Screen
          name='Criar Tarefa'
          component={Logo}
        />
        <Drawer.Screen
          name='Relatórios'
          component={Reports}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }} />
      </Drawer.Navigator>
    );
  } else if(accessLevel == 0){
    return (
      <Drawer.Navigator initialRouteName='App'
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: '100%',
            overlayColor: 'white'
          },
        }}
      >
        <Drawer.Screen
          name=' '
          component={Home}
          options={{ drawerLabel: 'Home' }}
        />
        <Drawer.Screen
          name='Cadastrar'
          component={RegisterScreen}
        />
        <Drawer.Screen
          name='Criar Tarefa'
          component={Create}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }} />
          <Stack.Screen
          name="AlterTask"
          component={AlterTask}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }} />
          <Drawer.Screen
          name='Relatórios'
          component={Reports}
        />
          {/* <Stack.Screen
          name="Header"
          component={Header}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }} /> */}
      </Drawer.Navigator>
    );
  }
}

export default function Menu() {
  return (
    <NavigationContainer independent='true'>
      <MenuDrawer />
    </NavigationContainer>
  )
}