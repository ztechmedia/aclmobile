import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Startup Screen
import StartupScreen from "../screens/StartupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
//Auth Screen
import ShipmentLoginScreen from "../screens/Auth/Shipment/LoginScreen";
import GetAccessScreen from "../screens/Auth/GetAccessScreen";
import DriverRegisterScreen from "../screens/Auth/Shipment/DriverRegisterScreen";
import DriverRegDetailScreen from "../screens/Auth/Shipment/DriverRegDetailScreen";
//Shipment Tracker Screen
import ShipmentHomeScreen from "../screens/Shipment/HomeScreen";
import ShipmentDailyScreen from "../screens/Shipment/ShipmentDailyScreen";
import ShipmentMonthlyScreen from "../screens/Shipment/ShipmentMonthlyScreen";
import ShipmentFilterScreen from "../screens/Shipment/ShipmentFilterScreen";
import ShipmentMonthlyFilterScreen from "../screens/Shipment/ShipmentMonthlyFilterScreen";
import ShipmentDetailScreen from "../screens/Shipment/ShipmentDetailScreen";
import ShipmentUploadDocumentScreen from "../screens/Shipment/ShipmentUploadDocumentScreen";
import ShipmentDetailDocumentScreen from "../screens/Shipment/ShipmentDetailDocumentScreen";
import ShipmentOutgoingsScreen from "../screens/Shipment/ShipmentOutgoingsScreen";
//Setting
import SettingScreen from "../screens/SettingScreen";

const defaultNavOptions = {
  header: () => null,
};

const ShipmentAuthNavigator = createStackNavigator(
  {
    GetAccess: GetAccessScreen,
    DriverRegister: DriverRegisterScreen,
    DriverRegDetail: DriverRegDetailScreen,
    ShipmentLogin: ShipmentLoginScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShipmentTrackerNavigator = createStackNavigator(
  {
    ShipmentHome: ShipmentHomeScreen,
    ShipmentDaily: ShipmentDailyScreen,
    ShipmentMonthly: ShipmentMonthlyScreen,
    ShipmentFilter: ShipmentFilterScreen,
    ShipmentMonthlyFilter: ShipmentMonthlyFilterScreen,
    ShipmentDetail: ShipmentDetailScreen,
    ShipmentUploadDocument: ShipmentUploadDocumentScreen,
    ShipmentDetailDocument: ShipmentDetailDocumentScreen,
    ShipmentOutgoings: ShipmentOutgoingsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Welcome: WelcomeScreen,
  ShipmentAuth: ShipmentAuthNavigator,
  ShipmentTracker: ShipmentTrackerNavigator,
  Setting: SettingScreen,
});

export default createAppContainer(MainNavigator);
