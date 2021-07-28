import React from "react";
import { ScrollView, Dimensions } from "react-native";
//UI
import { View } from "native-base";
//Components
import ColorModeWrapper from "../components/UI/Center";
import CardMenu from "../components/UI/Welcome/CardMenu";
import AclHeader from "../components/UI/Welcome/Header";
import AclWelcomeImg from "../components/UI/Welcome/WelcomeImg";
import Menu from "../components/UI/Welcome/Menu";
import BottomButton from "../components/UI/BottomButton";

const HEIGHT = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  return (
    <>
      <AclHeader />
      <ColorModeWrapper>
        <ScrollView
          width="100%"
          flex={1}
          contentContainerStyle={{
            paddingBottom: 55,
          }}
        >
          <View w="100%" h={HEIGHT * 0.4}>
            <AclWelcomeImg
              title="Hallo Pegawai!"
              subtitle="Selamat datang di ACL Mobile"
            />
          </View>

          <View
            w="100%"
            h={45}
            alignItems="center"
            marginTop={-(45 / 2)}
            mb={4}
          >
            <Menu>MENU</Menu>
          </View>

          <CardMenu
            icon="truck-moving"
            title="Pengiriman"
            onPress={() => navigation.navigate("ShipmentLogin")}
          />
        </ScrollView>

        <BottomButton
          icon="key"
          btnName="Dapatkan Akses"
          onPress={() => navigation.navigate("GetAccess")}
          h={55}
        />
      </ColorModeWrapper>
    </>
  );
};

export default WelcomeScreen;
