/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconM from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailsScreen from '../screens/DetailScreen/DetailScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { useAuth } from '../context/AuthContext';
import Colors from '../helpers/constant/Colors';
import RegisterScreen from '../screens/LoginScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { authState, onLogout } = useAuth();

    const conifrmLogout = () => {
        Alert.alert('Sign Out', 'Are you sure you would like to sign out of your account?', [
            {
                text: 'Cancle',
            },
            {
                text: 'Sign Out',
                onPress: onLogout,
            },
        ]);
    };

    return (
        <Stack.Navigator>
            {authState?.authenticated ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: 'List of Users',
                            headerRight: () => {
                                return (
                                    <TouchableOpacity onPress={conifrmLogout}>
                                        <IconM name="logout" color={Colors.red} style={{ fontSize: 25 }} />
                                    </TouchableOpacity>
                                );
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={{
                            title: 'User Detail',
                            headerTitleAlign: 'center',
                        }}
                    />
                </>

            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default Navigator;
