import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useData } from "../../context/dataContext";
import { SearchParam } from "../../types/Pages";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { Select } from "chakra-react-select";
import { Tree } from "../../types/Tree";

interface Option {
  label: string;
  value: number;
}

const TreeSelect = () => {
  const { isLoadingTreesData, trees } = useData();
  const [selectedTreeId, setSelectedTreeId] = useGetAndSetQueryParam(
    SearchParam.Id
  );
  const [selectedTree, setSelectedTree] = useState<Option>();

  useEffect(() => {
    if (!selectedTreeId) return;
    setSelectedTree({
      value: Number(selectedTreeId),
      label: selectedTreeId,
    });
  }, [selectedTreeId]);

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
        noOptionsMessage={() => "No hay opciones"}
        placeholder="Ingrese el id"
        useBasicStyles
        isClearable
        value={selectedTree}
        onChange={(value) => {
          setSelectedTree(value as Option);
          setSelectedTreeId(value?.value.toString());
        }}
        options={trees.map((v: Tree) => {
          return { value: v.tree_id, label: String(v.tree_id) };
        })}
      />
    </Flex>
  );
};

export default TreeSelect;
