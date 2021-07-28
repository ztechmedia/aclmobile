import React from "react";
//UI
import { StyleSheet, ScrollView } from "react-native";
import {
  HStack,
  Stack,
  View,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Image,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";
//Image
import MovingTruck from "../../../assets/img/moving_truck.png";
import DocumentDelivered from "../../../assets/img/document_delivered.png";
import Unloading from "../../../assets/img/unloading.png";
import Stop from "../../../assets/img/stop.png";

const CustomText = ({ children, ...props }) => (
  <Text {...props} fontSize={props.size ? props.size : 12}>
    {children}
  </Text>
);

const ShipmentCard = ({ item, onPress }) => {
  const bg = useColorModeValue("white", Color.primaryDark);
  let activeColor = "#ddd";
  let sourceImage = Unloading;

  if (
    item.AWB_Status === "DOCUMENT RECEIVED" ||
    item.AWB_Status === "RECEIVED"
  ) {
    activeColor = "#3b82f6";
    sourceImage = DocumentDelivered;
  } else if (
    item.AWB_Status === "ATTEMP DELIVERY" ||
    item.AWB_Status === "FAILED DELIVERY" ||
    item.AWB_Status === "CANCELED"
  ) {
    activeColor = "red";
    sourceImage = Stop;
  } else if (
    item.AWB_Status !== "PROCESSED" ||
    item.AWB_Status !== "PROCESSED2"
  ) {
    activeColor = "limegreen";
    sourceImage = MovingTruck;
  }

  return (
    <Stack bg={bg} mb={1}>
      <HStack>
        <View style={styles.LeftContent}>
          <View style={styles.InitialContainer}>
            <View style={styles.InitialContent}>
              <Image
                rounded={40}
                w="100%"
                h="100%"
                source={sourceImage}
                alt={item.AWB_No}
              />
            </View>

            <View
              h={5}
              w={5}
              mt={1}
              style={{ backgroundColor: activeColor, borderRadius: 10 }}
            ></View>
            <CustomText>{item.AWB_Date}</CustomText>
          </View>
        </View>

        <View style={styles.RightContent} py={1}>
          <HStack>
            <ScrollView style={styles.Description}>
              <CustomText>AWB No:</CustomText>
              <CustomText bold> {item.AWB_No}</CustomText>
              <CustomText>Account Name:</CustomText>
              <CustomText bold>{item.Account_Name}</CustomText>
              <CustomText>Destination:</CustomText>
              <CustomText bold>{item.Destination}</CustomText>
              <CustomText>Consignee Name</CustomText>
              <CustomText bold>{item.Consignee_Name}</CustomText>
              <CustomText>Consignee Addres</CustomText>
              <CustomText bold>{item.Consignee_Addr}</CustomText>
            </ScrollView>

            <View style={styles.ArrowCard}>
              <IconButton
                _pressed={{ backgroundColor: Color.pressed2 }}
                onPress={onPress}
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="arrow-forward-ios"
                    color="gray.400"
                    size="md"
                  />
                }
              />
            </View>
          </HStack>
        </View>
      </HStack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  Description: {
    width: "80%",
  },
  ArrowCard: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  LeftContent: {
    flex: 1,
    flexDirection: "column",
    height: 190,
  },
  RightContent: {
    flex: 3,
    height: "100%",
  },
  InitialContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  InitialContent: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
  },
  Divider: {
    position: "absolute",
    bottom: 0,
  },
});

export default ShipmentCard;
