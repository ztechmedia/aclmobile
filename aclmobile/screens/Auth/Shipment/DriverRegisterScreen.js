import React, { useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//UI
import { Keyboard } from "react-native";
//Components
import ColorModeWrapper from "../../../components/UI/Center";
import Input from "../../../components/UI/InputGenerator";
import Button from "../../../components/UI/Button";
import AppBar from "../../../components/UI/AppBar";
//Reducers
import { FORM_UPDATE, formReducer } from "../../../utils/formReducer";
//Redux Action
import { checkPhone } from "../../../store/actions/auth";

const DriverRegisterScrreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phone: "",
    },
    inputValidities: {
      phone: false,
    },
    formIsValid: false,
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
    dispatch(checkPhone(formState.inputValues.phone));
  };

  return (
    <>
      <AppBar
        title="Registrasi Driver"
        goBack={() => navigation.navigate("GetAccess")}
      />
      <ColorModeWrapper px={5}>
        <Input
          id="phone"
          inputType="text"
          label="No Handphone"
          placeholder="Contoh: 089517227009"
          isRequired={true}
          onInputChange={inputChangeHandler}
          initialValue={formState.inputValues.phone}
          required
          minLength={10}
          maxLength={15}
          isNumeric
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
          Cek Nomor Handphone
        </Button>
      </ColorModeWrapper>
    </>
  );
};

export default DriverRegisterScrreen;
