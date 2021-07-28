import React from "react";
//UI
import { useColorModeValue, Divider } from "native-base";
const CustomDivider = () => {
  const bg = useColorModeValue("gray.400", "gray.300");
  return <Divider bg={bg} />;
};

export default CustomDivider;
