import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  Text,
  VStack,
  HStack,
  Heading,
  FlatList,
  useTheme,
  IconButton,
  Center,
} from "native-base";

import Logo from "../assets/lg_secondary.svg";
import SingOutIcon from "../assets/icons/singout.svg";

import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";

import { ChatTeardropText } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { dateFormat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        return Alert.alert("#ERROR", "Não foi possivel sair");
      });
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  useEffect(() => {
    setLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, create_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(create_at),
          };
        });
        setOrders(data);
        setLoading(false);
      });
    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SingOutIcon height={17} width={17} fill="#FF000070" />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus Chamados</Heading>

          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText size={50} color={colors.gray[400]} />
                <Text color="gray.400" fontSize="xl" mt={6} textAlign="center">
                  Você não possui {`\n`}
                  Solicitação{" "}
                  {statusSelected === "open"
                    ? "em aberto no momento"
                    : "Finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
