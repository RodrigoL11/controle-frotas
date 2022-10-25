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
  oldOdometer: number;
  onPress: Dispatch<SetStateAction<number>>,
}

export default function CreateTravel({ toogleModal, oldOdometer, onPress }: Props) {
  const [odometer, setOdometer] = useState<number>(0);
  const [destiny, setDestiny] = useState<string>("Pitangueiras");
  const [reason, setReason] = useState<string>("");
  const [ref, setRef] = useState<FlashMessage>();

  const handleSubmit = () => {
    if (!ref) return null;

    if (odometer < oldOdometer) {
      ref.showMessage({
        message: "Hodômetro atual não pode ser maior que o antigo!",
        type: "danger",
      })
    } else {
      onPress(odometer)
      toogleModal();
    }
  }

  return (
    <Container>
      <Background onPress={toogleModal} activeOpacity={1} />
      <Card>
        <Title>Finalizar viagem</Title>
        <Row>
          <Column size={45}>
            <Label>Hodômetro antigo</Label>
            <Input
              value={oldOdometer.toString()}
              editable={false}
            />
          </Column>
          <Column size={45}>
            <Label>Hodômetro atual</Label>
            <Input
              value={odometer}
              onChangeText={(value: any) => {
                setOdometer(Number(value))
              }}
              keyboardType="numeric"
            />
          </Column>
        </Row>

        <Button
          onPress={handleSubmit}
          title="Salvar"
        />
      </Card>
      <FlashMessage ref={(ref: FlashMessage) => setRef(ref)} />
    </Container>
  )
}
