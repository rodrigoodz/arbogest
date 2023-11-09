import { Button, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Pages } from "../../types/Pages";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { UserCityRole } from "../../types/User";

interface Props {
  currentPage: Pages;
}

const Header: FC<Props> = ({ currentPage }) => {
  const { user, userCity, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout?.();
  };

  return (
    <Flex
      bg="#95a5a6"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
      color="blue.800"
      fontWeight={"bold"}
      w="full"
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
      // position={"sticky"}
      // top="0"
      // left="0"
    >
      <BreadcrumbComponent currentPage={currentPage} />
      <Flex gap={6} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize="sm">{user?.email}</Text>
        {userCity?.role === UserCityRole.Admin && (
          <Button
            size="xs"
            onClick={() => {
              navigate(Pages.Register);
            }}
            bg="#2c3e50"
            color="white"
            _hover={{ bg: "#34495e" }}
            borderRadius="base"
          >
            Registrar nuevo usuario
          </Button>
        )}
        <Button
          size="xs"
          onClick={handleLogout}
          bg="#2c3e50"
          color="white"
          _hover={{ bg: "#34495e" }}
          borderRadius="base"
        >
          Salir
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
