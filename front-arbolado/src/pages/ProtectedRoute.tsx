import React, { FC, ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { Spinner, Flex } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="lg" />
      </Flex>
    );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
