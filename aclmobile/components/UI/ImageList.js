import React from "react";
import { Dimensions } from "react-native";
//UI
import { View, Image, Text } from "native-base";
//Constants
import { loadThumbnail } from "../../constants/EndPoint";
//Utils
import { uuid } from "../../utils/utility";
//File
import NoImage from "../../assets/img/no_image.png";

const WIDTH = Dimensions.get("window").width;

const Image1 = ({ items, filecheck, filename }) => {
  return items.map((item) => {
    if (item[filecheck]) {
      return (
        <Image
          rounded={5}
          source={{
            uri: loadThumbnail(item[filename]),
          }}
          alt={item[filename]}
          w={WIDTH * 0.3}
          h={WIDTH * 0.3}
        />
      );
    } else {
      <Image
        rounded={5}
        source={NoImage}
        alt={item[filename]}
        w={WIDTH * 0.3}
        h={WIDTH * 0.3}
      />;
    }
  });
};

const Image2 = ({ items, filecheck, filename }) => {
  return items.map((item, index) => {
    let mt = index === 0 ? 0 : -60;
    if (item[filecheck]) {
      if (index < 1) {
        return (
          <Image
            rounded={WIDTH * 0.3}
            source={{
              uri: loadThumbnail(item[filename]),
            }}
            alt={item[filename]}
            w={WIDTH * 0.3}
            h={WIDTH * 0.3}
            style={{ marginLeft: mt }}
            key={uuid()}
          />
        );
      } else {
        return (
          <View
            bg="#ddd"
            rounded={WIDTH * 0.3}
            w={WIDTH * 0.3}
            h={WIDTH * 0.3}
            alignItems="center"
            justifyContent="center"
            style={{ marginLeft: mt }}
            key={uuid()}
          >
            <Text color="black">+{items.length - (index - 1)}</Text>
          </View>
        );
      }
    } else {
      <Image
        rounded={WIDTH * 0.3}
        source={NoImage}
        alt={item[filename]}
        w={WIDTH * 0.3}
        h={WIDTH * 0.3}
        style={{ marginLeft: mt }}
        key={uuid()}
      />;
    }
  });
};

const Image3 = ({ items, filecheck, filename }) => {
  return items.map((item, index) => {
    let mt = index === 0 ? 0 : -60;
    if (item[filecheck]) {
      if (index < 2) {
        return (
          <Image
            rounded={WIDTH * 0.25}
            source={{
              uri: loadThumbnail(item[filename]),
            }}
            alt={item[filename]}
            w={WIDTH * 0.25}
            h={WIDTH * 0.25}
            style={{ marginLeft: mt }}
            key={uuid()}
          />
        );
      } else {
        return (
          <View
            bg="#ddd"
            rounded={WIDTH * 0.25}
            w={WIDTH * 0.25}
            h={WIDTH * 0.25}
            alignItems="center"
            justifyContent="center"
            style={{ marginLeft: mt }}
            key={uuid()}
          >
            <Text color="black">+{items.length - (index - 1)}</Text>
          </View>
        );
      }
    } else {
      <Image
        rounded={WIDTH * 0.25}
        source={NoImage}
        alt={item[filename]}
        w={WIDTH * 0.25}
        h={WIDTH * 0.25}
        style={{ marginLeft: mt }}
        key={uuid()}
      />;
    }
  });
};

const Image4 = ({ items, filecheck, filename }) => {
  return items.map((item, index) => {
    let mt = index === 0 ? 0 : -40;
    if (item[filecheck]) {
      if (index < 3) {
        return (
          <Image
            rounded={WIDTH * 0.19}
            source={{
              uri: loadThumbnail(item[filename]),
            }}
            alt={item[filename]}
            w={WIDTH * 0.19}
            h={WIDTH * 0.19}
            style={{ marginLeft: mt }}
            key={uuid()}
          />
        );
      } else {
        return (
          <View
            bg="#ddd"
            rounded={WIDTH * 0.19}
            w={WIDTH * 0.19}
            h={WIDTH * 0.19}
            alignItems="center"
            justifyContent="center"
            style={{ marginLeft: mt }}
            key={uuid()}
          >
            <Text color="black">+{items.length - (index - 1)}</Text>
          </View>
        );
      }
    } else {
      <Image
        rounded={WIDTH * 0.19}
        source={NoImage}
        alt={item[filename]}
        w={WIDTH * 0.19}
        h={WIDTH * 0.19}
        style={{ marginLeft: mt }}
        key={uuid()}
      />;
    }
  });
};

const Image5 = ({ items, filecheck, filename }) => {
  return items.map((item, index) => {
    let mt = index === 0 ? 0 : -35;
    if (index < 5) {
      if (item[filecheck]) {
        if (index < 4) {
          return (
            <Image
              rounded={WIDTH * 0.15}
              source={{
                uri: loadThumbnail(item[filename]),
              }}
              alt={item[filename]}
              w={WIDTH * 0.15}
              h={WIDTH * 0.15}
              style={{ marginLeft: mt }}
              key={uuid()}
            />
          );
        } else {
          return (
            <View
              bg="#ddd"
              rounded={WIDTH * 0.15}
              w={WIDTH * 0.15}
              h={WIDTH * 0.15}
              alignItems="center"
              justifyContent="center"
              style={{ marginLeft: mt }}
              key={uuid()}
            >
              <Text color="black">+{items.length - (index - 1)}</Text>
            </View>
          );
        }
      } else {
        <Image
          rounded={WIDTH * 0.15}
          source={NoImage}
          alt={item[filename]}
          w={WIDTH * 0.15}
          h={WIDTH * 0.15}
          style={{ marginLeft: mt }}
          key={uuid()}
        />;
      }
    }
  });
};

const ImageList = ({ items, filecheck, filename }) => {
  const photo = items
    .map((item) => item.Foto_AWB !== "")
    .filter((item) => item).length;

  let NewImageList;

  if (photo === 2) {
    NewImageList = Image2;
  } else if (photo === 3) {
    NewImageList = Image3;
  } else if (photo === 4) {
    NewImageList = Image4;
  } else if (photo >= 5) {
    NewImageList = Image5;
  } else {
    NewImageList = Image1;
  }

  return (
    <View flexDirection="row" alignItems="center" justifyContent="center">
      <NewImageList items={items} filecheck={filecheck} filename={filename} />
    </View>
  );
};

export default ImageList;
