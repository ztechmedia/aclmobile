import React, { useReducer, useCallback } from "react";
//UI
import { HStack, Text } from "native-base";
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
  pending,
}) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      reason: null,
      status: pending ? "PROCESSED" : "ATTEMP DELIVERY",
    },
    inputValidities: {
      phone: false,
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
    onChangeStatus(formState.inputValues.status, formState.inputValues.reason);
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
        >
          Konfirmasi
        </Button>
      </HStack>
    );
  };

  const options = !pending
    ? ["ATTEMP DELIVERY", "FAILED DELIVERY", "CANCELED"]
    : ["PROCESSED", "PROCESSED2", "MUAT BARANG", "SELESAI MUAT", "DELIVERY"];

  return (
    <Modal show={show} toggle={toggle} footer={Footer}>
      <Text>Silakan Isi Alasan Tindakan:</Text>
      <Input
        id="reason"
        placeholder="Alasan Tindakan"
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
        label={pending ? "Mulai Dari Status" : "Status Pembatalan"}
        isRequired={true}
        onInputChange={inputChangeHandler}
        initialValue={formState.inputValues.status}
        options={options}
      />
      <Text>Jika sudah yakin silahkan lanjutkan proses berikutnya!</Text>
    </Modal>
  );
};

export default ShipmentOptionModal;
