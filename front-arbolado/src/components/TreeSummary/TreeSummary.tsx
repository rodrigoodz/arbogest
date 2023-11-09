import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Tree } from "../../types/Tree";

interface Props {
  tree: Tree;
}

const TreeSummary: FC<Props> = ({ tree }) => {
  return (
    <Box color="white" fontSize={"md"}>
      <Text>{`ID: ${tree.tree_id}`}</Text>
      <Text>{`Especie: ${tree.species}`}</Text>
      <Text>{`Direccion: ${tree.tree_address}`}</Text>
      <Text>{`Fecha Medicion: ${tree.m_date}`}</Text>
      <Text>{`Altura: ${tree.height}`}</Text>
      <Text>{`DAP: ${tree.DAP}`}</Text>
      <Text>{`Perimetro: ${tree.perimeter}`}</Text>
      <Text>{`Esta muerto: ${tree.is_dead}`}</Text>
      <Text>{`Esta faltante: ${tree.is_missing}`}</Text>
      <Text>{`Enfermedades: ${tree.diseases}`}</Text>
      <Text>{`Raices expuestas: ${tree.exposed_roots}`}</Text>
      <Text>{`Forma: ${tree.shape}`}</Text>
      <Text>{`Valor del arbol: ${tree.tree_value}`}</Text>
      <Text>{`Plagas: ${tree.pest}`}</Text>
      <Text>{`Exposicion a los vientos dominantes: ${tree.wind_exposure}`}</Text>
      <Text>{`Vigor: ${tree.vigor}`}</Text>
      {/* aca podria mostrar el nombre del barrio */}
      <Text>{`Barrio: ${tree.id_neighborhood}`}</Text>

      {/* // "conflict": null,
    // "canopy_density": "Normal",
    // "growth_space": "Vereda jardín",
    // "risk": "5",
    // "intervention": null,
    // "correction_tree": "Poda", */}
    </Box>
  );
};

export default TreeSummary;
