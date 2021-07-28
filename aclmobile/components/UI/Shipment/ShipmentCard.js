import React from "react";
//UI
import { StyleSheet } from "react-native";
import {
  HStack,
  VStack,
  Stack,
  View,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Image,
  Box,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";
//Components
import Divider from "../Divider";
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
  const iconColor = useColorModeValue(Color.primaryDark, "white");

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
            <View style={styles.Description}>
              <View>
                <CustomText>AWB No</CustomText>
                <CustomText bold>{item.AWB_No}</CustomText>
                <CustomText>Location</CustomText>
                <CustomText bold>{item.Location}</CustomText>
                <CustomText>Account Name</CustomText>
                <CustomText bold>{item.Account_Name}</CustomText>
                <View
                  mt={2}
                  mb={2}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    bg="rgba(0,0,0,0.5)"
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#ccc"
                    p={2}
                    w="40%"
                    alignItems="center"
                  >
                    <Text fontSize={10} color="white">
                      {item.Origin}
                    </Text>
                  </Box>

                  <Ionicons
                    name="arrow-forward-outline"
                    size={24}
                    color={iconColor}
                  />

                  <Box
                    bg="rgba(0,0,0,0.5)"
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#ccc"
                    p={2}
                    w="40%"
                    alignItems="center"
                  >
                    <Text fontSize={10} color="white">
                      {item.Destination}
                    </Text>
                  </Box>
                </View>
                <Divider />
                <HStack mt={1}>
                  <VStack w="80%">
                    <CustomText>Consignee Name</CustomText>
                    <CustomText bold>{item.Consignee_Name}</CustomText>
                  </VStack>
                  <IconButton
                    _pressed={{ backgroundColor: Color.pressed2 }}
                    onPress={onPress}
                    icon={
                      <Icon
                        as={MaterialIcons}
                        name="double-arrow"
                        color="gray.400"
                        size="md"
                      />
                    }
                  />
                </HStack>
              </View>
              <View
                alignItems="center"
                borderColor="rgba(0,0,0,0.5)"
                borderWidth={1}
                p={2}
                rounded={5}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <CustomText bold>{item.Transport}</CustomText>
                <CustomText bold>{item.Type_Transport}</CustomText>
              </View>
            </View>
          </HStack>
        </View>
      </HStack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  Description: {
    width: "95%",
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
