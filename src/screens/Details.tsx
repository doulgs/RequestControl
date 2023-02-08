import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  HStack,
  Text,
  VStack,
  useTheme,
  ScrollView,
  Box,
  useToast,
} from "native-base";
import { Header } from "../components/Header";
import { OrderProps } from "../components/Order";
import firestore from "@react-native-firebase/firestore";
import { OrderFirebaseDTO } from "../DTOs/OrderDTO";
import { dateFormat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";
import { CardDetails } from "../components/CardDetails";

import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface RouteParams {
  orderId: string;
}

interface OrderDetails extends OrderProps {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { orderId } = route.params as RouteParams;

  function handleOrderClose() {
    if (!solution) {
      return toast.show({
        render: () => {
          return (
            <Box bg="#FF000070" px="2" py="1" rounded="sm" mb={10}>
              <Text color="white">Informe uma solução</Text>
            </Box>
          );
        },
      });
    }

    setIsLoadingButton(true);

    firestore()
      .collection<OrderFirebaseDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast.show({
          render: () => {
            return (
              <Box bg="green.500" px="2" py="1" rounded="sm" mb={10}>
                <Text color="white">Solicitação Finalizada</Text>
              </Box>
            );
          },
        });
        setIsLoadingButton(false);
        navigation.goBack();
      })
      .catch((error) => {
        toast.show({
          render: () => {
            return (
              <Box bg="#FF000070" px="2" py="1" rounded="sm" mb={10}>
                <Text color="white">
                  `Não foi possivel Finalizar a solicitação ${error}`
                </Text>
              </Box>
            );
          },
        });
        setIsLoadingButton(false);
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirebaseDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, create_at, closed_at } =
          doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(create_at),
          closed,
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  console.log(order.when);
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          ml={2}
          textTransform="uppercase"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status ? "Em andamento" : "Finalizada"}
        </Text>
      </HStack>

      <ScrollView mb={1} mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="solicitacao"
          description={`N° da solicitação: ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="Descrição da solicitação"
          description={order.description}
          icon={Clipboard}
          footer={order.when}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Finalizada em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              bg="gray.600"
              multiline
              h={24}
              textAlignVertical="top"
              onChangeText={setSolution}
              placeholder="Digite a descricao da Solicitacao"
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          title="Finalizar solicitacao"
          onPress={handleOrderClose}
          isLoading={isLoadingButton}
        />
      )}
    </VStack>
  );
}
