import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

export default function Routes() {

    let auth = useSelector((state) => state.authSlice.value)

    return (
        <NavigationContainer>
            {auth ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}


