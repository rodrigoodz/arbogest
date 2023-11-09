import { Text, VisuallyHidden } from "@chakra-ui/react";
import React, { CSSProperties, FC } from "react";
import { countBy, isEmpty, keys, maxBy, size } from "lodash";
import { Tree } from "../../types/Tree";
import { getSimpsonIndexValue } from "../../helpers/getSimpsonIndexValue";

interface Props {
  name?: string;
  visible?: boolean;
  trees?: Tree[];
  textColor?: string;
}

const TextComponent: FC<{ text?: string; componentStyle?: CSSProperties }> = ({
  text,
  componentStyle,
}) => {
  if (isEmpty(text)) return null;
  return (
    <Text style={{ padding: 0, margin: 0, ...componentStyle }}>{text}</Text>
  );
};

const getPredominantSpecies = (trees?: Tree[]): string => {
  if (isEmpty(trees)) return "-";
  const neighborhoodSpecies = countBy(trees, (tree) => tree.species);

  const predominantSpecies = maxBy(
    keys(neighborhoodSpecies),
    (specie) => neighborhoodSpecies[specie]
  );

  return predominantSpecies ?? "-";
};

const SummaryComponent: FC<Props> = ({ name, trees = [], textColor }) => {
  return (
    <div style={{ width: "100%", color: textColor }}>
      <TextComponent componentStyle={{ fontSize: "1.5rem" }} text={name} />
      <TextComponent text={`Cantidad de arboles totales: ${size(trees)}`} />
      <TextComponent
        text={`Especie Predominante: ${getPredominantSpecies(trees)} `}
      />
      <TextComponent
        text={`Indice de simpson: ${getSimpsonIndexValue(trees).toFixed(2)} `}
      />
      {/* 
      - barrio con mayor riesgo de arboles (Puedes calcular el promedio de riesgo de árboles en cada barrio y mostrar los barrios con los árboles de mayor riesgo.)
      - arboles muertos
      */}
    </div>
  );
};

const ReportSummary: FC<Props> = ({ visible = false, ...rest }) => {
  return visible ? (
    <SummaryComponent {...rest} />
  ) : (
    <VisuallyHidden>
      <SummaryComponent {...rest} />
    </VisuallyHidden>
  );
};

export default ReportSummary;
