import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_URL, TOKEN_KEY } from '../helpers';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null,
    }>({
        token: null,
        authenticated: null,
    });

    const register = async (username: string, email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/register`, { username, email, password });
        } catch (error) {
            return { error: true, msg: (error as any).response.data.error };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, { email, password });

            setAuthState({
                token: result.data.token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await EncryptedStorage.setItem(TOKEN_KEY, result.data.token);

            return result;


        } catch (error) {
            return { error: true, msg: (error as any).response.data.error };
        }
    };

    const logout = async () => {
        await axios.post(`${API_URL}/logout`);

        await EncryptedStorage.removeItem(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
        });

    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
