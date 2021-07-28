import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//UI
import { View, Input, IconButton, Icon, useColorModeValue } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
//Component
import AppBar from "../../components/UI/AppBar";
import ColorModeWrapper from "../../components/UI/Center";
import Button from "../../components/UI/Button";
//Constants
import Color from "../../constants/Color";
//Utils
import { indoDate } from "../../utils/utility";
//Redux Action
import { setFilter } from "../../store/actions/shipment";

const ShipmentFilterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const filters = useSelector((state) => state.shipment.filters);

  const goBack = navigation.getParam("goBack");
  const focusColor = useColorModeValue(Color.pressed, "white");
  const iconColor = useColorModeValue(Color.primary, Color.primaryDark);
  const [date, setDate] = useState(filters.date);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const setFilterHandler = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setFilter(date));
      navigation.navigate(goBack);
    }, 500);
  };

  return (
    <>
      <AppBar title="Filter" goBack={() => navigation.navigate(goBack)} />
      <ColorModeWrapper>
        <View h="100%" w="100%">
          <View p={5}>
            <Input
              type="text"
              isReadOnly
              value={indoDate(date)}
              InputRightElement={
                <IconButton
                  onPress={showDatepicker}
                  _pressed={{
                    backgroundColor: "transparent",
                  }}
                  icon={
                    <Icon
                      w="100%"
                      size="sm"
                      as={FontAwesome5}
                      name="calendar"
                      color={iconColor}
                    />
                  }
                />
              }
              _light={{
                borderColor: Color.primary,
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              _focus={{
                borderColor: focusColor,
              }}
            />

            <Button
              mt={2}
              isLoading={loading}
              isLoadingText="Filtering..."
              onPress={setFilterHandler}
            >
              Filter
            </Button>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
      </ColorModeWrapper>
    </>
  );
};

export default ShipmentFilterScreen;
