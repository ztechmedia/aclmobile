import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MonthPicker from "react-native-month-year-picker";
//UI
import { View, Input, IconButton, Icon, useColorModeValue } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
//Component
import AppBar from "../../components/UI/AppBar";
import ColorModeWrapper from "../../components/UI/Center";
import Button from "../../components/UI/Button";
//Constants
import Color from "../../constants/Color";
//Utils
import { toM, toMonth, indoMonth } from "../../utils/utility";
//Redux Action
import { setFilterMonthly } from "../../store/actions/shipment";

const ShipmentMonthlyFilterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const filters = useSelector((state) => state.shipment.filters);
  const focusColor = useColorModeValue(Color.pressed, "white");
  const iconColor = useColorModeValue(Color.primary, Color.primaryDark);

  const [date, setDate] = useState(
    new Date(filters.year, toM(filters.month) - 1)
  );

  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);

  const changeMonthHandler = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker]
  );

  const goBack = navigation.getParam("goBack");

  const setFilterHandler = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        setFilterMonthly(toMonth(date.getMonth() + 1), date.getFullYear())
      );
      navigation.navigate(goBack);
    }, 500);
  };

  return (
    <>
      <AppBar title="Filter" goBack={() => navigation.navigate(goBack)} />
      <ColorModeWrapper>
        <View h="100%" w="100%">
          <View p={5}>
            <View px={2}>
              <Input
                type="text"
                isReadOnly
                value={indoMonth(date)}
                InputRightElement={
                  <IconButton
                    onPress={() => showPicker(true)}
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
          </View>
        </View>
        {show && (
          <MonthPicker
            onChange={changeMonthHandler}
            value={date}
            minimumDate={new Date(2015, 1)}
            maximumDate={new Date(new Date().getFullYear(), 12)}
            locale="ind"
          />
        )}
      </ColorModeWrapper>
    </>
  );
};

export default ShipmentMonthlyFilterScreen;
