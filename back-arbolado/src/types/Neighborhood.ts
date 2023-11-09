export interface LatLng {
  lat: number;
  lng: number;
}

export interface FilterInfo {
  percentage: number;
  filteredTreesCount: number;
}

export interface NeighborhoodAdditionalInfo {
  totalTreesCount?: number;
  predominantSpecies?: string;
  predominantRisk?: string;
}
export interface Neighborhood {
  id: number;
  name: string;
  positions: LatLng[];
  color?: string;
  filterInfo?: FilterInfo;
  additionalInfo?: NeighborhoodAdditionalInfo;
}

export interface NeighborhoodData {
  neighborhoodName?: string;
  trees: number;
}
