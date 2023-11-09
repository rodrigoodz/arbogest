import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  FormControl,
  Flex,
  Input,
  Button,
  Box,
  Text,
  Stack,
  Heading,
  Avatar,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormHelperText,
  Link,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { User } from "../types/User";
import { getErrorMessageByCode } from "../helpers/getErrorMessageByCode";
import { Pages } from "../types/Pages";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [error, setError] = useState<string | undefined>();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      setError("");
      await login?.(user.email, user.password);
      // console.log(response);
      setIsLoggingIn(false);
      navigate(Pages.Home);
    } catch (error: any) {
      // console.log(error.code);
      const message = getErrorMessageByCode(error.code);
      setError(message);
      setIsLoggingIn(false);
    }
  };

  if (isLoggingIn) {
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
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bienvenido</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaLock color="gray.300" />}
                  />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link onClick={() => navigate(Pages.PasswordReset)}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                type="submit"
              >
                Ingresar
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

export default Login;
