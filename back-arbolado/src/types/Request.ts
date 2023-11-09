import { Neighborhood } from "./Neighborhood";
import { Tree } from "./Tree";

export interface TreeRequestData {
  neighborhoodData: Neighborhood[];
  treeData: Tree[];
}

export enum RequestStatus {
  Success = "success",
  Failure = "failure",
}

type Optional<T> = T | undefined;

export interface Request<T> {
  data?: Optional<T>;
  status: RequestStatus;
  error?: string;
}
