import React, { useState } from "react";
import { Box, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert, Keyboard } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Informe Todos os Campos");
    }
    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        create_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Keyboard.dismiss();

        toast.show({
          render: () => {
            return (
              <Box bg="green.500" px="2" py="1" rounded="sm" mb={10}>
                <Text color="white">Solicitação inserida</Text>
              </Box>
            );
          },
        });
        setIsLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert("Solicitação", "Erro ao gravar dados");
      });
  }

  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title="Nova Solicitação" />

      <Input
        placeholder="Numero da Solicitação"
        keyboardType="numeric"
        value={patrimony}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Cadastrar"
        mt={5}
        onPress={() => handleNewOrderRegister()}
        isLoading={isLoading}
      />
    </VStack>
  );
}
