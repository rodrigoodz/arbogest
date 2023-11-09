import sql from "mssql";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request, RequestStatus } from "../types/Request";
import { UserCity, UserCityRole } from "../types/User";
import { config } from "../../databaseConfig";

export const getUserData = async (
  req: ExpressRequest,
  res: ExpressResponse<Request<UserCity>>
) => {
  const uid = req.query.uid as string;
  if (uid === undefined)
    return res.json({
      status: RequestStatus.Failure,
      error: "Hubo un error",
    });
  try {
    const pool = await sql.connect(config);
    const query: string = `
    SELECT P.id_city, P.role, C.*
    FROM People AS P
    INNER JOIN City AS C ON P.id_city = C.city_id
    WHERE P.firebase_id = '${uid}';`;

    const data = await pool.query(query);
    const { recordset } = data;

    const userInfo: {
      id_city: number;
      role: UserCityRole;
      city_id: number;
      city_name: string;
      latitude: number;
      longitude: number;
      zoom: number;
    } = recordset[0];

    return res.json({
      status: RequestStatus.Success,
      data: {
        id: userInfo.id_city,
        center: { lat: userInfo.latitude, lng: userInfo.longitude },
        zoom: userInfo.zoom,
        name: userInfo.city_name,
        role: userInfo.role,
      },
    });
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};

export const createUser = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const pool = await sql.connect(config);
    const { name, surname, id_city, role, firebase_id } = req.body;
    const query = `INSERT INTO People (people_name, people_surname, id_city,firebase_id,role) VALUES ('${name}','${surname}', '${id_city}','${firebase_id}', '${role}')`;
    await pool.query(query);
    return res.json({
      status: RequestStatus.Success,
      message: "User added successfully",
    });
  } catch (err) {
    return res.json({
      status: RequestStatus.Failure,
      error: (err as Error).message || "Error desconocido",
    });
  }
};
