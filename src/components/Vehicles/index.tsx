import { collection, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { IUser, IVehicle } from '../../interfaces/main';
import { Ionicons } from '@expo/vector-icons'

import {
  Card,
  Container, 
  Icon, 
  Name, 
  PlateNumber, 
  Title,
  Status,
  BudgetId,
  BudgetName
} from './styles'

interface Props {
  toogleModal: () => void;
}

export default function Vehicles({ toogleModal }: Props) {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])

  const checkStatus = async (index: number) => {
    const vehicle = vehicles[index];
    console.log(vehicle)
    let status = ""

    try {
      const doc = await getDoc(vehicle.refUser);
      const user = doc.data() as IUser;
      status = `Está em uso por ${user.name}`
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

      const status = await checkStatus(vehicles.indexOf(data));
      //console.log(status, data.name)
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


  return (
    <Container>
      <Icon activeOpacity={0.7} onPress={toogleModal}>
        <Ionicons name="chevron-back-outline" color="#b4b4b4" size={36} />
      </Icon>
      <Title>Selecione um veículo</Title>
      {vehicles.map((vehicle, index) => (
        <Card key={index}>
          <Name>{vehicle.name}</Name>
          <PlateNumber>{vehicle.plate_number}</PlateNumber>
          <Status>{vehicle.status}</Status>
          <BudgetId>{vehicle.budget_id}</BudgetId>
          <BudgetName>{vehicle.budget_name}</BudgetName>
        </Card>
      ))}
    </Container>
  )
}