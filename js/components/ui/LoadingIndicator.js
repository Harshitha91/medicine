import React from "react";
import { View, ActivityIndicator } from "react-native";
import Text from "./Text";
import { StyleSheet } from "react-native";
import { moderateScale, normalize } from "util/sizes";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    marginTop: moderateScale(50),
    flexDirection: "column",
    alignItems: "center",
  },
  activityText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(10),
  },
});

export default () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator animating={true} color={"#00adf5"} size={40} />
      <Text style={styles.activityText}>Loading...</Text>
    </View>
  );
};
