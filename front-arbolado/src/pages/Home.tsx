import React, { FC, useEffect, useRef } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { MapComponent } from "../components/Map/MapComponent";
import { MapRef } from "../types/Map";
import { Pages } from "../types/Pages";
import Header from "../components/Header/Header";
import MapFilters from "../components/MapFilters/MapFilters";
import MapResults from "../components/MapResults/MapResults";
import queryString from "query-string";
import axios from "axios";
import { useQueryParams } from "use-query-params";
import { useData } from "../context/dataContext";
import { TreeRequestData } from "../types/Tree";
import { useShowErrorAndLogout } from "../hooks/useShowErrorAndLogout";
import Charts from "../components/Charts/Charts";
import { Request, RequestStatus } from "../types/Request";

const Home: FC = () => {
  const mapRef = useRef<MapRef>(null);
  const { setNeighborhoods, setTrees, setLoadingTreesData } = useData();
  const [query] = useQueryParams();
  const { showErrorAndLogout } = useShowErrorAndLogout();

  useEffect(() => {
    // TODO arreglar bug porque el pedido se hace 2 veces
    const init = async () => {
      setLoadingTreesData(true);
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/?${queryString.stringify(
          query
        )}`;
        const response = await axios.get(url);
        const responseData: Request<TreeRequestData> = response.data;

        if (
          responseData.status === RequestStatus.Success &&
          responseData.data
        ) {
          const {
            data: { neighborhoodData, treeData },
          } = responseData;

          treeData && setTrees(treeData);
          neighborhoodData && setNeighborhoods(neighborhoodData);
        }

        setLoadingTreesData(false);
      } catch (error) {
        showErrorAndLogout();
        setLoadingTreesData(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Flex direction={"column"}>
      <Flex h="100vh" bgColor="#2c3e50" flexDir={"column"}>
        <Header currentPage={Pages.Home} />
        <Grid
          h="100%"
          columnGap={6}
          templateColumns="2fr 1fr"
          px="6"
          py="10"
          overflow={"hidden"}
        >
          <GridItem w="100%" h="100%">
            <MapComponent selectableNeighborhoods showPopup mapRef={mapRef} />
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
              <MapFilters map={mapRef.current ?? undefined} />
              <MapResults map={mapRef.current ?? undefined} />
            </Grid>
          </GridItem>
        </Grid>
      </Flex>
      <Flex minH="100vh" bgColor={"#dfe6e9"}>
        <Charts />
      </Flex>
    </Flex>
  );
};

export default Home;
