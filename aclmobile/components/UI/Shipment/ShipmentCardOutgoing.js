import React from "react";
import { View, Pressable, Text, useColorModeValue, Image } from "native-base";
import { loadThumbnail } from "../../../constants/EndPoint";
//Image
import NoImage from "../../../assets/img/no_image.png";

const ShipmentCardOutgoing = ({ outgoing, ...props }) => {
  const {
    Consignee_Name,
    Container_Police_No,
    Foto_AWB,
    ID,
    Status_Delivery,
    Consignee_Addr,
  } = outgoing;
  const bg = useColorModeValue("white", "#555");

  return (
    <Pressable
      bg={bg}
      p={2}
      mt={1}
      rounded={5}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <View>
        <Text fontSize={10} bold>
          Consignee Name
        </Text>
        <Text fontSize={10}>{Consignee_Name}</Text>
        <Text fontSize={10} bold>
          No Pol
        </Text>
        <Text fontSize={10}>{Container_Police_No}</Text>
      </View>

      <View
        w="30%"
        h={55}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {!Foto_AWB ? (
          <Image rounded={20} source={NoImage} w={30} h={30} alt={ID} />
        ) : (
          <Image
            rounded={20}
            source={{ uri: loadThumbnail(ID) }}
            w={30}
            h={30}
            alt={ID}
          />
        )}
        <Text fontSize={10} bold>
          {Status_Delivery}
        </Text>
      </View>
    </Pressable>
  );
};

export default ShipmentCardOutgoing;
