import { Alert } from "react-native";

const alertHandler = (title, message) =>
  Alert.alert(title, message ? message.toString() : message + "", [
    { text: "Tutup" },
  ]);

export default alertHandler;
