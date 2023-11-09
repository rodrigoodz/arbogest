import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request, RequestStatus } from "../types/Request";
import sql from "mssql";
import { config } from "../../databaseConfig";
import { SQLPeople } from "../types/SQLTables";
import { UserCity } from "../types/User";

export const getAllCities = async (
  _req: ExpressRequest,
  res: ExpressResponse<Request<UserCity[]>>
) => {
  try {
    const pool = await sql.connect(config);
    const query = `SELECT * FROM City`;
    const data = await pool.query(query);
    const recordset: SQLPeople[] = data.recordset;

    return res.json({
      status: RequestStatus.Success,
      data: recordset.map((record) => {
        return {
          id: record.city_id,
          name: record.city_name,
          center: { lat: record.latitude, lng: record.longitude },
          zoom: record.zoom,
        };
      }),
    });
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};
