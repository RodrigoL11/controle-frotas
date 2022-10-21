import React from "react";

import CurrentVehicle from "../../components/CurrentVehicle";
import Header from "../../components/Header";

import {
  Container,
} from "./styles";


export default function Home() {

  return (
    <Container>
      <Header />
      <CurrentVehicle />      
    </Container>
  );
}