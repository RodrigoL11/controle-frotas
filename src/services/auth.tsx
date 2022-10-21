import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { AuthData } from '../hooks/auth'
import { IUser } from '../interfaces/main'

async function signIn(login: string, password: string): Promise<AuthData> {
    const users: IUser[] = [];

    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
        users.push({
            ...doc.data() as IUser,
            id: doc.id
        });
    })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((element: IUser) => element.login.trim().toLowerCase() === login.trim().toLowerCase());
            
            if (!user) return reject(new Error("User not found"));
                
            if (user.password === password.trim()) {
                resolve({
                    id: user.id,                    
                    login: user.login,
                    name: user.name, 
                    refCurrentVehicle: user.refCurrentVehicle,                   
                })
            } else {
                reject(new Error('Credenciais Inválidas'));
            }
        }, 500);
    });
}

export const authService = {
    signIn,
};