import { DocumentReference, Timestamp } from "firebase/firestore"

export interface IUser{
  id: string,
  name: string,
  login: string,
  password: string,
  refCurrentVehicle: DocumentReference,
  refCurrentTravel: DocumentReference
}

export interface IVehicle{
  id: string,
  budget_id: string,
  budget_name: string,
  name: string,
  plate_number: string,
  status: string,
  refUser: DocumentReference
}

export interface ITravel{
  id: string,
  refUser: DocumentReference,
  refVehicle: DocumentReference,
  created_at: Timestamp,
  finalized_at?: Timestamp,
  odometer_start: number,
  odometer_end?: number
}