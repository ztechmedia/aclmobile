import React from "react";
//UI
import {
  Center,
  Text,
  Pressable,
  useColorModeValue,
  useColorMode,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";

const AccessCard = ({ title, icon, onPress }) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", Color.primaryDark);
  const textColor = colorMode === "light" ? Color.primaryDark : "white";

  return (
    <Pressable
      p={5}
      rounded={5}
      shadow={3}
      bg={bg}
      _pressed={{
        backgroundColor: Color.pressedDark,
      }}
      onPress={onPress}
    >
      <Center>
        <FontAwesome5 name={icon} size={24} color={textColor} />
        <Text color={textColor}>{title}</Text>
      </Center>
    </Pressable>
  );
};

export default AccessCard;
