import React from "react";
import { View, Pressable, Text, useColorModeValue, Image } from "native-base";
import { loadThumbnail } from "../../../constants/EndPoint";
//Image
import NoImage from "../../../assets/img/no_image.png";

const ShipmentCardOutgoingDetail = ({
  outgoing,
  onPress,
  noimages,
  ...props
}) => {
  const {
    Task_ID,
    Consignee_Name,
    Consignee_Addr,
    Container_Police_No,
    Destination,
    Foto_AWB,
    ID,
    Status_Delivery,
  } = outgoing;
  const bg = useColorModeValue("white", "#555");

  return (
    <Pressable
      bg={bg}
      p={1}
      mt={1}
      rounded={5}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
      onPress={onPress}
    >
      <View w={noimages ? "100%" : "70%"}>
        <Text fontSize={10} bold>
          Task ID
        </Text>
        <Text fontSize={10}>{Task_ID}</Text>
        <Text fontSize={10} bold>
          Consignee Name
        </Text>
        <Text fontSize={10}>{Consignee_Name}</Text>
        <Text fontSize={10} bold>
          Destination
        </Text>
        <Text fontSize={10}>{Destination}</Text>
        <Text fontSize={10} bold>
          Consignee Address
        </Text>
        <Text fontSize={10}>{Consignee_Addr}</Text>
        <Text fontSize={10} bold>
          No Pol
        </Text>
        <Text fontSize={10}>{Container_Police_No}</Text>
      </View>

      {!noimages && (
        <View
          w="30%"
          h={55}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {!Foto_AWB ? (
            <Image rounded={30} source={NoImage} w={50} h={50} alt={ID} />
          ) : (
            <Image
              rounded={30}
              source={{ uri: loadThumbnail(ID) }}
              w={50}
              h={50}
              alt={ID}
            />
          )}
          <Text fontSize={10} bold>
            {Status_Delivery}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ShipmentCardOutgoingDetail;
