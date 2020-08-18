// @flow
import { StyleSheet, Dimensions } from "react-native";

import Style from "styles";
import { normalize, moderateScale, verticalScale } from "util/sizes";

const theme = Style.get();
const { width } = Dimensions.get("window");
const minTabSize = theme.tabScreenSize.minTabScreenSize;

const getInputWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 36;
  }

  return "100%";
};

const getLanugageBoxAlignment = () => {
  if (width >= minTabSize) {
    return "flex-end";
  }

  return "center";
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.brandColor
  },
  loadingText: {
    color: theme.text.headerTextColor,
    fontSize: normalize(theme.text.titleSize)
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(30),
    height: verticalScale(80)
  },
  topLogo: {
    width: moderateScale(140),
    height: verticalScale(80)
  },
  titleArea: {
    marginTop: moderateScale(35),
    padding: moderateScale(10)
  },
  titleText: {
    color: theme.text.textColor,
    textAlign: "center",
    fontSize: normalize(theme.text.xBigTitleSize)
  },
  appLogoArea: {
    marginTop: moderateScale(15),
    width: moderateScale(110),
    height: verticalScale(110)
  },
  applogo: {
    width: moderateScale(110),
    height: verticalScale(110)
  },
  footerText: {
    color: theme.text.textColor,
    textAlign: "center",
    marginTop: moderateScale(12),
    marginBottom: moderateScale(12),
    fontSize: normalize(theme.text.smallText)
  },
  loginFormArea: {
    width: "100%",
    flexDirection: "column",
    paddingLeft: moderateScale(50),
    paddingRight: moderateScale(50),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20)
  },
  formElement: {
    flex: 0,
    flexDirection: "column"
  },
  componentArea: {
    width: getInputWidth(),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(4)
  },
  loginTitle: {
    fontSize: normalize(theme.text.bigTitleSize),
    marginTop: moderateScale(10),
    alignSelf: "center"
  },
  fullWidth: {
    width: "100%",
    alignItems: getLanugageBoxAlignment()
  }
});

export default styles;
