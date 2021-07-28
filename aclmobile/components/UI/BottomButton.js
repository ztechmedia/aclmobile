import React from "react";
//UI
import { View, Button, useColorModeValue } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
//Constants
import Color from "../../constants/Color";

const BottomButton = ({ btnName, onPress, icon, h }) => {
  const bg = useColorModeValue(Color.primary, Color.primaryDark);
  const pressedColor = useColorModeValue(Color.pressed, Color.pressedDark);

  return (
    <View
      w="100%"
      h={h}
      bg="white"
      alignItems="center"
      bg={bg}
      style={{
        position: "absolute",
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: "white",
      }}
    >
      <Button
        startIcon={<FontAwesome5 name={icon} size={24} color="white" />}
        name={btnName}
        side={4}
        color="white"
        bg={bg}
        _text={{
          color: "white",
        }}
        _pressed={{
          backgroundColor: pressedColor,
        }}
        rounded={h / 2}
        style={{
          width: "50%",
          marginTop: -(h / 2),
          borderColor: "white",
          borderWidth: 2,
        }}
        onPress={onPress}
      >
        {btnName}
      </Button>
    </View>
  );
};

export default BottomButton;
