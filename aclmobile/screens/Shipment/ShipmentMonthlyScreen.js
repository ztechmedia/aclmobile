import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//UI
import { IconButton, Icon, Text, View, useColorModeValue } from "native-base";
import { StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
//Component
import AppBar from "../../components/UI/AppBar";
import ColorModeWrapper from "../../components/UI/Center";
import Divider from "../../components/UI/Divider";
import ShipmentCard from "../../components/UI/Shipment/ShipmentCard";
import ActivityIndicator from "../../components/UI/ActivityIndicator";
//Redux Action
import {
  shipmentMonthly,
  shipmentMonthlyLoadMore,
  clearShipment,
} from "../../store/actions/shipment";
//Constant
import Color from "../../constants/Color";

const ShipmentMonthlyScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const filterColor = useColorModeValue(Color.primary, Color.primaryDark);
  const filters = useSelector((state) => state.shipment.filters);
  const loading = useSelector((state) => state.shipment.loading);
  const nextPage = useSelector((state) => state.shipment.monthlyNextPage);
  const shipments = useSelector((state) => state.shipment.shipmentsMonthly);
  const loadingMore = useSelector((state) => state.ui.loading);

  const loadShipmentHandler = () => {
    dispatch(shipmentMonthly());
    dispatch(clearShipment());
  };

  const loadMoreHandler = () => {
    if (!loadingMore && nextPage) {
      dispatch(shipmentMonthlyLoadMore(nextPage));
    }
  };

  useEffect(() => {
    if (!shipments) {
      loadShipmentHandler();
    }
  }, [filters]);

  let shipmentsList = <ActivityIndicator />;

  if (!loading && shipments && shipments.length === 0) {
    shipmentsList = (
      <ScrollView
        contentContainerStyle={styles.Centered}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadShipmentHandler}
          />
        }
      >
        <Text>Tidak ada pengiriman</Text>
      </ScrollView>
    );
  }

  if (!loading && shipments && shipments.length > 0) {
    shipmentsList = (
      <FlatList
        keyExtractor={(item) => item.AWB_No + Math.random()}
        onRefresh={loadShipmentHandler}
        refreshing={loading}
        data={shipments}
        renderItem={(itemData) => (
          <ShipmentCard
            item={itemData.item}
            onPress={() =>
              navigation.navigate("ShipmentDetail", {
                awbNumber: itemData.item.AWB_No,
                goBack: "ShipmentMonthly",
              })
            }
          />
        )}
        onEndReached={loadMoreHandler}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
    );
  }

  return (
    <>
      <AppBar
        title="Pengiriman Bulanan"
        goBack={() => navigation.navigate("ShipmentHome")}
        onRightPress={loadShipmentHandler}
      />
      <ColorModeWrapper>
        <View h="100%" w="100%">
          <View h={55} style={styles.FilterContainer}>
            <ScrollView horizontal style={styles.ScrollView}>
              <View
                bg={filters.date && "gray.500"}
                style={styles.FilterContent}
              >
                <Text color="white">{`${filters.month} ${filters.year}`}</Text>
              </View>
            </ScrollView>
            <View style={styles.FilterButton}>
              <IconButton
                onPress={() =>
                  navigation.navigate("ShipmentMonthlyFilter", {
                    goBack: "ShipmentMonthly",
                  })
                }
                _pressed={{
                  backgroundColor: Color.pressed2,
                }}
                icon={
                  <Icon
                    size="sm"
                    as={<FontAwesome5 name="filter" />}
                    color={filterColor}
                  />
                }
              />
            </View>
          </View>
          <Divider />
          {shipmentsList}
          {loadingMore && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 55,
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text bold color="white">
                Load more...
              </Text>
            </View>
          )}
        </View>
      </ColorModeWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    padding: 5,
    width: "100%",
  },
  FilterButton: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  FilterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  FilterContent: {
    marginRight: 5,
    paddingHorizontal: 10,
    height: "100%",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  Centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShipmentMonthlyScreen;
