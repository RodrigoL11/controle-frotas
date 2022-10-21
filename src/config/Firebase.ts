import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgwABbggEaXiBejXNzZL5Aih0Cx4OBmNE",
  authDomain: "controle-frota-82e36.firebaseapp.com",
  projectId: "controle-frota-82e36",
  storageBucket: "controle-frota-82e36.appspot.com",
  messagingSenderId: "45057872023",
  appId: "1:45057872023:web:d75934d9cafae6b68119d2",
  measurementId: "G-2T8V359XSD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);