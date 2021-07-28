import React from "react";
//UI
import { StatusBar, useColorModeValue } from "native-base";
//Constants
import Color from "../../constants/Color";

function CustomStatusBar({ title, goBack, children }) {
  const statusBarColor = useColorModeValue(
    Color.statusbar,
    Color.statusbarDark
  );

  return (
    <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
  );
}

export default CustomStatusBar;
