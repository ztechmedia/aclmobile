import React from "react";
//UI
import {
  HStack,
  IconButton,
  Icon,
  Text,
  Box,
  StatusBar,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
//Constants
import Color from "../../constants/Color";

function AppBar({ title, goBack, children, onRightPress }) {
  const statusBarColor = useColorModeValue(
    Color.statusbar,
    Color.statusbarDark
  );

  const headerColor = useColorModeValue("white", Color.primaryDark);
  const headerTextColor = useColorModeValue(Color.primary, "white");

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg={headerColor}
        px={1}
        py={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={4} alignItems="center">
          <IconButton
            onPress={goBack}
            icon={
              <Icon
                size="sm"
                as={<MaterialIcons name="arrow-back-ios" />}
                color={headerTextColor}
              />
            }
            _pressed={{
              backgroundColor: Color.pressed2,
            }}
          />
          <Text
            color={headerTextColor}
            fontSize={20}
            fontWeight="bold"
            w={onRightPress ? "65%" : "85%"}
          >
            {title}
          </Text>
          {onRightPress && (
            <IconButton
              _pressed={{
                backgroundColor: Color.pressed2,
              }}
              onPress={onRightPress}
              icon={
                <Icon
                  size="md"
                  as={<MaterialIcons name="refresh" />}
                  color={headerTextColor}
                />
              }
            />
          )}
        </HStack>
        {children}
      </HStack>
    </>
  );
}

export default AppBar;
