import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Title,
  Icon,
  Card,
  Destiny,
  Separator,
  Label,
  Text,
  Column,
  Row,
  Empty
} from './styles'
import { ITravel, IVehicle } from '../../interfaces/main';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { toDateTime } from '../../utils/date';

interface TravelsProps extends ITravel {
  vehicle: IVehicle;
}

export default function Historic({ route }: any) {
  const [travels, setTravels] = useState<TravelsProps[]>([]);
  const navigation = useNavigation();
  const { id } = route.params;

  const loadData = async () => {
    const refUser = doc(db, "Users", id)
    const q = query(collection(db, "Travels"), where("refUser", "==", refUser));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const data = doc.data() as ITravel;
      let vehicleDoc = await getDoc(data.refVehicle);
      let vehicle = vehicleDoc.data() as IVehicle;

      setTravels(arr => [...arr, {
        ...doc.data() as ITravel,
        vehicle: vehicle
      }
      ]);
    });
  }

  useEffect(() => {
    loadData()
  }, [])

  function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

  return (
    <Container>
      <Icon activeOpacity={0.7} onPress={navigation.goBack}>
        <Ionicons name="chevron-back-outline" color="#b4b4b4" size={36} />
      </Icon>
      <Title>Histórico de {'\n'}viagens.</Title>
      {travels.length > 0 ? travels.map((travel, index) =>
        <Card key={index}>
          <Label>Destino</Label>
          <Destiny>{travel.destiny}</Destiny>
          <Label>Motivo</Label>
          <Text>{travel.reason}</Text>
          <Label>Veículo</Label>
          <Text>{travel.vehicle.name} {travel.vehicle.plate_number}</Text>
          <Row>
            <Column>
              <Label>De</Label>
              <Text>{toDateTime(travel.created_at.seconds)}</Text>
            </Column>
            <Column style={{marginLeft: 30}}>
              <Label>Até</Label>
              <Text>{travel.finalized_at ? toDateTime(travel.finalized_at.seconds) : "No momento"}</Text>
            </Column>
            <Column>
              <Label>Total</Label>
              <Text>{travel.finalized_at ? secondsToHms(travel.finalized_at.seconds - travel.created_at.seconds) : "-"}</Text>
            </Column>
          </Row>
          {travels[travels.length - 1] !== travel && <Separator />}
        </Card>
      ) : <Empty>Não há nenhum registro</Empty>}
    </Container>
  )
}

