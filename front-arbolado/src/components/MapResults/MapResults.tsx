import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Map } from "leaflet";
import React, { FC, useMemo } from "react";
import { useData } from "../../context/dataContext";
import TreeSpinner from "../TreeSpinner/TreeSpinner";
import { isUndefined, size } from "lodash";

interface Props {
  map?: Map;
}

const MapResults: FC<Props> = () => {
  const { isLoadingTreesData, neighborhoods, trees } = useData();

  const filteredTreesCount: number = useMemo(
    () =>
      neighborhoods.reduce((accumulator, neighborhood) => {
        if (isUndefined(neighborhood.filterInfo)) return accumulator;
        return accumulator + neighborhood.filterInfo.filteredTreesCount;
      }, 0),
    [neighborhoods]
  );

  return (
    <Flex color="white">
      {isLoadingTreesData ? (
        <TreeSpinner />
      ) : (
        <TableContainer w="100%">
          <Table size="sm" variant="unstyled" h="100%">
            <Thead>
              <Tr>
                <Th px="0">Barrio</Th>
                <Th px="0">Porcentaje</Th>
                <Th px="0">Arboles filtrados</Th>
                <Th px="0">Arboles totales</Th>
              </Tr>
            </Thead>
            <Tbody>
              {neighborhoods.map((neighborhood, idx) => {
                const { filterInfo, additionalInfo } = neighborhood;
                return (
                  <Tr key={idx}>
                    <Td px="0" fontWeight={"bold"}>
                      {neighborhood.name}
                    </Td>
                    <Td px="0">
                      {filterInfo ? `${filterInfo?.percentage} %` : "-"}
                    </Td>
                    <Td px="0">{filterInfo?.filteredTreesCount ?? "-"}</Td>
                    <Td px="0">{additionalInfo?.totalTreesCount ?? "-"}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot backgroundColor={"gray.800"}>
              <Tr>
                <Th px="0">Total</Th>
                <Th px="0" />
                <Th px="0">{filteredTreesCount}</Th>
                <Th px="0">{size(trees)}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default MapResults;
