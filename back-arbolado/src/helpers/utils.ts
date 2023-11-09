import { countBy, filter, keys, maxBy, size } from "lodash";
import { NeighborhoodAdditionalInfo } from "../types/Neighborhood";
import { TreeRequestData } from "../types/Request";
import { Tree, TreeSpecie } from "../types/Tree";

export const getTreeKeyByValue = (value?: string): string => {
  const indexOfS = Object.values(TreeSpecie).indexOf(
    value as unknown as TreeSpecie
  );
  const key = Object.keys(TreeSpecie)[indexOfS];
  return key;
};

export const percentToRGB = (percent: number): string => {
  if (percent === 100) {
    percent = 99;
  }
  var r, g, b;

  if (percent < 50) {
    // green to yellow
    r = Math.floor(255 * (percent / 50));
    g = 255;
  } else {
    // yellow to red
    r = 255;
    g = Math.floor(255 * ((50 - (percent % 50)) / 50));
  }
  b = 0;

  return "rgb(" + r + "," + g + "," + b + ")";
};

export const getTreesThatMatchFilter = (
  query: string,
  compareFunction: (tree: Tree, query: string) => boolean,
  data: TreeRequestData
): TreeRequestData => {
  return {
    treeData: data.treeData.map((tree: Tree) =>
      compareFunction(tree, query) ? { ...tree, color: "red" } : tree
    ),
    neighborhoodData: data.neighborhoodData.map((neighborhood) => {
      const neighborhoodTrees = data.treeData.filter(
        (tree) => tree.id_neighborhood === neighborhood.id
      );

      if (neighborhoodTrees.length === 0) {
        return {
          ...neighborhood,
          filterInfo: {
            percentage: 0,
            filteredTreesCount: 0,
            totalTreesCount: 0,
          },
        };
      }

      const neighborhoodTreesThatSatisfyFilter = neighborhoodTrees.filter(
        (tree) => compareFunction(tree, query)
      );

      const filteredTreesCount = neighborhoodTreesThatSatisfyFilter.length;
      const totalTreesCount = neighborhoodTrees.length;

      const percent = (filteredTreesCount * 100) / totalTreesCount;
      return {
        ...neighborhood,
        color: percent ? percentToRGB(percent) : undefined,
        filterInfo: {
          percentage: 0,
          filteredTreesCount,
          totalTreesCount,
        },
      };
    }),
  };
};

export const getNeighborhoodAdditionalInfo = (
  neighborhoodId: number,
  trees: Tree[]
): NeighborhoodAdditionalInfo | undefined => {
  const neighborhoodFilteredTress = filter(
    trees,
    (tree: Tree) => tree.id_neighborhood === neighborhoodId
  );

  if (size(neighborhoodFilteredTress) === 0) return;

  // Especie mas predominante
  const neighborhoodSpecies = countBy(
    neighborhoodFilteredTress,
    (tree) => tree.species
  );

  const predominantSpecies = maxBy(
    keys(neighborhoodSpecies),
    (especie) => neighborhoodSpecies[especie]
  );

  // Riesgo predominante

  // Mayor riesgo

  const neighborhoodRisk = countBy(
    neighborhoodFilteredTress,
    (tree) => tree.risk
  );

  const predominantRisk = maxBy(
    keys(neighborhoodRisk),
    (risk) => neighborhoodRisk[risk]
  );

  return {
    predominantSpecies,
    totalTreesCount: size(neighborhoodFilteredTress),
    predominantRisk,
  };
};
