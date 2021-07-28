import React from "react";
//UI
import {
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  useColorMode,
  HStack,
  Box,
  StatusBar,
} from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
//image
import AclLogo from "../../../assets/img/acl_logo_stroke.png";
//Constants
import Color from "../../../constants/Color";

const Header = () => {
  const statusBarColor = useColorModeValue(
    Color.statusbar,
    Color.statusbarDark
  );

  const headerColor = useColorModeValue(Color.primary, Color.primaryDark);
  const pressedColor = useColorModeValue(Color.pressed, Color.pressedDark);
  const { colorMode, toggleColorMode } = useColorMode();

  let IconComponent =
    colorMode === "light" ? (
      <MaterialIcons name="nights-stay" />
    ) : (
      <Entypo name="light-up" />
    );

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg={headerColor}
        px={1}
        py={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={4}>
          <Image w="50%" h={30} source={AclLogo} alt="Acl Logo" />
        </HStack>
        <HStack space={2}>
          <IconButton
            onPress={toggleColorMode}
            _pressed={{
              backgroundColor: pressedColor,
            }}
            icon={<Icon size="md" as={IconComponent} color="white" />}
          />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
