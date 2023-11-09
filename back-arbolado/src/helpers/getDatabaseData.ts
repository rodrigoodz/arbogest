import { config } from "../../databaseConfig";
import sql from "mssql";
import { Neighborhood } from "../types/Neighborhood";
import { Tree } from "../types/Tree";
import { getNeighborhoodAdditionalInfo } from "./utils";

export const getNeighborhoodsBaseData = async (
  cityId?: string
): Promise<Neighborhood[]> => {
  try {
    const pool = await sql.connect(config);
    const allTrees: Tree[] = await getTreesData();
    const neighborhoodData = await pool.query(
      [
        `SELECT N.neighborhood_id,N.neighborhood_name, C.latitude, C.longitude
            FROM Neighborhood AS N
            JOIN Nbrhd_Coord AS NC ON N.neighborhood_id = NC.id_neighborhood
            JOIN Coordinate AS C ON NC.id_coordinate = C.coordinate_id`,
        cityId ? `WHERE N.id_city = ${cityId};` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(" ")
    );

    const { recordset } = neighborhoodData;

    const transformedData: {
      [key: string]: Neighborhood;
    } = {};

    // Iteramos sobre los elementos del arreglo
    recordset.forEach(
      (item: {
        neighborhood_id: number;
        neighborhood_name: string;
        latitude: number;
        longitude: number;
      }) => {
        const { neighborhood_id, neighborhood_name, latitude, longitude } =
          item;

        if (!transformedData[neighborhood_name]) {
          transformedData[neighborhood_name] = {
            id: neighborhood_id,
            name: neighborhood_name,
            positions: [],
          };
        }

        // Agregamos la posición al barrio correspondiente
        transformedData[neighborhood_name].positions?.push({
          lat: latitude,
          lng: longitude,
        });

        // agregamos la info adicional
        transformedData[neighborhood_name].additionalInfo =
          getNeighborhoodAdditionalInfo(neighborhood_id, allTrees);
      }
    );
    const resultArray = Object.values(transformedData);
    return resultArray;
  } catch (error) {
    return [];
  }
};

export const getTreesData = async (
  queryParams?: Record<string, string>
): Promise<Tree[]> => {
  // aca tendria que tener una logica para que me traiga los arboles de X ciudad
  try {
    const pool = await sql.connect(config);

    let query = "SELECT * FROM tree";

    if (queryParams && Object.keys(queryParams).length > 0) {
      const conditions = Object.entries(queryParams)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(" AND ");

      query += ` WHERE ${conditions}`;
    }

    const treeData = await pool.query(query);

    const { recordset } = treeData;

    return recordset;
  } catch (error) {
    return [];
  }
};
