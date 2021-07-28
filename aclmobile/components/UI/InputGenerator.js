import React, { useReducer, useEffect, useState } from "react";
//UI
import {
  Input,
  Stack,
  FormControl,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  IconButton,
  Icon,
  Select,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
//Constants
import Color from "../../constants/Color";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputGenerator = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const { onInputChange, id } = props;
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const iconColor = useColorModeValue(Color.primary, Color.primaryDark);

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const numberPattern = /^\d+$/;

    let isValid = true;
    if (props.required && text.trim() === "" && isValid) {
      isValid = false;
      setErrorMessage(`${props.label} tidak boleh kosong`);
    }

    if (props.max && +text > props.max && isValid) {
      isValid = false;
      setErrorMessage(`Nilai ${props.label} maksimal ${props.max}`);
    }

    if (props.min && +text < props.min && isValid) {
      isValid = false;
      setErrorMessage(`Nilai ${props.label} minimal ${props.min}`);
    }

    if (props.minLength && text.length < props.minLength && isValid) {
      isValid = false;
      setErrorMessage(`${props.label} minimal ${props.minLength} karakter`);
    }

    if (props.maxLength && text.length > props.maxLength && isValid) {
      isValid = false;
      setErrorMessage(`${props.label} maksimal ${props.maxLength} karakter`);
    }

    if (props.isEmail && !emailPattern.test(text) && isValid) {
      isValid = false;
      setErrorMessage(`Format ${props.label} tidak valid`);
    }

    if (props.isNumeric && !numberPattern.test(text) && isValid) {
      isValid = false;
      setErrorMessage(`${props.label} harus numeric`);
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  const focusColor = useColorModeValue(Color.pressed, "white");

  let inputElement;

  switch (props.inputType) {
    case "number":
      inputElement = (
        <NumberInput>
          <NumberInputField />
        </NumberInput>
      );
      break;
    case "password":
      inputElement = (
        <Input
          placeholder={props.placeholder}
          my={2}
          type={props.show ? "text" : "password"}
          InputRightElement={
            <IconButton
              onPress={props.togglePassword}
              _pressed={{
                backgroundColor: "transparent",
              }}
              icon={
                <Icon
                  w="100%"
                  size="sm"
                  as={FontAwesome5}
                  name={props.show ? "eye" : "eye-slash"}
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
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          value={inputState.value}
          {...props}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          selectedValue={inputState.value}
          minWidth={200}
          placeholder={props.placeholder}
          onValueChange={textChangeHandler}
          _selectedItem={{
            bg: "cyan.600",
          }}
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
        >
          {props.options &&
            props.options.map((opt) => (
              <Select.Item key={opt + Math.random()} label={opt} value={opt} />
            ))}
        </Select>
      );
      break;
    case "text":
    default:
      inputElement = (
        <Input
          placeholder={props.placeholder}
          my={2}
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
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          value={inputState.value}
          {...props}
        />
      );
  }

  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!inputState.isValid && inputState.touched}
    >
      <Stack mx={2}>
        <FormControl.Label>{props.label}</FormControl.Label>
        {inputElement}
        {props.helperText && (
          <FormControl.HelperText>{props.helperText}</FormControl.HelperText>
        )}
        {!inputState.isValid && inputState.touched && (
          <FormControl.ErrorMessage mb={2}>
            {errorMessage}
          </FormControl.ErrorMessage>
        )}
      </Stack>
    </FormControl>
  );
};

export default InputGenerator;
