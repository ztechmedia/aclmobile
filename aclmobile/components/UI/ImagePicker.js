import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
//UI
import { Pressable, Image, View, Text } from "native-base";
import NoImage from "../../assets/img/take_picture.jpg";

const ImgPicker = ({ onImageTaken, onLocationTaken, ...props }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [pickedImage, setPickedImage] = useState();

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Permission Error",
        "Aplikasi memerlukan izin untuk mengakses kamera, file dan location",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    setPickedLocation(null);
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
    getLocationHandler();
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationTaken({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Gagal mengambil lokasi", "Silahkan coba lagi!");
    }
    setIsFetching(false);
  };

  return (
    <>
      <Pressable onPress={takeImageHandler} {...props}>
        {!pickedImage ? (
          <Image
            rounded={10}
            w="100%"
            h="100%"
            source={NoImage}
            alt="Uploaded Image"
          />
        ) : (
          <Image
            rounded={10}
            w="100%"
            h="100%"
            source={{ uri: pickedImage }}
            alt="Uploaded Image"
          />
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderTopRightRadius: 10,
          }}
        >
          {isFetching && <Text>Mengambil lokasi...</Text>}

          {pickedLocation && (
            <View>
              <Text>Lat: {pickedLocation.lat}</Text>
              <Text>Lng: {pickedLocation.lng}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default ImgPicker;
