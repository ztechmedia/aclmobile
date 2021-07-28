import React from "react";
//UI
import { Box, View, Text, useColorModeValue } from "native-base";
//Constants
import Color from "../../constants/Color";

const Card = ({ title, value, bg, ...props }) => {
  const newBg = bg ? bg : useColorModeValue(Color.primary, Color.primaryDark);
  return (
    <View {...props}>
      <Box bg={newBg} p={3} rounded={5}>
        <Text color="white">{title}</Text>
        <Text color="white">{value}</Text>
      </Box>
    </View>
  );
};

export default Card;
