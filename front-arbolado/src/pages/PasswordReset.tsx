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
  InputGroup,
  InputLeftElement,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { getErrorMessageByCode } from "../helpers/getErrorMessageByCode";
import { Pages } from "../types/Pages";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setisSubmitting(true);
      setError("");
      await passwordReset?.(email);
      setisSubmitting(false);
      toast({
        title: "Email enviado",
        description: "Se ha enviado un mail para recuperar su contraseña",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(Pages.Home);
    } catch (error: any) {
      // console.log(error.code);
      const message = getErrorMessageByCode(error.code);
      setError(message);
      setisSubmitting(false);
    }
  };

  if (isSubmitting) {
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
        <Heading color="teal.400">Recuperar contraseña</Heading>
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
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                type="submit"
              >
                Enviar
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

export default PasswordReset;
