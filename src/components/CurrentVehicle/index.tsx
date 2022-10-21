import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import {
  AssociateButton,
  Bar,
  ButtonTitle,
  Card,
  CardTitle,
  ChangeButton,
  CheckContainer,
  Column,
  Container,
  DisassociateButton,
  Empty,
  HistoryLabel,
  PlateNumber,
  Row,
  SubTitle,
  Title
} from './styles'
import { useAuth } from '../../hooks/auth';
import { getDoc } from 'firebase/firestore';
import { IVehicle } from '../../interfaces/main';
import { Modal } from 'react-native';
import Vehicles from '../Vehicles';

export default function CurrentVehicle() {
  const [currentVehicle, setCurrentVehicle] = useState<IVehicle>();
  const [show, setShow] = useState(false);
  const { authData } = useAuth();

  const toogleModal = () => {
    setShow(!show);
  }

  const loadData = async () => {
    if (!authData?.refCurrentVehicle) return null;

    try {
      const doc = await getDoc(authData.refCurrentVehicle);
      setCurrentVehicle(doc.data() as IVehicle)
    } catch (error) { }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Title>Associação de veículo</Title>
      <SubTitle>Mantenha atualizado abaixo o veículo{'\n'}que você está utilizando</SubTitle>
      <Card>
        <Row>
          <Ionicons name="md-car-sport-outline" size={42} color="#b4b4b4" />
          {currentVehicle
            ? <Column>
              <CardTitle>{currentVehicle.name}</CardTitle>
              <PlateNumber>{currentVehicle.plate_number}</PlateNumber>
            </Column>
            : <Empty>Não está associado a nenhum carro</Empty>
          }
        </Row>
        <CheckContainer hasVehicle={currentVehicle}>
          <Ionicons name={currentVehicle ? "checkmark" : "close"} size={21} color="#fff" />
        </CheckContainer>
      </Card>
      {currentVehicle
        ? <Row>
          <ChangeButton onPress={toogleModal}>
            <Feather name="refresh-ccw" size={24} color="#fff" />
            <ButtonTitle>Trocar de veículo</ButtonTitle>
          </ChangeButton>
          <DisassociateButton onPress={toogleModal}>
            <ButtonTitle>Desassociar</ButtonTitle>
          </DisassociateButton>
        </Row>
        : <AssociateButton onPress={toogleModal}>
          <ButtonTitle>Associar-se a um veículo</ButtonTitle>
        </AssociateButton>
      }
      <Bar />
      <Row style={{ paddingLeft: 15 }}>
        <Feather name="clock" size={42} color="#b4b4b4" />
        <HistoryLabel>Ver histórico</HistoryLabel>
      </Row>
      <Modal
        visible={show}
        onRequestClose={toogleModal}
        statusBarTranslucent={true}
      >
        <Vehicles toogleModal={toogleModal} />
      </Modal>
    </Container>
  )
}