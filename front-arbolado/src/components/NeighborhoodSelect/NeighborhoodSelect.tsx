import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useData } from "../../context/dataContext";
import { SearchParam } from "../../types/Pages";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { Select } from "chakra-react-select";

interface Option {
  label: string;
  value: number;
}

const NeighborhoodSelect = () => {
  const { isLoadingTreesData, neighborhoods } = useData();
  const [selectedNeighborhoodID, setSelectedNeighborhoodID] =
    useGetAndSetQueryParam(SearchParam.Id);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Option>();

  // TODO buscar una libreria para reemplazar el SelectInput y no tener que hacer esta asquerosidad con
  // el useEffect. Si buscaria una libreria como la gente, lo haria con el onChange del SelectInput

  useEffect(() => {
    const selectedNeighborhood = neighborhoods.find(
      (n) => n.id === Number(selectedNeighborhoodID)
    );
    if (!selectedNeighborhood) return;
    setSelectedNeighborhood({
      value: selectedNeighborhood.id,
      label: selectedNeighborhood.name,
    });
  }, [selectedNeighborhoodID, neighborhoods]);
  return (
    <Flex gap={2} alignItems={"center"} justify={"center"} zIndex={5000}>
      <Select
        isDisabled={isLoadingTreesData}
        size="sm"
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            backgroundColor: "gray.200",
            width: "200px",
          }),
        }}
        isSearchable={false}
        noOptionsMessage={() => "No hay opciones"}
        placeholder="Selecciona un barrio"
        useBasicStyles
        isClearable
        value={selectedNeighborhood}
        onChange={(value) => {
          setSelectedNeighborhood(value as Option);
          setSelectedNeighborhoodID(value?.value.toString());
        }}
        options={neighborhoods.map((v) => {
          return { value: v.id, label: v.name };
        })}
      />
    </Flex>
  );
};

export default NeighborhoodSelect;
