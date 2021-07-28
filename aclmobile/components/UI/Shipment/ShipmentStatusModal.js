import React from "react";
//UI
import { HStack, Text } from "native-base";
//Component
import Modal from "../Modal";
import Button from "../Button";
import Color from "../../../constants/Color";

const ShipmentStatusModal = ({
  show,
  toggle,
  status,
  loading,
  onChangeStatus,
}) => {
  let next;
  switch (status) {
    case "PROCESSED":
    case "PROCESSED2":
      next = "MUAT BARANG";
      break;
    case "MUAT BARANG":
      next = "SELESAI MUAT";
      break;
    case "SELESAI MUAT":
      next = "DELIVERY";
      break;
    default:
      next = "MUAT BARANG";
  }

  const Footer = () => {
    return (
      <HStack>
        <Button
          _text={{ color: "white" }}
          _pressed={{
            backgroundColor: Color.pressed,
          }}
          bg="blue.500"
          onPress={() => onChangeStatus(next)}
          isLoading={loading}
          isLoadingText="Memproses..."
        >
          Lanjut Prosses
        </Button>
      </HStack>
    );
  };

  return (
    <Modal show={show} toggle={toggle} footer={Footer}>
      <Text>Proses selanjutnya adalah:</Text>
      <Text bold textAlign="center">
        {next}
      </Text>
      <Text>Jika sudah yakin silahkan lanjutkan proses berikutnya!</Text>
    </Modal>
  );
};

export default ShipmentStatusModal;
