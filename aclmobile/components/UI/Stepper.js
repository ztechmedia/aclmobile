import React, { useEffect, useState } from "react";
import StepIndicator from "react-native-step-indicator";
//UI
import { View, Text } from "native-base";
import { Dimensions } from "react-native";
//Constants
import Color from "../../constants/Color";

const WIDTH = Dimensions.get("window").width;

const Stepper = ({ title, subtitle, status, date, direction, style }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: Color.primary,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: Color.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: Color.primary,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: Color.primary,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Color.primary,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: Color.primary,
  };

  useEffect(() => {
    if (status === "PROCESSED" || status === "PROCESSED2") {
      setCurrentPosition(1);
    } else if (status === "MUAT BARANG") {
      setCurrentPosition(2);
    } else if (status === "SELESAI MUAT") {
      setCurrentPosition(3);
    } else if (status === "DELIVERY") {
      setCurrentPosition(4);
    } else if (status === "RECEIVED") {
      setCurrentPosition(5);
    } else if (status === "DOCUMENT RECEIVED") {
      setCurrentPosition(6);
    }
  }, [currentPosition]);

  const data = [
    {
      label: "PROCESSED",
    },
    {
      label: "MUAT BARANG",
    },
    {
      label: "SELESAI MUAT",
    },
    {
      label: "DELIVERY",
    },
    {
      label: "RECEIVED",
    },
    {
      label: "DOCUMENT RECEIVED",
    },
  ];

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      stepCount={data.length}
      labels={data}
      direction={direction}
      style={{ ...style }}
      renderLabel={({ position, stepStatus, label, currentPosition }) => {
        return (
          <View w={WIDTH / 2.5} px={1}>
            <Text textAlign="center" fontSize={title}>
              {data[position].label}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default Stepper;
