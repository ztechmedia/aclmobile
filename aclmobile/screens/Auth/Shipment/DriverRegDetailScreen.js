import React from "react";
import { useSelector, useDispatch } from "react-redux";
//UI
import { View, Text, useColorModeValue } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";
//Components
import ColorModeWrapper from "../../../components/UI/Center";
import Button from "../../../components/UI/Button";
import AppBar from "../../../components/UI/AppBar";
import CardTopLeftIcon from "../../../components/UI/CardTopLeftIcon";
//Redux Action
import { setDriverPassword, logout } from "../../../store/actions/auth";

const DriverRegDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);

  const rider = token
    ? useSelector((state) => state.auth.user)
    : useSelector((state) => state.auth.rider);

  const textColor = useColorModeValue(Color.primaryDark, "white");

  if (!rider) {
    return (
      <ColorModeWrapper>
        <Text color={textColor}>Data Driver Kosong!</Text>
      </ColorModeWrapper>
    );
  }

  const submitHandler = () => dispatch(setDriverPassword(rider.Phone));
  const logoutHandler = () => dispatch(logout());

  const CardContent = (props) => (
    <View style={styles.TextContainer} {...props}>
      <Text color={textColor}>{props.title} </Text>
      <Text bold color={textColor}>
        {props.value}
      </Text>
    </View>
  );

  return (
    <>
      <AppBar
        title={!token ? "Akses Manajemen" : "Profil Driver"}
        goBack={() =>
          !token
            ? navigation.navigate("DriverRegister")
            : navigation.navigate("ShipmentHome")
        }
      />
      <ColorModeWrapper>
        <View style={styles.Container}>
          <View style={styles.TitleContainer}>
            <Text italic color={textColor}>
              {!token ? "Driver Teridentikasi" : "Data Driver"}
            </Text>
          </View>

          <CardTopLeftIcon
            icon={
              <FontAwesome5 name="user-check" size={24} color={textColor} />
            }
          >
            <CardContent title="ID" value={rider.Rider_ID} mt={7} />
            <CardContent title="Nama" value={rider.Rider_Name} />
            <CardContent title="No. Handphone" value={rider.Phone} />
          </CardTopLeftIcon>

          <CardTopLeftIcon
            mt={8}
            icon={<FontAwesome5 name="id-card" size={24} color={textColor} />}
          >
            <CardContent title="SIM" value={rider.Type_SIM} mt={7} />
          </CardTopLeftIcon>

          <CardTopLeftIcon
            mt={8}
            icon={
              <FontAwesome5 name="id-card-alt" size={24} color={textColor} />
            }
          >
            <CardContent title="Status" value={rider.Status} mt={7} />
            <CardContent
              title="Status Karyawan"
              value={rider.Status_Karyawan}
            />
          </CardTopLeftIcon>

          {!token ? (
            <Button
              mt={3}
              _text={{ color: "white" }}
              isDisabled={loading}
              isLoading={loading}
              isLoadingText="Generating..."
              onPress={submitHandler}
            >
              Generate Password
            </Button>
          ) : (
            <Button
              mt={3}
              _text={{ color: "white" }}
              isDisabled={loading}
              isLoading={loading}
              isLoadingText="Generating..."
              onPress={logoutHandler}
              colorScheme="red"
            >
              Logout
            </Button>
          )}
        </View>
      </ColorModeWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  TextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 20,
    marginBottom: 10,
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});
export default DriverRegDetailScreen;
