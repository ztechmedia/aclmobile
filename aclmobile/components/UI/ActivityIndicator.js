import React from "react";
//UI
import { StyleSheet, ActivityIndicator } from "react-native";
import { useColorModeValue, View } from "native-base";
//Constants
import Color from "../../constants/Color";

const CustomActivityIndicator = ({ style }) => {
  const color = useColorModeValue(Color.primary, "white");
  return (
    <View style={{ ...styles.Centered, ...style }}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  Centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomActivityIndicator;
