import React from "react";
//UI
import {
  Pressable,
  Stack,
  View,
  Text,
  Center,
  useColorModeValue,
  useColorMode,
} from "native-base";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";

const CardMenu = ({ icon, title, subtitle, onPress }) => {
  const bg = useColorModeValue(Color.primary, Color.primaryDark);
  const pressedColor = useColorModeValue(Color.pressed, Color.pressedDark);

  return (
    <Pressable
      mx={5}
      w="90%"
      rounded={5}
      mb={2}
      bg={bg}
      _pressed={{
        backgroundColor: pressedColor,
      }}
      onPress={onPress}
    >
      <Stack direction="row">
        <View p={5} w="80%">
          {icon && <FontAwesome5 name={icon} size={24} color="white" />}
          <Text color="white">{title}</Text>
          {subtitle && <Text color="white">{subtitle}</Text>}
        </View>
        <Center w="20%">
          <View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </View>
        </Center>
      </Stack>
    </Pressable>
  );
};

export default CardMenu;
