import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Header from "./components/Header";

const Stack = createStackNavigator();

export default function AppStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Header"
                    component={Header}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
    )
}