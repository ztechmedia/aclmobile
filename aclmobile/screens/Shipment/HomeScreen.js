import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//UI
import { ScrollView, Dimensions } from "react-native";
import { View, Text, Stack, HStack } from "native-base";
//Component
import ColorModeWrapper from "../../components/UI/Center";
import WelcomeImg from "../../components/UI/Welcome/WelcomeImg";
import Menu from "../../components/UI/Welcome/Menu";
import CardMenu from "../../components/UI/Welcome/CardMenu";
import Card from "../../components/UI/Card";
import StatusBar from "../../components/UI/StatusBar";
import BottomButton from "../../components/UI/BottomButton";
import ActivityIndicator from "../../components/UI/ActivityIndicator";
//Utils
import { indoDate, indoMonth } from "../../utils/utility";
//Redux Action
import { riderPerformance } from "../../store/actions/shipment";

const HEIGHT = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const rider = useSelector((state) => state.auth.user);
  const performance = useSelector((state) => state.shipment.riderPerformance);

  let loadScreen = <ActivityIndicator />;
  let performanceScreen = <ActivityIndicator />;

  useEffect(() => {
    if (!performance && rider) {
      dispatch(riderPerformance(rider.Rider_Name));
    }
  }, [performance, rider]);

  if (performance) {
    const { Shipment_Finish, Shipment_Canceled, Shipment_Failed } = performance;

    performanceScreen = (
      <Stack w="90%" mx={5}>
        <HStack>
          <Card w="100%" bg="blue.500" title="Finish" value={Shipment_Finish} />
        </HStack>
        <HStack mt={1}>
          <Card
            mr={1}
            w="49%"
            bg="orange.500"
            title="Canceled"
            value={Shipment_Canceled}
          />
          <Card
            mr={1}
            w="49%"
            bg="red.500"
            title="Failed"
            value={Shipment_Failed}
          />
        </HStack>
      </Stack>
    );
  }

  if (rider) {
    loadScreen = (
      <>
        <StatusBar />
        <ColorModeWrapper>
          <ScrollView
            width="100%"
            flex={1}
            contentContainerStyle={{
              paddingBottom: HEIGHT * 0.15,
            }}
          >
            <View w="100%" h={HEIGHT * 0.4}>
              <WelcomeImg
                title={`Hallo ${rider.Rider_Name}!`}
                subtitle="Selamat datang di Mobile Driver Delivery"
                rightIcon={true}
                goTo={() => navigation.navigate("DriverRegDetail")}
              />
            </View>

            <View
              w="100%"
              h={45}
              alignItems="center"
              marginTop={-(45 / 2)}
              mb={4}
            >
              <Menu>DRIVER MENU</Menu>
            </View>

            <CardMenu
              title="Pengiriman Pertanggal"
              subtitle={indoDate(new Date())}
              onPress={() => navigation.navigate("ShipmentDaily")}
            />

            <CardMenu
              title="Pengiriman Perbulan"
              subtitle={indoMonth(new Date())}
              onPress={() => navigation.navigate("ShipmentMonthly")}
            />

            {performanceScreen}
          </ScrollView>
          <BottomButton
            icon="cog"
            btnName="Pengaturan"
            onPress={() =>
              navigation.navigate("Setting", {
                goBack: () => navigation.navigate("ShipmentHome"),
              })
            }
            h={55}
          />
        </ColorModeWrapper>
      </>
    );
  }

  return loadScreen;
};

export default HomeScreen;
