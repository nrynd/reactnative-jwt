import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_URL, COLORS } from '../../helpers';

type itemdata = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
}

type ItemProps = {
    item: itemdata;
    onPress: () => void;
};

const Item = ({ item, onPress }: ItemProps) => (
    <TouchableWithoutFeedback onPress={onPress} style={[]}>
        <View style={[styles.card, styles.shadowProp]}>
            <View style={{ width: 100, height: 100 }}>
                <Image source={{ uri: item.avatar }} style={[styles._img]} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.title]}>{item.first_name + ' ' + item.last_name}</Text>
                <Text style={[styles.subtitle]}>{item.email}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

const Home = ({ navigation }: any) => {
    const [users, setUsers] = useState<itemdata[]>();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const result = await axios.get(`${API_URL}/users`);
                setUsers(result.data.data);
            } catch (error: any) {
                Alert.alert('', error.message);
            }
        };

        getUsers();
    }, []);

    const renderItem = ({ item }: { item: itemdata }) => {
        return (
            <Item item={item} onPress={() => navigation.navigate('Details', { item })} />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
        backgroundColor: COLORS.lightGray,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.primary,

    },
    card: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    shadowProp: {

        elevation: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    _img: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});

export default Home;
