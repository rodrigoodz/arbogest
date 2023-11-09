import { Tree } from "../types/Tree";
import { getTreeKeyByValue } from "./utils";

export const treeRiskIsBiggerThanRiskFilter = (tree: Tree, risk: string) =>
  tree.risk === Number(risk);

export const treeMatchsSpecie = (tree: Tree, specie: string) => {
  return getTreeKeyByValue(tree.species) === specie;
};
