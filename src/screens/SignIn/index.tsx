import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button'
import Input from '../../components/Input'

import {
  Container,
  Title,
} from './styles'

export default function SignIn() {
  const { signIn } = useAuth();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='position' enabled>
          <Title>Acessar conta</Title>
          <Input
            icon="user"
            value={login}
            onChangeText={value => setLogin(value.replace(/\s/g, ''))}
            placeholder={"Login"}
          />
          <Input
            icon="lock"
            value={password}
            placeholder="Senha"
            type="password"
            onChangeText={value => setPassword(value.replace(/\s/g, ''))}
            secureTextEntry={secureText}
            isVisible={secureText}
            setVisible={setSecureText}
          />
          <View style={{ marginTop: 16 }}>
            <Button
              onPress={() => signIn(login, password).catch((error) => {
                Alert.alert(error.message, 'Tente novamente')
              })}
              title="Entrar"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}

