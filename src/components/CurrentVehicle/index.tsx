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
  DateLabel,
  DisassociateButton,
  Empty,
  HistoryLabel,
  PlateNumber,
  Row,
  SubTitle,
  Title
} from './styles'

import { useAuth } from '../../hooks/auth';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { ITravel, IVehicle } from '../../interfaces/main';
import { Modal } from 'react-native';
import Vehicles from '../Vehicles';
import { db } from '../../config/Firebase';
import { toDateTime } from '../../utils/date';
import { showMessage } from 'react-native-flash-message';

export default function CurrentVehicle() {
  const [currentVehicle, setCurrentVehicle] = useState<IVehicle>();
  const [currentTravel, setCurrentTravel] = useState<ITravel>();
  const [show, setShow] = useState(false);
  const { authData } = useAuth();

  const toogleModal = () => {
    setShow(!show);
  }

  const loadData = async () => {
    if (!authData) return null;
    
    try {
      const vehicle = await getDoc(authData.refCurrentVehicle);
      const travel = await getDoc(authData.refCurrentTravel);
      
      if(!vehicle.data()) return null;
      if(!travel.data()) return null;

      setCurrentVehicle(
        {   
          ...vehicle.data() as IVehicle,
          id: vehicle.id
        }
      )    
      
      console.log(travel.data(), vehicle.data())

      setCurrentTravel(
        {
          ...travel.data() as ITravel,
          id: travel.id
        }
      )
    } catch (error) { }
  }

  const disassociateVehicle = async () => {
    if(!currentVehicle || !authData || !currentTravel) return null;

    try{
      await updateDoc(doc(db, "Vehicles", currentVehicle.id), {
        refUser: "",
      });

      await updateDoc(doc(db, "Users", authData.id), {
        refCurrentVehicle: "",
        refCurrentTravel: "",
      });

      await updateDoc(doc(db, "Travels", currentTravel.id), {        
        finalized_at: Timestamp.now(),
        odometer_end: 100,
      })

      setCurrentVehicle(undefined);
      setCurrentTravel(undefined);
      showMessage({
        message: "Veículo desassociado com sucesso",
        type: "success",
      })
    } catch (error) { console.error(error) }
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
          {currentVehicle && currentTravel
            ? <Column>
              <CardTitle>{currentVehicle.name}</CardTitle>
              <PlateNumber>{currentVehicle.plate_number}</PlateNumber>
              <Row>
              <DateLabel>Desde: </DateLabel>
              <DateLabel>{toDateTime(currentTravel.created_at.seconds)}</DateLabel>
              </Row>
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
          <DisassociateButton onPress={disassociateVehicle}>
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
        <Vehicles 
        toogleModal={toogleModal} 
        vehicleID={currentVehicle ? currentVehicle.id : ""}
        travelID={currentTravel ? currentTravel.id : ""} 
        setCurrentVehicle={setCurrentVehicle} 
        setCurrentTravel={setCurrentTravel}
        />
      </Modal>
    </Container>
  )
}