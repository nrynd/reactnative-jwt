import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../helpers';

const DetailsScreen = ({ route }: any) => {
    const { item } = route.params;
    const { avatar, email, first_name, last_name } = item;

    return (
        <View style={[styles._container]}>
            <View style={[styles._section]}>
                <Image source={{ uri: avatar }} style={[styles._ava]} />
                <View style={[styles._padtext]}>
                    <Text style={[styles._name]}>{first_name + " " + last_name}</Text>
                    <Text style={[styles._mail]}>{email}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    _section: {
        paddingVertical: 30,
    },
    _ava: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    _padtext: {
        alignItems: 'center',
        padding: 20,
    },
    _name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    _mail: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: '500',
        color: COLORS.darkGray,
    },
});

export default DetailsScreen;
