import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//UI
import { ActivityIndicator } from "react-native";
import { useColorModeValue } from "native-base";
//Redux Action
import { checkState } from "../store/actions/auth";
//Components
import ColorModeWrapper from "../components/UI/Center";
//Constants
import Color from "../constants/Color";

const StartupScreen = () => {
  const dispatch = useDispatch();
  const color = useColorModeValue(Color.primary, "white");

  useEffect(() => {
    dispatch(checkState());
  }, [dispatch, checkState]);

  return (
    <ColorModeWrapper>
      <ActivityIndicator size="large" color={color} />
    </ColorModeWrapper>
  );
};

export default StartupScreen;
