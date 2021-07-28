import React from "react";
//UI
import { Stack, HStack, View, Text, useColorModeValue } from "native-base";
//Components
import Divider from "../../components/UI/Divider";

const List = ({ title, first, last, children, ...props }) => {
  const titleColor = useColorModeValue("black", "gray.800");

  return (
    <Stack {...props}>
      {first && <View mt={8}></View>}
      {first && <Divider />}
      <HStack justifyContent="space-between" p={2} bg="gray.300">
        <Text color={titleColor}>{title}</Text>
      </HStack>
      <HStack justifyContent="flex-end" p={2}>
        {children}
      </HStack>
      {!last && <Divider />}
    </Stack>
  );
};

export default List;
