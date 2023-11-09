export enum FilterName {
  Plagas = "Plagas",
  Enfermedades = "Enfermedades",
  //   Valor_del_árbol = "Valor del árbol",
  Exposición_a_los_vientos_dominantes = "Exposición a los vientos dominantes",
  Vigor = "Vigor",
  //   Densidad_de_copa = "Densidad de copa",
  Conflictos = "Conflictos",
  Espacio_de_crecimiento = "Espacio de crecimiento",
  Plato_radicular_levantado_rajado_o_raíces_expuestas = "Plato radicular levantado rajado o raíces expuestas",
  Uso_bajo_el_árbol = "Uso bajo el árbol",
  Corrección_del_árbol = "Corrección del árbol",
  Intervención = "Intervención",
  //   Observaciones = "Observaciones",
  TASA_DE_RiESGO = "Tasa de riesgo",
  Clase_de_copa = "Clase de copa",
  //   de_copa_viva = "Porncetaje de copa viva",
  Clases_de_edad = "Clases de edad",
  color_del_follaje = "color del follaje",
  Cicatrización_de_heridas = "Cicatrización de heridas",
  Interferencias_al_crecimiento = "Interferencias al crecimiento",
}

export interface Filter {
  [key: string]: string[];
}
