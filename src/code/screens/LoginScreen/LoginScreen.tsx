import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components';
import { COLORS } from '../../helpers';

type User = {
    email: string,
    password: string,
    username: string,
}

// email: 'eve.holt@reqres.in',
// password: 'cityslicka',

const LoginScreen = ({ navigation }: any) => {
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        username: '',
    });

    const [secure, setSecure] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { onLogin } = useAuth();

    const login = async () => {
        if (user.email === '' || user.password === '') {
            Alert.alert('Warning!', 'Please fill in all the data first ');
            return;
        }

        setIsLoading(true);

        const result = await onLogin!(user.email, user.password);
        setIsLoading(false);

        if (result && result.error) {
            setIsLoading(false);

            Alert.alert('Login Failed!', result.msg);
        }
    };

    const handleInput = (field: string, val: string) => {
        setUser(prev => { return { ...prev, [field]: val }; });
    };

    return (
        <ScrollView style={{ paddingHorizontal: 20 }}>
            <View style={[styles._wrapper]}>
                <View style={{ padding: 10 }}>
                    <Image
                        source={require('../../../assets/welcome.jpg')}
                        style={[styles._img]}
                        resizeMethod="resize"
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View style={{ paddingBottom: 20 }}>
                <Text style={[styles._title]}>Login</Text>
                <Text style={[styles._subtitle]}>Please Sign in to continue</Text>
            </View>


            <Input
                field="email"
                placeholder="Email"
                onChange={handleInput}
                value={user.email}
                placeholderTextColor={COLORS.primary}
                iconName="mail"
                righticon={false}
                secureTextEnty={false}
            />

            <Input
                field="password"
                placeholder="Password"
                onChange={handleInput}
                value={user.password}
                placeholderTextColor={COLORS.primary}
                iconName="lock1"
                righticon={true}
                secureTextEnty={secure}
                handleshowPassword={() => setSecure(!secure)}
            />

            <TouchableOpacity disabled={isLoading} onPress={login} style={[styles._btn]}>
                {isLoading ? (
                    <ActivityIndicator color={COLORS.white} size={'large'} />
                ) : (
                    <Text style={{ fontWeight: '500', color: COLORS.white }}>Sign In</Text>
                )}
            </TouchableOpacity>

            <View style={[styles._note]}>
                <Text style={{ color: COLORS.primary, alignItems: 'center' }}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    _wrapper: {
        margin: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _input: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 15, marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    _btn: {
        height: 50,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    _img: {
        width: 200,
        height: 200,
    },
    _title: {
        fontSize: 30,
        fontWeight: '600',
        color: COLORS.primary,
    },
    _subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.primary,
    },
    _note: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default LoginScreen;
