import { LeafletMouseEvent, Map } from "leaflet";
import React, { FC, Ref, useCallback, useMemo } from "react";
import {
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Neighborhood } from "../../types/Neighborhood";
import Location from "./Location";
import TreeMarker from "./TreeMarker";
import { Pages, SearchParam } from "../../types/Pages";
import TreeSpinner from "../TreeSpinner/TreeSpinner";
import { useData } from "../../context/dataContext";
import { getNeighborhoodColor } from "./utils";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import ChangeView from "./ChangeView";

import { getSimpsonIndexValue } from "../../helpers/getSimpsonIndexValue";

interface Props {
  setNeighborhoodSelected?: (value?: Neighborhood) => void;
  mapRef?: Ref<Map>;
  showTrees?: boolean;
  showPopup?: boolean;
  selectableNeighborhoods?: boolean;
}

const baseFillOpacity = 0.3;

export const MapComponent: FC<Props> = ({
  setNeighborhoodSelected,
  mapRef,
  showTrees = false,
  showPopup = false,
  selectableNeighborhoods = false,
}) => {
  const { userCity } = useAuth();
  const { isLoadingTreesData, trees, neighborhoods } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNeighborhoodID, setSelectedNeighborhoodID] =
    useGetAndSetQueryParam(SearchParam.Id);

  const handleOnClickPolygon = (e: LeafletMouseEvent, index: number) => {
    if (!selectableNeighborhoods) return;
    setNeighborhoodSelected?.(neighborhoods[index]);
    const neighborhoodIdx = String(neighborhoods[index].id);
    setSelectedNeighborhoodID(neighborhoodIdx);

    if (location.pathname === Pages.Home) {
      navigate(
        {
          pathname: Pages.Neighborhood,
          search: `?id=${neighborhoodIdx}`,
        },
        { replace: true }
      );
    }
  };

  const handleOnMouseOverPolygon = (e: LeafletMouseEvent) => {
    e.target.openPopup();
    e.target.setStyle(
      selectableNeighborhoods
        ? {
            fillOpacity: baseFillOpacity * 2,
          }
        : undefined
    );
  };

  const handleOnMouseOutPolygon = (e: LeafletMouseEvent) => {
    e.target.closePopup();
    e.target.setStyle(
      selectableNeighborhoods
        ? {
            fillOpacity: baseFillOpacity,
          }
        : undefined
    );
  };

  // const handleOnClickMultiPolygon: LeafletMouseEventHandlerFn = (
  //   e: LeafletMouseEvent
  // ) => {
  //   console.log("Tocaste adentro del multipoligono", e.latlng);
  // };

  const simpsonIndex: string = useMemo(
    () => getSimpsonIndexValue(trees).toFixed(2),
    [trees]
  );

  const neighborhoodSimpsonIndex = useCallback(
    (neighborhoodID: number): string =>
      getSimpsonIndexValue(trees, neighborhoodID).toFixed(2),
    [trees]
  );

  return (
    <MapContainer ref={mapRef} style={{ height: "100%", width: "100%" }}>
      {isLoadingTreesData && <TreeSpinner />}
      <ChangeView userCity={userCity} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <Polygon
          pathOptions={{ color: "purple" }}
          positions={polygon}
          eventHandlers={{
            click: handleOnClickPolygon,
          }}
        />
        <Polygon
          pathOptions={{ color: "red" }}
          positions={multiPolygon}
          eventHandlers={{
            click: handleOnClickMultiPolygon,
          }}
        /> */}
      {neighborhoods.map((neighborhood, idx) => {
        return (
          <Polygon
            key={neighborhood.id}
            positions={neighborhood.positions}
            eventHandlers={{
              click: (e) => handleOnClickPolygon(e, idx),
              mouseover: handleOnMouseOverPolygon,
              mouseout: handleOnMouseOutPolygon,
            }}
            fillOpacity={baseFillOpacity}
            pathOptions={{
              fillColor:
                neighborhood.color ??
                getNeighborhoodColor(idx, selectedNeighborhoodID),
              color:
                neighborhood.color ??
                getNeighborhoodColor(idx, selectedNeighborhoodID),
            }}
          >
            {neighborhood.filterInfo?.percentage && (
              <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
                {`${neighborhood.filterInfo?.percentage} %`}
              </Tooltip>
            )}
            {showPopup ? (
              <Popup
                keepInView
                closeOnClick={true}
                autoClose={false}
                closeButton={false}
              >
                <Flex flexDirection={"column"}>
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    style={{ padding: 0, margin: 0 }}
                  >{`Barrio: ${neighborhood.name}`}</Text>
                  {neighborhood.additionalInfo && (
                    <>
                      {neighborhood.additionalInfo.totalTreesCount && (
                        <Text
                          fontSize={"md"}
                          style={{ padding: 0, margin: 0 }}
                        >{`Cantidad de arboles: ${neighborhood.additionalInfo.totalTreesCount}`}</Text>
                      )}
                      {neighborhood.additionalInfo.predominantSpecies && (
                        <Text
                          fontSize={"md"}
                          style={{ padding: 0, margin: 0 }}
                        >{`Especie predominante: ${neighborhood.additionalInfo.predominantSpecies}`}</Text>
                      )}
                      {neighborhood.additionalInfo.predominantRisk && (
                        <Text
                          fontSize={"md"}
                          style={{ padding: 0, margin: 0 }}
                        >{`Riesgo predominante: ${neighborhood.additionalInfo.predominantRisk}`}</Text>
                      )}
                      <Text
                        fontSize={"md"}
                        style={{ padding: 0, margin: 0 }}
                      >{`Indice de simpsons (ciudad): ${simpsonIndex}`}</Text>
                      <Text
                        fontSize={"md"}
                        style={{ padding: 0, margin: 0 }}
                      >{`Indice de simpsons (barrio): ${neighborhoodSimpsonIndex(
                        neighborhood.id
                      )}`}</Text>
                    </>
                  )}
                </Flex>
              </Popup>
            ) : null}
          </Polygon>
        );
      })}
      {/* https://codesandbox.io/s/react-leaflet-geojson-773y5?file=/src/index.js */}
      {/* <GeoJSON
        data={{
          type: "Polygon",
          bbox: [
            -31.6360563385219, -31.6360563385219, -31.6360563385219,
            -31.6360563385219,
          ],
        }}
      /> */}
      <Location showMarker={false} />
      {showTrees &&
        trees.map((tree, idx) => <TreeMarker key={idx} tree={tree} />)}
    </MapContainer>
  );
};
