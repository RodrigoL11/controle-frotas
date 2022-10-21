import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { IUser, IVehicle } from '../../interfaces/main';
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

interface VehicleProps {
  vehicle: IVehicle,
  isSelected: boolean,
  onPress: () => void,
  currentVehicleID: string
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
  toogleModal: () => void;
  vehicleID: string;
  setCurrentVehicle: Dispatch<SetStateAction<IVehicle | undefined>>
}

export default function Vehicles({ toogleModal, vehicleID, setCurrentVehicle }: Props) {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selected, setSelected] = useState(vehicleID);

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
    if (!authData) return null;

    if(vehicleID){
      try {
        await updateDoc(doc(db, "Vehicles", vehicleID), {
          refUser: "",
        });
      } catch (err) { console.error(err) }
    }
    
    try {
      let refVehicle = doc(db, "Vehicles", selected);
      let refUser = doc(db, "Users", authData.id);

      await updateDoc(refVehicle, {
        refUser: refUser
      });

      await updateDoc(refUser, {
        refCurrentVehicle: refVehicle
      });

    } catch (err) { }

    toogleModal();
    setCurrentVehicle(vehicles.find(v => v.id === selected))
  }

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
      <Button title='Salvar' onPress={handleSubmit} />
    </Container>
  )
}