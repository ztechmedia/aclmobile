import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
//Components
import ColorModeWrapper from "../../components/UI/Center";
import AppBar from "../../components/UI/AppBar";
import OutgoingCard from "../../components/UI/Shipment/ShipmentCardOutgoingDetail";

const ShipmentOutgoingsScreen = ({ navigation }) => {
  const awbNumber = navigation.getParam("awbNumber");
  const outgoings = useSelector((state) => state.shipment.outgoings);

  const documentHandler = (outgoing) => {
    const screen = outgoing.Foto_AWB
      ? "ShipmentDetailDocument"
      : "ShipmentUploadDocument";
    navigation.navigate(screen, {
      outgoing: outgoing,
    });
  };

  return (
    <>
      <AppBar
        title={`Outgoings AWB: ${awbNumber}`}
        goBack={() => navigation.goBack()}
      />
      <ColorModeWrapper>
        <ScrollView
          style={{ flex: 1, width: "100%", padding: 10 }}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {outgoings.map((outgoing) => (
            <OutgoingCard
              outgoing={outgoing}
              key={`${outgoing.ID}+${Math.random()}`}
              onPress={() => documentHandler(outgoing)}
            />
          ))}
        </ScrollView>
      </ColorModeWrapper>
    </>
  );
};

export default ShipmentOutgoingsScreen;
