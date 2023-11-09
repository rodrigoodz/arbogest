import { Button, Flex, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";
import { Map } from "leaflet";
import TreeSpinner from "../TreeSpinner/TreeSpinner";
import { FilterName } from "../../types/Filter";
import { useQueryParams } from "use-query-params";
import { useData } from "../../context/dataContext";

interface Props {
  map?: Map;
  disabled?: boolean;
  disabledText?: string;
}

const MapFilters: FC<Props> = ({ disabled, disabledText }) => {
  const { isLoadingFiltersData, filters } = useData();

  const [query, setQuery] = useQueryParams();

  const handleResetFilters = () => {
    const cleanedParams = Object.keys(query).reduce(
      (acc: Record<string, string | undefined>, key) => {
        acc[key] = undefined;
        return acc;
      },
      {}
    );
    setQuery(cleanedParams);
  };

  const handleOnChange = (param: string, e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    if (!value) {
      return setQuery({ [param]: undefined });
    }
    setQuery({ [param]: value });
  };

  return (
    <Flex
      bg="#95a5a6"
      color="blue.700"
      flex="1"
      alignItems={"center"}
      justifyContent={"center"}
    >
      {isLoadingFiltersData ? (
        <TreeSpinner />
      ) : (
        <Flex
          h="100%"
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap="4"
          px={2}
          py={4}
          cursor={disabled ? "default" : undefined}
          pointerEvents={disabled ? "none" : "all"}
        >
          {disabled && (
            <Text fontSize={"xl"} position={"absolute"} color="white">
              {disabledText ?? "Debe seleccionar un barrio"}
            </Text>
          )}
          <Flex
            h="100%"
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            opacity={disabled ? "0.2" : undefined}
          >
            <Flex flexWrap={"wrap"} gap="2">
              {filters &&
                Object.entries(filters).map(([key, value]) => {
                  const placeholder =
                    FilterName[key as keyof typeof FilterName] ?? key;
                  return (
                    <Select
                      key={key}
                      placeholder={placeholder}
                      width={"max-content"}
                      flexGrow="1"
                      variant="filled"
                      bg={query[key] ? "#bdc3c7" : undefined}
                      _hover={{ bg: "#bdc3c7" }}
                      value={query[key] ?? ""}
                      onChange={(e) => handleOnChange(key, e)}
                      size={"sm"}
                    >
                      {value.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </Select>
                  );
                })}
            </Flex>
            <Button
              color={"white"}
              bg="#2c3e50"
              _hover={{ bg: "#34495e" }}
              onClick={handleResetFilters}
              size={"sm"}
            >
              Reiniciar filtros
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default MapFilters;
