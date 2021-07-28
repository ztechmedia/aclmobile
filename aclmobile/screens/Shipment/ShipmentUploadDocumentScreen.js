import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//Components
import AppBar from "../../components/UI/AppBar";
import ColorModeWrapper from "../../components/UI/Center";
import Button from "../../components/UI/Button";
import ImagePicker from "../../components/UI/ImagePicker";
import OutgoingCard from "../../components/UI/Shipment/ShipmentCardOutgoingDetail";
//UI
import { Dimensions } from "react-native";
import { View } from "native-base";
//Redux Action
import { shipmentUpload } from "../../store/actions/shipment";

const WIDTH = Dimensions.get("window").width;

const ShipmentUploadDocumentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const success = useSelector((state) => state.ui.success);
  const outgoing = navigation.getParam("outgoing");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const isDisabled =
    !selectedImage || !selectedLocation || success ? true : false;

  const imageTakenHandler = (imgPath) => {
    setSelectedImage(imgPath);
  };

  const imageLocationHandler = (location) => {
    setSelectedLocation(location);
  };

  const uploadImageHandler = useCallback(() => {
    dispatch(shipmentUpload(outgoing.ID, selectedImage, selectedLocation));
  }, [selectedImage, selectedLocation]);

  useEffect(() => {
    dispatch({ type: "UI_RESET" });
  }, []);

  return (
    <>
      <AppBar title="Upload Dokumen" goBack={() => navigation.goBack()} />
      <ColorModeWrapper>
        <ImagePicker
          w={WIDTH * 0.9}
          h={WIDTH * 0.8}
          onImageTaken={imageTakenHandler}
          onLocationTaken={imageLocationHandler}
        />

        <View w={WIDTH * 0.9} mt={3}>
          <OutgoingCard outgoing={outgoing} key={outgoing.ID} noimages />
        </View>

        <Button
          mt={3}
          w={WIDTH * 0.9}
          isLoading={loading}
          isLoadingText="Mengupload..."
          isDisabled={isDisabled}
          onPress={uploadImageHandler}
        >
          Upload Document
        </Button>
      </ColorModeWrapper>
    </>
  );
};

export default ShipmentUploadDocumentScreen;
