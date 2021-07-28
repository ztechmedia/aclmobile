import React from "react";
import { View, Pressable, Text, useColorModeValue, Image } from "native-base";
import { loadThumbnail } from "../../../constants/EndPoint";
//Image
import NoImage from "../../../assets/img/no_image.png";

const ShipmentCardOutgoing = ({
  outgoing,
  isSelected,
  onSetTaskId,
  ...props
}) => {
  const {
    Consignee_Name,
    Consignee_Addr,
    Foto_AWB,
    ID,
    Task_ID,
    Status_Delivery,
    AWB_Reasons,
  } = outgoing;
  const bg = useColorModeValue("white", "#555");

  return (
    <Pressable
      bg={isSelected ? "blue.500" : bg}
      p={2}
      mt={1}
      rounded={5}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={() => onSetTaskId(Task_ID)}
      {...props}
    >
      <View w="70%">
        <Text fontSize={10} bold>
          Task ID
        </Text>
        <Text fontSize={10}>{Task_ID}</Text>
        <Text fontSize={10} bold>
          Consignee Name
        </Text>
        <Text fontSize={10}>{Consignee_Name}</Text>
        <Text fontSize={10} bold>
          Consignee Address
        </Text>
        <Text fontSize={10}>{Consignee_Addr}</Text>
        <Text fontSize={10} bold>
          Reason
        </Text>
        <Text fontSize={10}>{AWB_Reasons}</Text>
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
