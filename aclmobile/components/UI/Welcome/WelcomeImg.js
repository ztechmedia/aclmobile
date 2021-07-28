import React from "react";
//Utils
import { indoDate } from "../../../utils/utility";
//UI
import { IconButton, Icon, View, Image, Text } from "native-base";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
//Constants
import Color from "../../../constants/Color";
//Image
import Img from "../../../assets/img/welcome_img.png";

const WelcomeImg = ({ title, subtitle, rightIcon, goTo }) => {
  return (
    <>
      <Image w="100%" h="100%" source={Img} alt="Welcome Img" />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={styles.Overlay}
      >
        <Text color="white" bold fontSize="2xl">
          {title}
        </Text>
        <Text color="white" italic fontSize="xl">
          {subtitle}
        </Text>
        <Text color="white" fontSize="md">
          {indoDate(new Date())}
        </Text>

        {rightIcon && (
          <View style={styles.Account}>
            <IconButton
              variant="solid"
              bg="transparent"
              onPress={goTo}
              _pressed={{
                backgroundColor: Color.pressed2,
              }}
              rounded={20}
              icon={
                <Icon
                  size="sm"
                  as={<FontAwesome5 name="user" />}
                  color="white"
                />
              }
            />
          </View>
        )}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  Overlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingTop: 80,
  },
  Account: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});

export default WelcomeImg;
