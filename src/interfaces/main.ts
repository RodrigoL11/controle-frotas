import { DocumentReference } from "firebase/firestore"

export interface IUser{
  id: string,
  name: string,
  login: string,
  password: string,
  refCurrentVehicle: DocumentReference
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