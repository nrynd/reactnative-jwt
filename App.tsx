/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './src/code/route/Navigator';
import Colors from './src/code/helpers/constant/Colors';
import { AuthProvider } from './src/code/context/AuthContext';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.white,
    },
};

export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <SafeAreaProvider>
            <AuthProvider >
                <NavigationContainer theme={theme}>
                    <StatusBar backgroundColor={Colors.primary} />
                    <Navigator />
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
