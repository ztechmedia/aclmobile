import React from "react";
//UI
import { Button, useColorModeValue } from "native-base";

const CustomButton = ({ children, ...props }) => {
  const colorScheme = useColorModeValue("blue", "blue");
  let button;
  switch (props.type) {
    default:
      button = (
        <Button colorScheme={colorScheme} {...props}>
          {children}
        </Button>
      );
  }
  return button;
};

export default CustomButton;
