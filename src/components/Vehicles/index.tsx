import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { ITravel, IUser, IVehicle } from '../../interfaces/main';
import { Ionicons } from '@expo/vector-icons'
import Button from '../Button/'

import {
  Card,
  Container,
  Icon,
  Name,
  PlateNumber,
  Title,
  Status,
  Column,
  SelectContainer
} from './styles'
import { useAuth } from '../../hooks/auth';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAvoidingView, Modal } from 'react-native';
import CreateTravel from '../TravelModals/CreateTravel';

interface VehicleProps {
  vehicle: IVehicle,
  isSelected: boolean,
  onPress: () => void,
  currentVehicleID: string,
}

const Vehicle = ({ vehicle, isSelected, onPress, currentVehicleID }: VehicleProps) => {
  const isDisabled = (vehicle.status !== "Carro disponível") && (vehicle.id !== currentVehicleID);

  return (
    <Card onPress={onPress} disabled={isDisabled} isDisabled={isDisabled}>
      <Column size={34}>
        <Name>{vehicle.name}</Name>
        <PlateNumber>{vehicle.plate_number}</PlateNumber>
      </Column>
      <Column size={40}>
        <Status numberOfLines={2}>{vehicle.status}</Status>
      </Column>
      <SelectContainer>
        {isSelected && !isDisabled &&
          <Ionicons name={"checkmark"} color="#fff" size={18} />
        }
        {
          isDisabled &&
          <Ionicons name={"close"} color="#fff" size={20} />
        }
      </SelectContainer>
      <Ionicons />
    </Card>
  )
}

interface Props {
  toogleModal: () => void,
  vehicleID: string,
  travelID: string,
  setCurrentVehicle: Dispatch<SetStateAction<IVehicle | undefined>>,
  setCurrentTravel: Dispatch<SetStateAction<ITravel | undefined>>,
  oldOdometer: number
}

export default function Vehicles({ toogleModal, vehicleID, travelID, oldOdometer, setCurrentVehicle, setCurrentTravel }: Props) {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selected, setSelected] = useState(vehicleID);
  const [odometer, setOdometer] = useState<number>(0);
  const [destiny, setDestiny] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [show, setShow] = useState<boolean>(false)

  const { authData } = useAuth()

  const checkStatus = async (vehicle: IVehicle) => {
    let status = ""

    try {
      const doc = await getDoc(vehicle.refUser);
      const user = doc.data() as IUser;
      status = `Em uso por ${user.name}`
    } catch (error) {
      status = "Carro disponível"
    } finally {
      return status;
    }
  }

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, "Vehicles"));
    querySnapshot.forEach(async (doc) => {
      const data = doc.data() as IVehicle;
      const status = await checkStatus(data);

      setVehicles(arr => [
        ...arr,
        {
          ...data,
          id: doc.id,
          status: status,
        }
      ])
    })
  }

  useEffect(() => {
    vehicles.length == 0 ? loadData() : null;
  }, [])

  const handleSubmit = async () => {
    if (!authData || !destiny || !reason) return null;

    try {
      let refVehicle = doc(db, "Vehicles", selected);
      let refUser = doc(db, "Users", authData.id);

      const _doc = await getDoc(refVehicle);
      const vehicle = _doc.data() as IVehicle;
      let _travelID = '';

      const travelData = {
        created_at: Timestamp.now(),
        odometer_start: vehicle.odometer,
        refUser: refUser,
        refVehicle: refVehicle,
        destiny: destiny.trim(),
        reason: reason.trim(),
      }

      await addDoc(collection(db, "Travels"), travelData).then((response) => {
        _travelID = response.id
      })

      await updateDoc(refVehicle, {
        refUser: refUser
      });

      await updateDoc(refUser, {
        refCurrentVehicle: refVehicle,
        refCurrentTravel: doc(db, "Travels", _travelID)
      });

      setCurrentVehicle(vehicles.find(v => v.id === selected))

      setCurrentTravel({
        ...travelData,
        id: _travelID,
        destiny: destiny.trim(),
        reason: reason.trim(),
      })

      showMessage({
        message: "Veículo associado com sucesso",
        type: "success",
      })
    } catch (err) {
      console.error(err)
    }
    toogleModal();
  }

  useEffect(() => {
    handleSubmit();
  }, [destiny, reason])

  return (
    <Container>
      <Icon activeOpacity={0.7} onPress={toogleModal}>
        <Ionicons name="chevron-back-outline" color="#b4b4b4" size={36} />
      </Icon>
      <Title>Selecione um{'\n'}veículo</Title>
      {vehicles.map((vehicle, index) => (
        <Vehicle
          key={index}
          vehicle={vehicle}
          onPress={() => {
            setSelected(vehicle.id);
          }}
          isSelected={selected === vehicle.id}
          currentVehicleID={vehicleID}
        />
      ))}
      <Button title='Salvar' onPress={() => {
        setShow(true);
      }} />

      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        statusBarTranslucent={true}
        transparent={true}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <CreateTravel
            _setDestiny={setDestiny}
            _setReason={setReason}
            toogleModal={() => setShow(false)}            
          />
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  )
}