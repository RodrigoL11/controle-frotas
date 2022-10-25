import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth'
import { DocumentReference } from 'firebase/firestore';

export interface AuthData {
    id: string,
    login: string,
    name: string,
    refCurrentVehicle: DocumentReference,
    refCurrentTravel: DocumentReference
}

interface AuthContextData {
    authData?: AuthData;
    signIn: (login: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;    
    loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData)
;

interface Props{
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(loadFromStorage, 500)
    }, [])

    async function loadFromStorage(){
        const auth = await AsyncStorage.getItem("@AuthData");
        if(auth) setAuth(JSON.parse(auth) as AuthData);
        setLoading(false)
    }

    async function signIn(login: string, password: string){
        const auth = await authService.signIn(login, password);
        setAuth(auth);
        AsyncStorage.setItem("@AuthData", JSON.stringify(auth));
    }   
        
    async function signOut(){
        setAuth(undefined);
        AsyncStorage.removeItem("@AuthData");
    }

    return (
        <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const ctx = useContext(AuthContext);
    
    return ctx;
}
