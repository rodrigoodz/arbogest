import { Checkbox, Flex, Input, Stack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import NeighborhoodSelect from "../NeighborhoodSelect/NeighborhoodSelect";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { SearchParam } from "../../types/Pages";
import { useData } from "../../context/dataContext";
import TreeSelect from "../TreeSelect/TreeSelect";

interface Props {
  showNeighborhoodSelect?: boolean;
  showTreeSelect?: boolean;
  showDatesInput?: boolean;
}

const FiltersHeader: FC<Props> = ({
  showNeighborhoodSelect,
  showTreeSelect,
  showDatesInput = true,
}) => {
  const { isLoadingTreesData } = useData();
  const [startDate, setStartDate] = useGetAndSetQueryParam(
    SearchParam.StartDate
  );
  const [endDate, setEndDate] = useGetAndSetQueryParam(SearchParam.EndDate);
  const [showAll, setShowAll] = useState<boolean>(true);

  const removeDatesQueryParams = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const uncheckShowAllIfActive = (value?: string) =>
    value && showAll && setShowAll(false);

  const disabledInputs = isLoadingTreesData;

  return (
    <Flex
      flexDir={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={6}
      py={2}
    >
      {showNeighborhoodSelect && <NeighborhoodSelect />}
      {showTreeSelect && <TreeSelect />}
      {showDatesInput && (
        <Stack
          spacing={6}
          direction="row"
          w={"min-content"}
          justifyContent={"center"}
          alignItems={"center"}
          color="white"
        >
          <Input
            disabled={disabledInputs}
            size="xs"
            placeholder="Fecha inicio"
            type="date"
            borderRadius="2px"
            value={startDate ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setStartDate(value);
              uncheckShowAllIfActive(value);
            }}
          />
          <Input
            disabled={disabledInputs}
            size="xs"
            placeholder="Fecha fin"
            type="date"
            borderRadius="2px"
            value={endDate ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setEndDate(value);
              uncheckShowAllIfActive(value);
            }}
          />
          <Checkbox
            isDisabled={disabledInputs}
            isChecked={showAll}
            onChange={(e) => {
              setShowAll(e.target.checked);
              removeDatesQueryParams();
            }}
            whiteSpace={"nowrap"}
            size={"sm"}
            fontWeight={"bold"}
          >
            Mostrar todos
          </Checkbox>
        </Stack>
      )}
    </Flex>
  );
};

export default FiltersHeader;
