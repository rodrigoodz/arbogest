import { LatLng } from "./Neighborhood";

export interface User {
  email: string;
  password: string;
}

export enum UserCityRole {
  Admin = "admin",
  Manager = "manager",
}

export interface UserCity {
  id: number;
  name: string;
  center?: LatLng;
  zoom?: number;
  role?: UserCityRole;
}
