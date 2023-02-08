import React from "react";
import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from "native-base";

import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
interface PropsHeader extends StyledProps {
  title: string;
}

export function Header({ title, ...rest }: PropsHeader) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={5}
      px={6}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
      />

      <Heading
        flex={1}
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
