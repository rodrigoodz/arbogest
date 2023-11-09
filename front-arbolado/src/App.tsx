import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/authContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import { Pages, SearchParam } from "./types/Pages";
import Neighborhood from "./pages/Neighborhood";
import Tree from "./pages/Tree";
import { DataProvider } from "./context/dataContext";
import {
  QueryParamConfigMap,
  QueryParamProvider,
  StringParam,
} from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Register from "./pages/Register";
import { FilterName } from "./types/Filter";
import PasswordReset from "./pages/PasswordReset";

const getAllQueryParamsOptions = (): QueryParamConfigMap => {
  const searchParams = Object.values(SearchParam);
  const filterNameParams = Object.keys(FilterName);
  const obj: QueryParamConfigMap = [
    ...searchParams,
    ...filterNameParams,
  ].reduce((acc: QueryParamConfigMap, key) => {
    acc[key] = StringParam;
    return acc;
  }, {});
  return obj;
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        params: getAllQueryParamsOptions(),
      }}
    >
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route
              path={Pages.Home}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={Pages.Neighborhood}
              element={
                <ProtectedRoute>
                  <Neighborhood />
                </ProtectedRoute>
              }
            />
            <Route
              path={Pages.Tree}
              element={
                <ProtectedRoute>
                  <Tree />
                </ProtectedRoute>
              }
            />
            <Route
              path={Pages.Register}
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path={Pages.Login} element={<Login />} />
            <Route path={Pages.PasswordReset} element={<PasswordReset />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </QueryParamProvider>
  </ChakraProvider>
);
