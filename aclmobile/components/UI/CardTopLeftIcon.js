import React from "react";
//UI
import { StyleSheet } from "react-native";
import { View, useColorModeValue } from "native-base";
//Constants
import Color from "../../constants/Color";

const CardTopLeftIcon = ({ children, icon, ...props }) => {
  const bg = useColorModeValue("white", Color.primaryDark);
  const borderColor = useColorModeValue(Color.primary, "white");

  return (
    <View
      bg={bg}
      borderColor={borderColor}
      style={{ ...styles.Card, ...props.style }}
      {...props}
    >
      <View bg={bg} borderColor={borderColor} style={styles.IconContainer}>
        {icon}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
  },
  IconContainer: {
    position: "absolute",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    top: -25,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardTopLeftIcon;
