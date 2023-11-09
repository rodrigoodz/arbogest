import { Button, Flex, Text } from "@chakra-ui/react";
import React, { FC, forwardRef, useEffect, useState } from "react";
import { Neighborhood, NeighborhoodData } from "../../types/Neighborhood";
import { getNeighborhoodData } from "../../helpers/getNeighborhoodData";
import { Map, Polygon } from "leaflet";

interface Props {
  neighborhoodSelected: Neighborhood;
  map?: Map;
}

const NeighborhoodInfo: FC<Props> = ({ neighborhoodSelected, map }) => {
  const [neighborhoodData, setNeighborhoodData] = useState<
    NeighborhoodData | undefined
  >();

  useEffect(() => {
    const data = getNeighborhoodData(neighborhoodSelected);
    setNeighborhoodData(data);
  }, [neighborhoodSelected]);

  if (!neighborhoodData) {
    return null;
  }

  const { neighborhoodName, trees } = neighborhoodData;

  return (
    <Flex flexDirection={"column"} color="white">
      {neighborhoodName && (
        <Text>{`Barrio ${neighborhoodName} seleccionado`}</Text>
      )}
      <Text fontSize="sm">{`Arboles: ${trees}`}</Text>
      <Button
        color={"black"}
        onClick={() => {
          map?.eachLayer((layer) => {
            if (layer instanceof Polygon) {
              layer.setStyle({ fillColor: "blue", color: "blue" });
            }
          });

          // map?.flyTo([33.8121, -117.919]);
        }}
      >
        pintar poligonos
      </Button>
    </Flex>
  );
};

export default NeighborhoodInfo;
