import { groupBy, isNaN, isUndefined, size } from "lodash";
import { Tree } from "../types/Tree";

export const getSimpsonIndexValue = (
  trees: Tree[],
  neighborhoodID?: number
): number => {
  const filteredTrees = isUndefined(neighborhoodID)
    ? trees
    : trees.filter((tree) => tree.id_neighborhood === neighborhoodID);
  const treeSpecies: Record<string, Tree[]> = groupBy(
    filteredTrees,
    (tree: Tree) => tree.species
  );

  const sum = Object.values(treeSpecies).reduce((accumulator, species) => {
    const speciesSize = size(species);
    return accumulator + speciesSize * (speciesSize - 1);
  }, 0);

  const treeSpeciesSize = size(filteredTrees);
  const simpsonIndex = sum / (treeSpeciesSize * (treeSpeciesSize - 1));

  return isNaN(simpsonIndex) ? 0 : simpsonIndex;
};
