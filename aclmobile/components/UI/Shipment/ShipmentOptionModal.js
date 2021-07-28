import React, { useReducer, useCallback } from "react";
//UI
import { HStack, Text, View } from "native-base";
//Component
import Modal from "../Modal";
import Button from "../Button";
import Color from "../../../constants/Color";
import Input from "../InputGenerator";
//Reducers
import { FORM_UPDATE, formReducer } from "../../../utils/formReducer";
//Redux Action

const ShipmentOptionModal = ({
  show,
  toggle,
  loading,
  onChangeStatus,
  taskId,
}) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      reason: null,
      status: "ATTEMP DELIVERY",
    },
    inputValidities: {
      reason: false,
      password: true,
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

  const changeStatusHandler = () => {
    onChangeStatus(
      formState.inputValues.status,
      formState.inputValues.reason,
      taskId
    );
  };

  const Footer = () => {
    return (
      <HStack>
        <Button
          _text={{ color: "white" }}
          _pressed={{
            backgroundColor: Color.pressed,
          }}
          bg="blue.500"
          onPress={changeStatusHandler}
          isLoading={loading}
          isLoadingText="Memproses..."
          isDisabled={!formState.formIsValid}
        >
          Konfirmasi
        </Button>
      </HStack>
    );
  };

  return (
    <Modal show={show} toggle={toggle} footer={Footer}>
      {taskId ? (
        <>
          <View alignItems="center" justifyContent="center" mt={5} mb={5}>
            <Text>Kendala pengiriman DO Task ID:</Text>
            <Text bold>{taskId}</Text>
          </View>

          <Input
            id="reason"
            placeholder="Alasan"
            inputType="text"
            label="Alasan"
            isRequired={true}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.reason}
            required
            mt={2}
          />

          <Input
            id="status"
            inputType="select"
            label="Status"
            isRequired={true}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.status}
            options={["ATTEMP DELIVERY", "FAILED DELIVERY", "CANCELED"]}
          />
        </>
      ) : (
        <View alignItems="center" justifyContent="center" mt={5} mb={5}>
          <Text>Nomor Delivery Order belum dipilih!</Text>
        </View>
      )}
    </Modal>
  );
};

export default ShipmentOptionModal;
