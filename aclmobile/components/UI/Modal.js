import React from "react";
//UI
import { Modal } from "native-base";

const CustomModal = ({ show, toggle, title, children, footer: Footer }) => {
  return (
    <Modal isOpen={show} onClose={toggle}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;
