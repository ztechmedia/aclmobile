import React from "react";
//UI
import { HStack, VStack, Text, useColorModeValue } from "native-base";
//Components
import Divider from "../Divider";
//Constants
import Color from "../../../constants/Color";

const ShipmentStatusCard = ({ awb }) => {
  const bg = useColorModeValue("white", Color.primaryDark);

  return (
    <VStack bg={bg} rounded={5} w="100%" p={2} mb={2}>
      <Text fontSize={10} bold>
        {awb.Task_ID}
      </Text>
      <Divider />
      <HStack alignItems="center" justifyContent="space-between">
        <VStack>
          <Text bold fontSize={10}>
            Status
          </Text>
          <Text fontSize={10} color="red.500">
            {awb.AWB_Status}
          </Text>
          <Text bold fontSize={10}>
            Reason
          </Text>
          <Text fontSize={10}>{awb.Reason}</Text>
        </VStack>

        <VStack>
          <Text bold fontSize={10}>
            Tanggal
          </Text>
          <Text fontSize={10}>{awb.Change_On}</Text>
          <Text bold fontSize={10}>
            Oleh
          </Text>
          <Text fontSize={10}>{awb.Change_By}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ShipmentStatusCard;
