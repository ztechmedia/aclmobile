import React from "react";
import { Stack } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
//Components
import ColorModeWrapper from "../../components/UI/Center";
import AccessCard from "../../components/UI/GetAccess/AccessCard";
import AppBar from "../../components/UI/AppBar";

const GetAccessScreen = ({ navigation }) => {
  return (
    <>
      <AppBar
        title="Akses Manajemen"
        goBack={() => navigation.navigate("Welcome")}
      />
      <ColorModeWrapper>
        <ScrollView contentContainerStyle={styles.ScrollView}>
          <Stack
            direction="column"
            alignItems="center"
            justify="center"
            w="50%"
            p={5}
          >
            <AccessCard
              title="Akses Driver"
              icon="truck-moving"
              onPress={() => navigation.navigate("DriverRegister")}
            />
          </Stack>

          <Stack
            direction="column"
            alignItems="center"
            justify="center"
            w="50%"
            p={5}
          ></Stack>
        </ScrollView>
      </ColorModeWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default GetAccessScreen;
