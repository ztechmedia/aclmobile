import React from "react";
import { AlertDialog, Center } from "native-base";

const AlertDialog = ({ title, body, textCancel, textOk }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={"fade"}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialog.Header>
          <AlertDialog.Body>{body}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose}>
              {textCancel}
            </Button>
            <Button colorScheme="red" onPress={onClose} ml={3}>
              {textOk}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertDialog;
