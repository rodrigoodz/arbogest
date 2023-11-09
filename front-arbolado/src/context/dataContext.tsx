import {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  useEffect,
} from "react";
import { Tree, TreeRequestData } from "../types/Tree";
import { Neighborhood } from "../types/Neighborhood";
import { Filter, FilterName } from "../types/Filter";
import { useShowErrorAndLogout } from "../hooks/useShowErrorAndLogout";
import { useAuth } from "./authContext";
import axios from "axios";
import { Request, RequestStatus } from "../types/Request";
import { isUndefined } from "lodash";

type DataContextType = {
  trees: Tree[];
  neighborhoods: Neighborhood[];
  isLoadingTreesData: boolean;
  setTrees: (trees: Tree[]) => void;
  setNeighborhoods: (neighborhoods: Neighborhood[]) => void;
  setLoadingTreesData: (value: boolean) => void;
  filters: Filter;
  isLoadingFiltersData: boolean;
};

const DataContext = createContext<DataContextType>({
  neighborhoods: [],
  trees: [],
  isLoadingTreesData: false,
  setNeighborhoods: () => {},
  setTrees: () => {},
  setLoadingTreesData: () => {},
  filters: {},
  isLoadingFiltersData: false,
});

export const useData = () => useContext(DataContext);

interface Props {
  children: ReactNode;
}

export const DataProvider: FC<Props> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoadingTreesData, setLoadingTreesData] = useState<boolean>(false);
  const { user, userCity } = useAuth();
  const [filters, setFilters] = useState<Filter>({});
  const { showErrorAndLogout } = useShowErrorAndLogout();
  const [isLoadingFiltersData, setIsLoadingFiltersData] =
    useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      if (isUndefined(userCity)) return;
      setIsLoadingFiltersData(true);
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/filters`;
        const response = await axios.get(url, {
          params: {
            filters: Object.keys(FilterName).join(","),
          },
        });
        const responseData: Request<Filter> = response.data;
        if (
          responseData.status === RequestStatus.Success &&
          responseData.data
        ) {
          const { data: filters } = responseData;
          setFilters(filters);
        }
        setIsLoadingFiltersData(false);
      } catch (error) {
        // showErrorAndLogout();
        setIsLoadingFiltersData(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCity]);

  useEffect(() => {
    // TODO arreglar bug porque el pedido se hace 2 veces
    const init = async () => {
      if (isUndefined(userCity?.id)) return;
      try {
        setLoadingTreesData(true);
        const url = `${process.env.REACT_APP_BASE_URL}/data?city_id=${userCity?.id}`;
        const response = await axios.get(url);
        const responseData: Request<TreeRequestData> = response.data;

        if (
          responseData.status === RequestStatus.Success &&
          responseData.data
        ) {
          const {
            data: { neighborhoodData, treeData },
          } = responseData;
          setTrees(treeData);
          setNeighborhoods(neighborhoodData);
        }
        setLoadingTreesData(false);
      } catch (error) {
        showErrorAndLogout();
        setLoadingTreesData(false);
      }
    };
    init();
  }, [userCity]);

  return (
    <DataContext.Provider
      value={{
        trees,
        neighborhoods,
        isLoadingTreesData,
        setTrees: (trees: Tree[]) => setTrees(trees),
        setNeighborhoods: (neighborhood: Neighborhood[]) =>
          setNeighborhoods(neighborhood),
        setLoadingTreesData: (value: boolean) => setLoadingTreesData(value),
        filters,
        isLoadingFiltersData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
