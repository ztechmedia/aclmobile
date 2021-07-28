import React from "react";
//UI
import { Center, useColorModeValue } from "native-base";

export default ({ children, ...props }) => {
  const bg = useColorModeValue("gray.200", "gray.800");
  return (
    <Center flex={1} bg={bg} {...props}>
      {children}
    </Center>
  );
};
