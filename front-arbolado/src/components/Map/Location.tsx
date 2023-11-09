import React, { FC, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "../../types/Neighborhood";
import { smallIcon } from "./icons";

interface Props {
  showMarker?: boolean;
}

const Location: FC<Props> = ({ showMarker }) => {
  const [position, setPosition] = useState<LatLng | undefined>();
  useMapEvents({
    click(e) {
      // console.log(`{ lat : ${e.latlng.lat}, lng: ${e.latlng.lng} }`);
      setPosition(e.latlng);
    },
  });

  return position && showMarker ? (
    <Marker position={position} icon={smallIcon} />
  ) : null;
};

export default Location;
