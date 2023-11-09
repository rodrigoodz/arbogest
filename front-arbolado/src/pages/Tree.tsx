import React, { FC } from "react";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Pages, SearchParam } from "../types/Pages";
import Header from "../components/Header/Header";
import { MapComponent } from "../components/Map/MapComponent";
import FiltersHeader from "../components/FiltersHeader/FiltersHeader";
import { useGetAndSetQueryParam } from "../hooks/useGetAndSetQueryParam";
import { isEmpty } from "lodash";
import CenteredText from "../components/CenteredText/CenteredText";
import { useData } from "../context/dataContext";
import TreeSummary from "../components/TreeSummary/TreeSummary";

const Tree: FC = () => {
  const { trees } = useData();
  const [selectedTreeID] = useGetAndSetQueryParam(SearchParam.Id);

  const selectedTree = trees.find(
    (tree) => String(tree.tree_id) === selectedTreeID
  );

  return (
    <Flex h="100vh" bgColor="#2c3e50" flexDir={"column"}>
      <Header currentPage={Pages.Tree} />
      <FiltersHeader showTreeSelect />
      <Grid
        h="100%"
        columnGap={6}
        templateColumns="2fr 1fr"
        px="6"
        pb="10"
        overflow={"hidden"}
      >
        <GridItem w="100%" h="100%">
          <MapComponent showTrees />
        </GridItem>
        <GridItem w="100%" h="100%" overflow={"hidden"}>
          <Grid
            // row={2}
            h="100%"
            gap={4}
            flexDir={"column"}
            overflow={"auto"}
            templateRows="repeat(1,1fr)"
          >
            {!selectedTree ? (
              <CenteredText text={"Debe seleccionar un arbol"} />
            ) : (
              <TreeSummary tree={selectedTree} />
            )}
          </Grid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Tree;
