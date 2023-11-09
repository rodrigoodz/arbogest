import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request, RequestStatus, TreeRequestData } from "../types/Request";
import { Neighborhood } from "../types/Neighborhood";
import { Tree } from "../types/Tree";
import { countBy } from "lodash";
import { percentToRGB } from "../helpers/utils";
import {
  getNeighborhoodsBaseData,
  getTreesData,
} from "../helpers/getDatabaseData";

const getBaseData = async (
  req: ExpressRequest,
  res: ExpressResponse<Request<TreeRequestData>>
) => {
  try {
    const queryParams = Object.entries(req.query);

    if (queryParams.length === 0) {
      const neighborhoodData = await getNeighborhoodsBaseData();
      const treeData = await getTreesData();
      return res.json({
        status: RequestStatus.Success,
        data: { treeData, neighborhoodData },
      });
    }

    // deberia traer solo los aquellos arboles que y barrios que pertenecen
    // a la ciudad que tenes asignada!!!!

    const neighborhoodData: Neighborhood[] = await getNeighborhoodsBaseData();
    const filteredTrees: Tree[] = await getTreesData(
      req.query as Record<string, string>
    );
    const allTrees: Tree[] = await getTreesData();

    const filteredTreesRecordsetTreesIds: number[] = filteredTrees.map(
      (tree: Tree) => tree.tree_id
    );

    const filteredTreesRecordsetNeighborhoodIds: number[] = filteredTrees
      .map((tree) => tree.id_neighborhood)
      .filter((v) => v !== undefined) as number[];

    const filteredNeighborhoodTreeCount: Record<string, number> = countBy(
      filteredTreesRecordsetNeighborhoodIds
    );

    const notFilteredNeighborhoodTreeCount: Record<string, number> = countBy(
      allTrees,
      (tree) => tree.id_neighborhood
    );

    const modifiedTreeData = allTrees.map((data: Tree) => {
      if (filteredTreesRecordsetTreesIds.includes(data.tree_id)) {
        return { ...data, color: "red" };
      }
      return data;
    });

    const modifiedNeighborhoodData = neighborhoodData.map((neighborhood) => {
      const neighborhoodId = neighborhood.id;

      const neighborhoodTreeCount =
        filteredNeighborhoodTreeCount[neighborhoodId];
      const neighborhoodAllTreeCount =
        notFilteredNeighborhoodTreeCount[neighborhoodId];
      const percent = (neighborhoodTreeCount * 100) / neighborhoodAllTreeCount;

      if (isNaN(percent)) return neighborhood;

      return {
        ...neighborhood,
        color: percent ? percentToRGB(percent) : undefined,
        filterInfo: {
          percentage: Number(percent.toFixed(2)),
          filteredTreesCount: neighborhoodTreeCount,
        },
      };
    });

    res.json({
      status: RequestStatus.Success,
      data: {
        treeData: modifiedTreeData,
        neighborhoodData: modifiedNeighborhoodData,
      },
    });
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};

const getFilteredTreeData = async (
  req: ExpressRequest,
  res: ExpressResponse<Request<TreeRequestData>>
) => {
  try {
    const city_id = req.query.city_id as string | undefined;

    if (city_id) {
      const neighborhoodData = await getNeighborhoodsBaseData(city_id);
      const treeData = await getTreesData();

      return res.json({
        status: RequestStatus.Success,
        data: { neighborhoodData, treeData },
      });
    } else {
      return res.json({
        status: RequestStatus.Failure,
        error: "Debe enviar un id de la ciudad",
      });
    }
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};

module.exports = {
  getBaseData,
  getFilteredTreeData,
};
