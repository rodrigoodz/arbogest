import React, { FC } from "react";
import { Popup, CircleMarker } from "react-leaflet";
import { Flex, Text } from "@chakra-ui/react";
import { LeafletMouseEvent } from "leaflet";
import { Tree } from "../../types/Tree";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { SearchParam } from "../../types/Pages";
import { isEqual } from "lodash";
import { MarkerRadius, TreeColor } from "../../types/Map";

interface Props {
  tree: Tree;
}

const TreeMarker: FC<Props> = ({ tree }) => {
  const [selectedTreeID, setSelectedTreeID] = useGetAndSetQueryParam(
    SearchParam.Id
  );

  const handleOnClickMarker = (e: LeafletMouseEvent) => {
    setSelectedTreeID(String(tree.tree_id));
  };

  const handleOnMouseOverMarker = (e: LeafletMouseEvent) => {
    e.target.openPopup();
  };

  const handleOnMouseOutMarker = (e: LeafletMouseEvent) => {
    e.target.closePopup();
  };

  if (!tree.latitude || !tree.longitude) return null;

  const isSelectedTree = isEqual(selectedTreeID, String(tree.tree_id));

  return (
    <CircleMarker
      center={{ lat: tree.latitude, lng: tree.longitude }}
      radius={isSelectedTree ? MarkerRadius.Selected : MarkerRadius.NotSelected}
      pathOptions={{
        color: isSelectedTree
          ? TreeColor.Selected
          : tree.color ?? TreeColor.NotSelected,
        fillColor: isSelectedTree
          ? TreeColor.Selected
          : tree.color ?? TreeColor.NotSelected,
        fillOpacity: 1,
      }}
      eventHandlers={{
        click: handleOnClickMarker,
        mouseover: handleOnMouseOverMarker,
        mouseout: handleOnMouseOutMarker,
      }}
    >
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
          >
            {`Arbol ID: ${tree.tree_id}`}
          </Text>
        </Flex>
      </Popup>
    </CircleMarker>
  );
};

export default TreeMarker;
