import React, { useReducer, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//UI
import { Keyboard } from "react-native";
//Components
import ColorModeWrapper from "../../../components/UI/Center";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/InputGenerator";
import AppBar from "../../../components/UI/AppBar";
//Reducers
import { FORM_UPDATE, formReducer } from "../../../utils/formReducer";
//Redux Action
import { login } from "../../../store/actions/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [show, setShow] = useState(false);

  const togglePassword = () => setShow(!show);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phone: "081317810060",
      password: "123456",
    },
    inputValidities: {
      phone: true,
      password: true,
    },
    formIsValid: true,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = () => {
    Keyboard.dismiss();
    dispatch(
      login(formState.inputValues.phone, formState.inputValues.password)
    );
  };

  return (
    <>
      <AppBar
        title="Driver Login"
        goBack={() => navigation.navigate("Welcome")}
      />
      <ColorModeWrapper px={5}>
        <Input
          id="phone"
          placeholder="Contoh: 089517227009"
          inputType="text"
          label="No Handphone"
          isRequired={true}
          onInputChange={inputChangeHandler}
          initialValue={formState.inputValues.phone}
          required
          minLength={10}
          maxLength={15}
          isNumeric
        />

        <Input
          id="password"
          inputType="password"
          label="Password"
          isRequired={true}
          onInputChange={inputChangeHandler}
          initialValue={formState.inputValues.password}
          required
          show={show}
          togglePassword={togglePassword}
        />

        <Button
          w="95%"
          size="md"
          _text={{
            color: "white",
          }}
          isDisabled={!formState.formIsValid}
          isLoading={loading}
          isLoadingText="Sedang mengecek..."
          onPress={submitHandler}
        >
          Login
        </Button>
      </ColorModeWrapper>
    </>
  );
};

export default LoginScreen;
