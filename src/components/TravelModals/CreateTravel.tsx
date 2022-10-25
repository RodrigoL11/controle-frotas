import React, { Dispatch, SetStateAction, useState } from 'react'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Button from '../Button';

import {
  Container,
  Background,
  Card,
  Title,
  Label,
  Row,
  Column,
  Input,
} from './styles'

interface Props {
  toogleModal: () => void;
  _setDestiny: Dispatch<SetStateAction<string>>;
  _setReason: Dispatch<SetStateAction<string>>;
}

export default function CreateTravel({ toogleModal, _setDestiny, _setReason  }: Props) {
  const [destiny, setDestiny] = useState<string>("Pitangueiras");
  const [reason, setReason] = useState<string>("");
  const [ref, setRef] = useState<FlashMessage>();

  const handleSubmit = () => {
    if (!ref) return null;

    if (destiny === '') {
      ref.showMessage({
        message: "Por favor, insira o destino(s) da viagem",
        type: "danger",
      })
    } else if (reason === '') {
      ref.showMessage({
        message: "Por favor, insira o motivo da viagem",
        type: "danger",
      })
    } else{
      _setDestiny(destiny);
      _setReason(reason);
      toogleModal();
    }
  }

  return (
    <Container>
      <Background onPress={toogleModal} activeOpacity={1} />
      <Card>
        <Title>Criar viagem</Title>
        <Column>
          <Label>Destino</Label>
          <Input
            value={destiny}
            onChangeText={setDestiny}
          />
        </Column>
        <Column>
          <Label>Motivo</Label>
          <Input
            value={reason}
            onChangeText={setReason}
            maxLength={230}
            multiline={true}
            numberOfLines={5}
            style={{minHeight: 120, maxHeight: 120, textAlignVertical: 'top', borderWidth: 1, padding: 7}}
          />
        </Column>
        <Button
          onPress={handleSubmit}
          title="Criar"
        />
      </Card>
      <FlashMessage ref={(ref: FlashMessage) => setRef(ref)} />
    </Container>
  )
}
