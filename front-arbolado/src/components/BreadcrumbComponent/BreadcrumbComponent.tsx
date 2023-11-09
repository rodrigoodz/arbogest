import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Pages } from "../../types/Pages";
import { Link } from "react-router-dom";

interface Props {
  currentPage: Pages;
  separator?: string;
}

const BreadcrumbComponent: FC<Props> = ({ currentPage, separator = "-" }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem isCurrentPage={currentPage === Pages.Home}>
        <Link to={Pages.Home}>
          <Text color={currentPage === Pages.Home ? "white" : undefined}>
            Mapa/Ciudad
          </Text>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage={currentPage === Pages.Neighborhood}>
        <Link to={Pages.Neighborhood}>
          <Text
            color={currentPage === Pages.Neighborhood ? "white" : undefined}
          >
            Barrio
          </Text>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage={currentPage === Pages.Tree}>
        <Link to={Pages.Tree}>
          <Text color={currentPage === Pages.Tree ? "white" : undefined}>
            Arbol
          </Text>
        </Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
