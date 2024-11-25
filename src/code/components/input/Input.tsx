import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../helpers';
import IconA from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';

type props = {
    field: string,
    placeholder: string,
    placeholderTextColor: string,
    iconName: string,
    righticon: boolean,
    secureTextEnty: boolean,
    onChange: (field: string, val: any) => void,
    value: string,
    handleshowPassword?: () => void,
}
const Input: React.FC<props> = ({
    field,
    placeholder,
    placeholderTextColor,
    iconName,
    righticon,
    secureTextEnty,
    onChange,
    value,
    handleshowPassword,
}) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View style={focused ? [styles._input, styles._focus] : [styles._input]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconA name={iconName} style={[styles._icon]} />
                <TextInput
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={(val) => {
                        onChange(field, val);
                    }}
                    value={value}
                    secureTextEntry={secureTextEnty}
                    style={[styles._base]}
                />
            </View>

            {righticon && (
                <TouchableOpacity onPress={handleshowPassword}>
                    {secureTextEnty ?
                        <IconI name="eye-off-outline" style={[styles._icon]} /> :
                        <IconI name="eye-outline" style={[styles._icon]} />
                    }
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    _input: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 15, marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    _icon: {
        fontSize: 18, color: COLORS.primary,
    },
    _base: {
        paddingHorizontal: 10,
    },
    _focus: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        shadowOffset: { width: 4, height: 10 },
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
    },
});

export default Input;

