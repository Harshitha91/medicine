// @flow
import { StyleSheet, Platform } from "react-native";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

const styles = StyleSheet.create({
  containerStyle: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(24),
    backgroundColor: theme.button.backgroundColor,
    padding: moderateScale(theme.button.padding),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    minWidth: 120,
    borderRadius: 50
  },
  btnTextDefault: Platform.OS === 'android' ? {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.button.color,
  } : {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.button.color,
    paddingBottom: moderateScale(15)
  },
  transparent: Platform.OS === 'android' ? {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(theme.button.padding),
    height: verticalScale(24),
    borderWidth: 2,
    borderColor: theme.button.backgroundColor,
    borderRadius: theme.button.borderRadius,
    backgroundColor: "transparent"
  } : {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // padding: moderateScale(theme.button.padding),
    paddingBottom: 100,
    borderWidth: 2,
    borderColor: theme.button.backgroundColor,
    borderRadius: theme.button.borderRadius,
    backgroundColor: "transparent"
  },
  iconBtn: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(105),
    padding: moderateScale(theme.button.padding),
    height: verticalScale(24),
    backgroundColor: "transparent",
    marginRight: 5
  },
  btnTextTransparent: {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.button.backgroundColor
  },
  btnLabel: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(80),
    padding: moderateScale(theme.button.padding),
    height: verticalScale(24),
    backgroundColor: "transparent",
    marginRight: 5,
    fontSize: moderateScale(12),    
  }
});

export default styles;
