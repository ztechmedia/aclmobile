import React from "react";
//UI
import { Text, View, Switch, HStack, useColorMode } from "native-base";
//Component
import AppBar from "../components/UI/AppBar";
import ColorModeWrapper from "../components/UI/Center";
import Divider from "../components/UI/Divider";

const SettingScreen = ({ navigation }) => {
  const goBack = navigation.getParam("goBack");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <AppBar title="Setting" goBack={goBack} />
      <ColorModeWrapper>
        <View h="100%" w="100%">
          <HStack justifyContent="space-between" p={3}>
            <Text>Dark Mode</Text>
            <Switch
              isChecked={colorMode === "dark"}
              onToggle={toggleColorMode}
            />
          </HStack>
          <Divider />
        </View>
      </ColorModeWrapper>
    </>
  );
};

export default SettingScreen;
