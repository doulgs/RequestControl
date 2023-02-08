import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Box, Heading, Icon, useTheme, useToast, VStack } from "native-base";

import Logo from "../assets/Logo.svg";
import Envelope from "../assets/icons/envelope.svg";
import Lock from "../assets/icons/lock.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

import { Keyboard } from "react-native";

export const SingIn: React.FC = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  function handleSingIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "informe um email e password");
    }
    if (password.length < 6) {
      return Alert.alert("#ERROR", "quantidade de caracteres incorretos");
    }
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((error) => {
        console.log(error.code);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Login invalido", "Dados de Login Invalidos");
        }
        if (error.code === "auth/wrong-password") {
          return Alert.alert("Login invalido", "Dados de Login Invalidos");
        }
        if (error.code === "auth/user-not-found") {
          return Alert.alert("Login invalido", "Usuario Inexistente");
        }

        return Alert.alert("Login", "Não foi possível acessar sua conta");
      });

    Keyboard.dismiss();

    toast.show({
      render: () => {
        return (
          <Box bg="green.500" px="2" py="1" rounded="sm" mb={10}>
            Não esqueca de conferir as solicitações
          </Box>
        );
      },
    });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo width={200} height={200} />

      <Heading color="gray.100" fontSize="xl" mt={6} mb={6}>
        Acessar sua conta
      </Heading>

      <Input
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon
            as={<Envelope width={20} height={20} fill={colors.gray[300]} />}
            ml={4}
          />
        }
        value={email}
        onChangeText={setEmail}
      />

      <Input
        autoCapitalize="none"
        mb={8}
        placeholder="Senha"
        secureTextEntry={true}
        InputLeftElement={
          <Icon
            as={<Lock width={20} height={20} fill={colors.gray[300]} />}
            ml={4}
          />
        }
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={() => handleSingIn()}
        isLoading={isLoading}
      />
    </VStack>
  );
};
