import React from 'react';
import { Ionicons } from '@expo/vector-icons'

import {
  Container, 
  Text, 
  Name, 
  Row, 
  Title,
  Icon
} from './styles'
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface Props{
  name: string
}



const daysOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

const pad = (val: number) => {
  return val < 10 ? `0${val}` : val
}

const formatDate = (date: Date) => {
  return `${daysOfWeek[date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth())}/${date.getFullYear()}`
}

export default function Header() {
  const currentDate = new Date();
  const { signOut, authData } = useAuth();

  const SignOut = () => {
    Alert.alert("Adeus", "Deseja realmente sair da conta?", [
      {
        text: "Sim",
        onPress: () => signOut(),
      },
      {
        text: "Cancelar",
        onPress: () => null,
      },
    ]);

    return true;
  };

  return(
    <Container>
      <Icon activeOpacity={0.7} onPress={SignOut}>
        <Ionicons name="chevron-back-outline" color="#b4b4b4" size={36}/>
      </Icon>
      <Text>FROTA SMAS</Text>
      <Row>
        <Title>Bem-vindo, </Title>
        <Name>{authData?.name.split(' ')[0]}!</Name>
      </Row>
      <Text>{formatDate(currentDate)}</Text>
    </Container>
  )
}