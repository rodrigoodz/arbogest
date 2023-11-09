import { SearchParam } from "../types/Pages";
import { useQueryParams, StringParam } from "use-query-params";

export const useGetAndSetQueryParam = (
  searchParam: SearchParam
): [string | undefined, (v?: string) => void] => {
  const [query, setQuery] = useQueryParams({
    [searchParam]: StringParam,
  });

  const { [searchParam]: searchParamQuery } = query;

  const handleSetQuery = (param?: string) => {
    setQuery({ [searchParam]: param });
  };

  return [searchParamQuery ?? undefined, handleSetQuery];
};
