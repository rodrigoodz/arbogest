import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FormControl,
  Flex,
  Input,
  Button,
  Box,
  Text,
  Stack,
  Heading,
  Center,
  Spinner,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getErrorMessageByCode } from "../helpers/getErrorMessageByCode";
import { Pages } from "../types/Pages";
import axios from "axios";
import { Request } from "../types/Request";
import { Select } from "chakra-react-select";
import { UserCityRole } from "../types/User";

interface Option {
  label: string;
  value: string;
}

interface UserInfo {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo>({
    email: "",
    password: "",
    name: "",
    lastName: "",
  });
  const [role, setRole] = useState<Option>();
  const [city, setCity] = useState<Option>();
  const [cities, setCities] = useState<Option[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_BASE_URL}/cities`;
        const response = await axios.get(url);
        // TODO unificar el siguiente tipado con UserCity
        const responseData: Request<
          {
            city_id: number;
            city_name: string;
            latitude: number;
            longitude: number;
            zoom: number;
          }[]
        > = response.data;
        const cities =
          responseData.data?.map((city) => {
            return { value: String(city.city_id), label: city.city_name };
          }) ?? [];
        setCities(cities);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getCities();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      const response = await signup?.(user.email, user.password);
      if (response && response.user) {
        const firebaseId = response.user.uid;
        axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {
          name: user.name,
          surname: user.lastName,
          id_city: city?.value,
          role: role?.value,
          firebase_id: firebaseId,
        });
      }
      setIsLoading(false);
      //  TODO revisar si se puede modificar para que cuando registrar un usuario nuevo
      // automaticamente no cambie a ese usuario creado
      navigate(Pages.Home);
    } catch (error: any) {
      console.log(error);
      const message = getErrorMessageByCode(error.code);
      setError(message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Center backgroundColor="gray.200" w="100vw" h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Registrar usuario</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {/*
              Estos componentes estan aca porque chrome tiene un tema y es que
              autocompleta siempre cuando hay un input de user y otro de password a pesar
              de que autocomplete sea off. Con estos inputs fake se evita el autocompletado
              */}
              <input
                type="text"
                name="prevent_autofill"
                id="prevent_autofill"
                value=""
                style={{ display: "none" }}
              />
              <input
                type="password"
                name="password_fake"
                id="password_fake"
                value=""
                style={{ display: "none" }}
              />
              <HStack>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="surname">Apellido</FormLabel>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel htmlFor="passwordRepeat">Repetir contraseña</FormLabel>
                <Input
                  type="password"
                  id="passwordRepeat"
                  name="passwordRepeat"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel htmlFor="role">Rol</FormLabel>
                <Select
                  isSearchable={false}
                  noOptionsMessage={() => "No hay opciones"}
                  required
                  placeholder="Selecciona un rol"
                  useBasicStyles
                  isClearable
                  value={role}
                  onChange={(value) => {
                    setRole(value as Option);
                  }}
                  options={Object.values(UserCityRole).map((v) => {
                    return { value: v, label: v };
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="city">Ciudad</FormLabel>
                <Select
                  id="city"
                  name="city"
                  isSearchable={false}
                  noOptionsMessage={() => "No hay opciones"}
                  required
                  placeholder="Selecciona una ciudad"
                  useBasicStyles
                  isClearable
                  value={city}
                  onChange={(value) => {
                    setCity(value as Option);
                  }}
                  options={cities}
                />
              </FormControl>
              <Button
                type="submit"
                backgroundColor="teal.400"
                color="white"
                _hover={{ bg: "teal.500" }}
              >
                Registrarse
              </Button>
              <Button
                borderRadius={0}
                variant="outline"
                colorScheme="teal"
                width="full"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Stack>
          </form>
        </Box>
        {error && (
          <Text fontSize={"xl"} color="red" mt={8}>
            {error}
          </Text>
        )}
      </Stack>
    </Flex>
  );
};

export default Register;
