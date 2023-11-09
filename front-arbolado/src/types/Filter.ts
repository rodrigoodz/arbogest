export interface Filter {
  [key: string]: string[];
}

export enum FilterName {
  // tree_id = "tree_id",
  // tree_address = "tree_address",
  // latitude = "latitude",
  // longitude = "longitude",
  // m_date = "m_date",
  // perimeter = "perimeter",
  // DAP = "DAP",
  // height = "height",
  // incline = "incline",
  // trees_in_the_block = "trees_in_the_block",
  is_dead = "Esta muerto",
  is_missing = "Arbol faltante",
  diseases = "Enfermedades",
  exposed_roots = "Raíces Expuestas",
  // strata = "Estrato",
  species = "Especie",
  shape = "Forma de copa",
  pest = "Plagas",
  tree_value = "Valor del arbol",
  conflict = "Conflicto",
  wind_exposure = "Exposición a los vientos dominantes",
  vigor = "Vigor",
  canopy_density = "Densidad de copa",
  growth_space = "Espacio de crecimiento",
  risk = "Riesgo",
  intervention = "Intervención",
  correction_tree = "Corrección del árbol",
  // id_neighborhood = "id_neighborhood",
}
