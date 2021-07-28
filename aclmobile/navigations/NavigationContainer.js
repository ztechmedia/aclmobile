import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
//Navigation Services
import * as NavigationServices from "../services/navigation/NavigationServices";
//Navigator
import MainNavigation from "./MainNavigation";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    NavigationServices.setNavigator(navRef.current);
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Welcome",
        })
      );
    }
  }, [isAuth]);

  return <MainNavigation ref={navRef} />;
};

export default NavigationContainer;
