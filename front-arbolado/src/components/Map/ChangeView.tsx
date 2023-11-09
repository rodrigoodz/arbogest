import React, { FC } from "react";
import { useMap } from "react-leaflet";
import { UserCity } from "../../types/User";
import { isUndefined } from "lodash";

interface Props {
  userCity?: UserCity;
}

const ChangeView: FC<Props> = ({ userCity }) => {
  const map = useMap();
  if (isUndefined(userCity)) return null;

  const { center, zoom } = userCity;

  map.setView(center ?? { lat: -34.9964963, lng: -64.9672817 }, zoom ?? 6);
  return null;
};

export default ChangeView;
