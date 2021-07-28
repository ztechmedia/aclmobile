import React from "react";
//UI
import { Center, Text, useColorModeValue, useColorMode } from "native-base";
//Constants
import Color from "../../../constants/Color";

const Menu = ({ children, ...props }) => {
  const bg = useColorModeValue("white", Color.primaryDark);
  const textColor = useColorModeValue(Color.primary, "white");

  return (
    <Center rounded={5} w="90%" h="100%" bg={bg} shadow={3} {...props}>
      <Text color={textColor} bold>
        {children}
      </Text>
    </Center>
  );
};

export default Menu;
