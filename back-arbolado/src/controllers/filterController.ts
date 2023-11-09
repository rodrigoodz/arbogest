import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request, RequestStatus } from "../types/Request";
import { Filter } from "../types/Filters";
import sql from "mssql";
import { config } from "../../databaseConfig";

export const getAllFilters = async (
  req: ExpressRequest,
  res: ExpressResponse<Request<Filter>>
) => {
  if (!req.query.filters)
    return res.json({
      status: RequestStatus.Failure,
      error: "Error",
    });
  const filters = (req.query.filters as string).split(",");
  try {
    const pool = await sql.connect(config);
    const query: string = filters
      .map(
        (filterName: string) =>
          `SELECT DISTINCT ${filterName} FROM Tree ORDER BY 1 asc;`
      )
      .join(";");
    const data = await pool.query(query);
    const recordsets: {
      [key: string]: any;
    } = data.recordsets;

    const transformedData: Filter = recordsets.reduce(
      (
        acc: {
          [key: string]: any;
        },
        lista: {
          [key: string]: string | null;
        }[]
      ) => {
        for (const item of lista) {
          const key = Object.keys(item)[0];
          const value = item[key];
          if (value !== null) {
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(value);
          }
        }
        return acc;
      },
      {}
    );

    return res.json({
      status: RequestStatus.Success,
      data: transformedData,
    });
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};
