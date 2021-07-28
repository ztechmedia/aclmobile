import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//UI
import {
  Text,
  View,
  useColorModeValue,
  Image,
  IconButton,
  Icon,
  Stack,
  VStack,
  HStack,
  Box,
  Accordion,
  useToast,
} from "native-base";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons, Ionicons, Octicons } from "@expo/vector-icons";
//Components
import ColorModeWrapper from "../../components/UI/Center";
import ActivityIndicator from "../../components/UI/ActivityIndicator";
import Stepper from "../../components/UI/Stepper";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Shipment/ShipmentStatusModal";
import OptionModal from "../../components/UI/Shipment/ShipmentOptionModal";
import Divider from "../../components/UI/Divider";
import OutgoingCard from "../../components/UI/Shipment/ShipmentCardOutgoing";
import ShipmentStatusCard from "../../components/UI/Shipment/ShipmentStatusCard";
import ImageList from "../../components/UI/ImageList";
//Constants
import Color from "../../constants/Color";
//Image
import AclImage from "../../assets/img/operator.jpeg";
//Redux Action
import {
  shipmentByAwb,
  changeAwbStatus,
  changeAwbStatusWithReason,
  shipmentOutgoings,
  clearShipment,
  shipmentMonthly,
  shipmentDaily,
} from "../../store/actions/shipment";
//Utils
import { scrollPositionByStatus, uuid } from "../../utils/utility";

const HEIGHT = Dimensions.get("window").height;

const CustomButton = ({ status, onPress, style }) => {
  let buttonText;
  let icon;

  switch (status) {
    case "PROCESSED":
    case "PROCESSED2":
      buttonText = "Mulai Pengiriman";
      icon = "play";
      break;
    case "DELIVERY":
      buttonText = "Upload Document";
      icon = "document";
      break;
    case "RECEIVED":
    case "DOCUMENT RECEIVED":
      buttonText = "View Document";
      icon = "eye-sharp";
      break;
    default:
      buttonText = "Next Proses";
      icon = "arrow-forward";
  }

  return (
    <Button
      {...style}
      bg="blue.500"
      _pressed={{
        backgroundColor: Color.pressed,
      }}
      _text={{ color: "white" }}
      onPress={onPress}
      endIcon={<Icon as={Ionicons} name={icon} size={4} />}
    >
      {buttonText}
    </Button>
  );
};

const ShipmentDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [taskId, setTaskId] = useState();
  const bg = useColorModeValue("white", Color.primaryDark);
  const iconColor = useColorModeValue(Color.primaryDark, "white");

  const loading = useSelector((state) => state.shipment.loading);
  const loading1 = useSelector((state) => state.shipment.loading1);
  const btnLoading = useSelector((state) => state.ui.loading);
  const submitSuccess = useSelector((state) => state.ui.success);
  const shipment = useSelector((state) => state.shipment.shipment);
  const outgoings = useSelector((state) => state.shipment.outgoings);
  const awbNumber = navigation.getParam("awbNumber");
  const goBack = navigation.getParam("goBack");
  const scrollRef = useRef();

  const toggleModal = () => {
    setShowModal((show) => !show);
  };

  const toggleOptionModal = () => {
    setShowOptionModal((show) => !show);
  };

  const changeStatusHandler = (status) => {
    dispatch(changeAwbStatus(awbNumber, status));
    setShowModal(false);
    setShowOptionModal(false);
  };

  const changeOptionHandler = (status, reason, taskId) => {
    dispatch(changeAwbStatusWithReason(awbNumber, status, reason, taskId));
    setShowModal(false);
    setShowOptionModal(false);
    setTaskId(null);
  };

  const changeTaskIdHandler = (taskId) => {
    setTaskId(taskId);
    toast.show({ title: `Task ID: ${taskId} dipilih!` });
  };

  const modalHandler = (status) => {
    if (
      status === "DELIVERY" ||
      status === "RECEIVED" ||
      status === "DOCUMENT RECEIVED"
    ) {
      navigation.navigate("ShipmentOutgoings", {
        awbNumber: shipment.AWB_No,
      });
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (
      shipment &&
      shipment.AWB_Status !== "ATTEMP DELIVERY" &&
      shipment.AWB_Status !== "FAILED DELIVERY" &&
      shipment.AWB_Status !== "CANCELED"
    ) {
      let scrollPosition = scrollPositionByStatus(shipment.AWB_Status);
      scrollRef.current.scrollTo({
        x: 100 * scrollPosition,
        animated: true,
      });
    }
  }, [shipment]);

  useEffect(() => {
    dispatch(shipmentByAwb(awbNumber));
    dispatch(shipmentOutgoings(awbNumber));
    if (goBack === "ShipmentMonthly") {
      dispatch(shipmentMonthly());
    } else if (goBack === "ShipmentDaily") {
      dispatch(shipmentDaily());
    }
  }, [awbNumber, submitSuccess]);

  let awb = <ActivityIndicator />;
  let outgoingList = <ActivityIndicator style={{ marginTop: 10 }} />;

  if (!loading1 && outgoings) {
    outgoingList = (
      <Accordion mx={2} mt={2}>
        <Accordion.Item>
          <Accordion.Summary
            style={{ backgroundColor: bg }}
            _expanded={{ backgroundColor: bg }}
          >
            <Text>Daftar Delivery Order</Text>
            <Accordion.Icon />
          </Accordion.Summary>
          <Accordion.Details>
            {outgoings.map((outgoing) => (
              <OutgoingCard
                isSelected={outgoing.Task_ID === taskId}
                onSetTaskId={changeTaskIdHandler}
                outgoing={outgoing}
                key={uuid()}
              />
            ))}
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    );
  }

  if (!loading && shipment) {
    const pending =
      shipment.AWB_Status === "ATTEMP DELIVERY" ||
      shipment.AWB_Status === "FAILED DELIVERY" ||
      shipment.AWB_Status === "CANCELED"
        ? true
        : false;

    awb = (
      <>
        <View style={styles.OverlayTopLeft}>
          <IconButton
            onPress={() => {
              navigation.navigate(goBack);
              dispatch(clearShipment());
            }}
            rounded={30}
            _pressed={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            icon={
              <Icon
                as={MaterialIcons}
                name="arrow-back-ios"
                color="gray.200"
                size="sm"
              />
            }
          />

          {!pending ? (
            <IconButton
              mt={3}
              onPress={toggleOptionModal}
              rounded={30}
              _pressed={{
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              icon={
                <Icon as={Octicons} name="stop" color="red.600" size="sm" />
              }
            />
          ) : (
            <IconButton
              mt={3}
              rounded={30}
              _pressed={{
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              icon={
                <Icon as={Octicons} name="stop" color="gray.600" size="sm" />
              }
            />
          )}
        </View>

        <ScrollView style={styles.ScrollView}>
          <View bg={bg} style={styles.Banner} shadow={3}>
            <Image source={AclImage} alt="Acl Image" style={styles.Banner} />
            <View style={styles.Overlay} shadow={1}>
              <View style={styles.OverlayBottomRight}>
                <Text fontSize={24} textAlign="right" color="gray.200">
                  AWB No:
                </Text>
                <Text fontSize={24} textAlign="right" color="gray.200">
                  {awbNumber}
                </Text>
                <Text fontSize={18} textAlign="right" color="gray.200">
                  {shipment.AWB_Date}
                </Text>
              </View>
            </View>
          </View>

          <View alignItems="center" justifyContent="center" mt={1}>
            {pending ? (
              <Text bold color="red.500">
                Pending Pengiriman
              </Text>
            ) : (
              <Text bold>Status Pengiriman</Text>
            )}
          </View>

          {!pending && (
            <ScrollView
              ref={scrollRef}
              horizontal
              style={styles.StepperScrollView}
            >
              <Stepper
                title={14}
                subtitle={12}
                status={shipment.AWB_Status}
                date={shipment.AWB_Date}
                direction="horizontal"
                style={{ paddingHorizontal: 10 }}
              />
            </ScrollView>
          )}

          {!pending && (
            <View px={2} mb={2}>
              <CustomButton
                style={styles.ButtonProsses}
                status={shipment.AWB_Status}
                onPress={() => modalHandler(shipment.AWB_Status)}
              />
            </View>
          )}

          {shipment.AWB_Status_History && (
            <Accordion mx={2} mt={2} index={[0, 1]}>
              <Accordion.Item>
                <Accordion.Summary
                  expanded
                  style={{ backgroundColor: bg }}
                  _expanded={{ backgroundColor: bg }}
                >
                  <Text>History Kendala Deliver Order</Text>
                  <Accordion.Icon />
                </Accordion.Summary>
                <Accordion.Details>
                  {shipment.AWB_Status_History.length > 0 &&
                    shipment.AWB_Status_History.map((awb) => (
                      <ShipmentStatusCard key={uuid()} awb={awb} />
                    ))}
                </Accordion.Details>
              </Accordion.Item>
            </Accordion>
          )}

          {outgoingList}

          <View
            bg={bg}
            shadow={1}
            mt={2}
            mx={2}
            p={3}
            style={{
              minHeight: 0.7 * HEIGHT,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Stack direction="row">
              <HStack w="50%" p={2}>
                <VStack>
                  <Text bold>Location</Text>
                  <Text>{shipment.Location}</Text>
                  <Text bold>Account ID</Text>
                  <Text>{shipment.Account_ID}</Text>
                  <Text bold>Account Name</Text>
                  <Text>{shipment.Account_Name}</Text>
                </VStack>
              </HStack>

              <HStack w="50%" p={2}>
                <VStack alignItems="center">
                  <Text>Foto AWB:</Text>
                  {outgoings && (
                    <ImageList
                      items={outgoings}
                      filecheck="Foto_AWB"
                      filename="ID"
                    />
                  )}
                </VStack>
              </HStack>
            </Stack>
            <Stack>
              <VStack>
                <View alignItems="center">
                  <Text>Delivery Detail</Text>
                </View>

                <View
                  mt={2}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    bg="#ddd"
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#ccc"
                    p={2}
                    w="40%"
                    alignItems="center"
                  >
                    <Text color="black">{shipment.Origin}</Text>
                  </Box>

                  <Ionicons
                    name="arrow-forward-outline"
                    size={24}
                    color={iconColor}
                  />

                  <Box
                    bg="#ddd"
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#ccc"
                    p={2}
                    w="40%"
                    alignItems="center"
                  >
                    <Text color="black">
                      {shipment.Destination ? shipment.Destination : "NaN"}
                    </Text>
                  </Box>
                </View>

                <View mt={2}>
                  <Text bold italic>
                    Sender
                  </Text>
                  <Divider />
                  <VStack>
                    <Text bold>Sender Name</Text>
                    <Text>{shipment.Sender_Name}</Text>
                    <Text bold>Sender Address</Text>
                    <Text>{shipment.Sender_Address}</Text>
                    <Text bold>Sender Phone</Text>
                    <Text>{shipment.Sender_Phone}</Text>
                  </VStack>
                </View>

                <View mt={2}>
                  <Text bold italic>
                    Pickup Location
                  </Text>
                  <Divider />
                  <VStack>
                    <Text bold>Pickup From</Text>
                    <Text>{shipment.Pickup_From}</Text>
                    <Text bold>Pickup Address</Text>
                    <Text>{shipment.Pickup_Address}</Text>
                    <Text bold>Pickup PIC</Text>
                    <Text>{shipment.Pickup_PIC}</Text>
                    <Text bold>PIC Phone</Text>
                    <Text>{shipment.Pickup_Phone}</Text>
                  </VStack>
                </View>

                <View mt={2}>
                  <Text bold italic>
                    Consignee
                  </Text>
                  <Divider />
                  <VStack>
                    <Text bold>Consignee Name</Text>
                    <Text>{shipment.Consignee_Name}</Text>
                    <Text bold>Consignee Address</Text>
                    <Text>{shipment.Consignee_Addr}</Text>
                    <Text bold>Consignee Phone</Text>
                    <Text>{shipment.Consignee_Phone}</Text>
                  </VStack>
                </View>

                <View mt={2}>
                  <Text bold italic>
                    Service
                  </Text>
                  <Divider />
                  <VStack>
                    <Text bold>Product_Services</Text>
                    <Text>{shipment.Product_Services}</Text>
                    <Text bold>Transport</Text>
                    <Text>{shipment.Transport}</Text>
                    <Text bold>Type Services</Text>
                    <Text>{shipment.Type_Services}</Text>
                    <Text bold>Type Transport</Text>
                    <Text>{shipment.Type_Transport}</Text>
                    <Text bold>Type Load</Text>
                    <Text>{shipment.typeload}</Text>
                  </VStack>
                </View>

                <View mt={2}>
                  <Text bold italic>
                    Others
                  </Text>
                  <Divider />
                  <VStack>
                    <Text bold>Kilo</Text>
                    <Text>{shipment.Kilo}</Text>
                    <Text bold>Koli</Text>
                    <Text>{shipment.Koli}</Text>
                  </VStack>
                </View>
              </VStack>
            </Stack>
          </View>
        </ScrollView>
        <Modal
          show={showModal}
          toggle={toggleModal}
          status={shipment.AWB_Status}
          loading={btnLoading}
          onChangeStatus={changeStatusHandler}
        />
        <OptionModal
          show={showOptionModal}
          toggle={toggleOptionModal}
          loading={btnLoading}
          taskId={taskId}
          onChangeStatus={changeOptionHandler}
        />
      </>
    );
  }

  return <ColorModeWrapper>{awb}</ColorModeWrapper>;
};

const styles = StyleSheet.create({
  ScrollView: {
    width: "100%",
  },
  StepperScrollView: {
    height: 0.15 * HEIGHT,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  Banner: {
    width: "100%",
    height: 0.25 * HEIGHT,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  Overlay: {
    position: "absolute",
    width: "100%",
    height: 0.25 * HEIGHT,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  OverlayTopLeft: {
    position: "absolute",
    left: 5,
    top: 5,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
  },
  OverlayBottomRight: {
    position: "absolute",
    padding: 10,
    bottom: 0,
    right: 0,
  },
  ButtonProsses: {
    alignItems: "center",
  },
});

export default ShipmentDetailScreen;
