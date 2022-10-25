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
  Title,
  TravelLabel
} from './styles'

import { useAuth } from '../../hooks/auth';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { ITravel, IVehicle } from '../../interfaces/main';
import { KeyboardAvoidingView, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Vehicles from '../Vehicles';
import { db } from '../../config/Firebase';
import { toDateTime } from '../../utils/date';
import { showMessage } from 'react-native-flash-message';
import CreateTravel from '../TravelModals/CreateTravel';
import EndTravel from '../TravelModals/EndTravel';
import { useNavigation } from '@react-navigation/native';

export default function CurrentVehicle() {
  const [currentVehicle, setCurrentVehicle] = useState<IVehicle>();
  const [currentTravel, setCurrentTravel] = useState<ITravel>();
  const [odometer, setOdometer] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");

  const { authData } = useAuth();
  const navigation = useNavigation();

  const loadData = async () => {
    if (!authData) return null;

    try {
      const vehicle = await getDoc(authData.refCurrentVehicle);
      const travel = await getDoc(authData.refCurrentTravel);

      if (!vehicle.data()) return null;
      if (!travel.data()) return null;

      setCurrentVehicle(
        {
          ...vehicle.data() as IVehicle,
          id: vehicle.id
        }
      )

      setCurrentTravel(
        {
          ...travel.data() as ITravel,
          id: travel.id
        }
      )
    } catch (error) { }
  }

  const disassociateVehicle = async () => {
    if (!currentVehicle || !authData || !currentTravel || odometer <= 0) return null;

    try {
      await updateDoc(doc(db, "Vehicles", currentVehicle.id), {
        refUser: "",
        odometer: odometer
      });

      await updateDoc(doc(db, "Users", authData.id), {
        refCurrentVehicle: "",
        refCurrentTravel: "",
      });

      await updateDoc(doc(db, "Travels", currentTravel.id), {
        finalized_at: Timestamp.now(),
        odometer_end: odometer,
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
    disassociateVehicle();
    setOdometer(0);
  }, [odometer])


  const toogleModal = (type?: string) => {
    setType(type || "");
    setShow(!show);
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
              <TravelLabel>Destino: {currentTravel.destiny || "Pitangueiras"}</TravelLabel>
              <DateLabel>Desde: {toDateTime(currentTravel.created_at.seconds)}</DateLabel>
            </Column>
            : <Empty>Não está associado a nenhum carro</Empty>
          }
        </Row>
        <CheckContainer hasVehicle={currentVehicle}>
          <Ionicons name={currentVehicle ? "checkmark" : "close"} size={21} color="#fff" />
        </CheckContainer>
      </Card>
      {currentVehicle
        ?
        <DisassociateButton onPress={() => toogleModal("desassociate")}>
          <ButtonTitle>Desassociar</ButtonTitle>
        </DisassociateButton>

        : <AssociateButton onPress={toogleModal}>
          <ButtonTitle>Associar-se a um veículo</ButtonTitle>
        </AssociateButton>
      }
      <Bar />
      <TouchableOpacity onPress={() => {
        if (!authData) return;
        navigation.navigate("Historic", {id: authData.id})
        }}>
        <Row style={{ paddingLeft: 15 }}>
          <Feather name="clock" size={42} color="#b4b4b4" />
          <HistoryLabel>Ver histórico</HistoryLabel>
        </Row>
      </TouchableOpacity>
      <Modal
        visible={show}
        onRequestClose={() => toogleModal()}
        statusBarTranslucent={true}
        transparent={true}
      >
        {
          type === 'desassociate' && currentTravel
            ?
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <EndTravel
                onPress={setOdometer}
                toogleModal={toogleModal}
                oldOdometer={currentTravel.odometer_start}
              />
            </KeyboardAvoidingView>
            : <Vehicles
              toogleModal={toogleModal}
              vehicleID={currentVehicle ? currentVehicle.id : ""}
              oldOdometer={currentTravel ? currentTravel.odometer_start : 0}
              travelID={currentTravel ? currentTravel.id : ""}
              setCurrentVehicle={setCurrentVehicle}
              setCurrentTravel={setCurrentTravel}
            />
        }

      </Modal>
    </Container>
  )
}