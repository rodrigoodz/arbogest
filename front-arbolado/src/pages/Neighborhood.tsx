import React, { FC } from "react";
import { Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Pages, SearchParam } from "../types/Pages";
import Header from "../components/Header/Header";
import { MapComponent } from "../components/Map/MapComponent";
import MapFilters from "../components/MapFilters/MapFilters";
import FiltersHeader from "../components/FiltersHeader/FiltersHeader";
import ReportSummary from "../components/ReportSummary/ReportSummary";
import { useGetAndSetQueryParam } from "../hooks/useGetAndSetQueryParam";
import { isEmpty, isUndefined } from "lodash";
import CenteredText from "../components/CenteredText/CenteredText";
import { useData } from "../context/dataContext";

const Neighborhood: FC = () => {
  const { neighborhoods, trees } = useData();
  const [selectedNeighborhoodID] = useGetAndSetQueryParam(SearchParam.Id);

  const undefinedId = isEmpty(selectedNeighborhoodID);

  const selectedNeighborhood = neighborhoods.find(
    (neighborhood) => String(neighborhood.id) === selectedNeighborhoodID
  );

  const selectedNeighborhoodTrees = trees.filter(
    (tree) => String(tree.id_neighborhood) === selectedNeighborhoodID
  );

  return (
    <Flex h="100vh" bgColor="#2c3e50" flexDir={"column"}>
      <Header currentPage={Pages.Neighborhood} />
      <FiltersHeader showNeighborhoodSelect />
      <Grid
        h="100%"
        columnGap={6}
        templateColumns="2fr 1fr"
        px="6"
        pb="10"
        overflow={"hidden"}
      >
        <GridItem w="100%" h="100%">
          <MapComponent selectableNeighborhoods />
        </GridItem>
        <GridItem w="100%" h="100%" overflow={"hidden"}>
          <Grid
            // row={2}
            h="100%"
            gap={4}
            flexDir={"column"}
            overflow={"auto"}
            templateRows="repeat(2,1fr)"
          >
            <MapFilters
              disabled={undefinedId}
              disabledText={"Debe seleccionar un barrio"}
            />
            {undefinedId ? (
              <CenteredText text={"Debe seleccionar un barrio"} />
            ) : (
              <ReportSummary
                textColor="white"
                visible
                name={`Barrio: ${selectedNeighborhood?.name}`}
                trees={selectedNeighborhoodTrees}
              />
            )}
          </Grid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Neighborhood;
