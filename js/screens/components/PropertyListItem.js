import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Style from "styles";
import Text from "components/ui/Text";
import { moderateScale, normalize, normalizeImage } from "util/sizes";
import { CachedImage } from "react-native-cached-image";

const theme = Style.get();

export const PropertyListItem = (props) => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity
      key={data.propertyId}
      style={styles.listItem}
      onPress={() => onPress(data)}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <View style={{ flex: 0.4 }}>
              {Platform.OS === "android" && (
                <Text type="bold" style={{ fontSize: 20 }}>
                  {data.name}
                </Text>
              )}
              {Platform.OS === "ios" && (
                <Text
                  numberOfLines={1}
                  type="bold"
                  style={{ fontSize: normalize(19) }}
                >
                  {data.name}
                </Text>
              )}
            </View>
            <View style={{ flex: 0.6 }}>
              <View style={{ flex: 1, flexDirection: "row", width: "80%" }}>
                <View style={{ alignItems: "flex-end", width: "10%" }}>
                  <Image
                    source={require("images/Location.png")}
                    style={
                      Platform.OS === "android"
                        ? {
                            height: moderateScale(20),
                            width: moderateScale(16),
                            top: moderateScale(10),
                          }
                        : {
                            height: normalizeImage(5),
                            width: normalizeImage(4),
                            top: moderateScale(10),
                          }
                    }
                  />
                </View>
                <View>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { top: moderateScale(8), left: moderateScale(8) }
                        : {
                            top: moderateScale(8),
                            left: moderateScale(8),
                            fontSize: normalize(15),
                          }
                    }
                  >
                    {`${data.address}, ${data.postalCode}, ${
                      data.country ? data.country : ""
                    }.`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", width: "15%" }}>
          <View style={{ height: moderateScale(70) }}>
            {data && data.imageData == null ? (
              <CachedImage
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  padding: 20,
                  borderRadius: 15,
                  top: 5,
                }}
                source={require("images/placeholder-rcs.png")}
              />
            ) : (
              <Image
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  padding: 20,
                  borderRadius: 15,
                  top: 5,
                }}
                source={{ uri: data.imageData }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 15,
    width: "90%",
    left: "5%",
    right: "2%",
    zIndex: 0,
    top: "5%",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: moderateScale(0.02),
    alignItems: "center",
    justifyContent: "center",
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(3),
  },
  listItemText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.textColor,
  },
});
