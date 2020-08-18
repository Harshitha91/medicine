// @flow
import { StyleSheet, Platform } from "react-native";

import Style from "styles";
import { normalize, moderateScale } from "util/sizes";

const theme = Style.get();
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    alignItems: "center"
  },
  errorText: (Platform.OS === 'android') ? {
    color: "#FFFFFF",
    backgroundColor: "#EF5350",
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  } : {
    color: "#FFFFFF",
    backgroundColor: "#EF5350",
    height: moderateScale(80),
    width: "100%",
    textAlign: "center",
    paddingTop: moderateScale(50),
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  },
  warnText: (Platform.OS === 'android') ? {
    color: "#FFFFFF",
    backgroundColor: "#FFA726",
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  } : {
    color: "#FFFFFF",
    backgroundColor: "#FFA726",
    height: moderateScale(80),
    width: "100%",
    textAlign: "center",
    paddingTop: moderateScale(50),
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  },
  successText: (Platform.OS === 'android') ? {
    color: "#FFFFFF",
    backgroundColor: "#388E3C",
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  } : {
    color: "#FFFFFF",
    backgroundColor: "#388E3C",
    height: moderateScale(80),
    width: "100%",
    textAlign: "center",
    paddingTop: moderateScale(50),
    padding: 10,
    fontSize: normalize(theme.text.titleSize)
  }
});

export default styles;
