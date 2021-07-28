import React from "react";
//Components
import Map from "../../components/UI/Map";
//UI
import { View, Image, Text, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
//Constants
import { loadImage } from "../../constants/EndPoint";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ShipmentDetailDocumentScreen = ({ navigation }) => {
  const outgoing = navigation.getParam("outgoing");
  return (
    <>
      <View h={HEIGHT * 0.55}>
        <Image
          source={{ uri: loadImage(outgoing.ID) }}
          alt={outgoing.ID}
          w={WIDTH}
          h="100%"
        />
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 10,
          }}
        >
          <MaterialIcons name="arrow-back-ios" color="white" size={24} />
          <Text color="white">Kembali</Text>
        </Pressable>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 10,
            backgroundColor: "black",
            borderTopLeftRadius: 10,
          }}
        >
          <Text color="white" bold>
            Drop Location
          </Text>
        </View>
      </View>
      {outgoing.LatLong ? (
        <View h={HEIGHT * 0.45}>
          <Map style={{ flex: 1 }} location={JSON.parse(outgoing.LatLong)} />
        </View>
      ) : (
        <View h={HEIGHT * 0.45} alignItems="center" justifyContent="center">
          <Text color="black">There is no coordinats found!</Text>
        </View>
      )}
    </>
  );
};

export default ShipmentDetailDocumentScreen;
