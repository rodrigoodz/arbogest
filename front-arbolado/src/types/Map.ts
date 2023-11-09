import { Map } from "leaflet";

export type MapRef = Map | null;

export enum NeighborhoodColor {
  Selected = "#63B3ED",
  NotSelected = "#858585",
}

export enum TreeColor {
  Selected = "red",
  NotSelected = "black",
}

export enum MarkerRadius {
  Selected = 4,
  NotSelected = 2,
}
