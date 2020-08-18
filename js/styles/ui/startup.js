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
    alignItems: "center",
    backgroundColor: theme.navBarHeaderColor
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.navBarHeaderColor
  },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16) // TODO: need to check with bigger screen
  },
  loadingText: {
    color: theme.text.headerTextColor,
    fontSize: normalize(theme.text.titleSize)
  },
  loginWrapper: {
    width: moderateScale(340)
  },
  loginInputBox: {
    flex: 0,
    width: "100%",
    height: verticalScale(300),
    marginTop: verticalScale(140),
    backgroundColor: "#FFF",
    elevation: 2
  },
  // logoArea: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  topLogo: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    width: moderateScale(50),
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
  errorText: {
    color: theme.brandRed,
    textAlign: "center",
    fontSize: normalize(theme.text.titleSize)
  },
  appLogoArea: {
    backgroundColor: "#333"
  },
  applogo: {
    width: moderateScale(150),
    height: verticalScale(80)
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
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(30),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10)
  },
  formElement: {
    flex: 0,
    flexDirection: "column"
  },
  btnArea: {
    marginTop: moderateScale(10)
  },
  loginBtn: {
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(18)
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
  },
  visibilityBtn: {
    position: "absolute",
    right: 15,
    top: 5,
    height: 44,
    width: 43,
    padding: 5,
    paddingLeft: 12,
    borderColor: "grey",
    alignSelf: "center",
    paddingTop: 3
  },
  btnImage: {
    resizeMode: "contain",
    height: "90%",
    width: "90%",

  },
  loginLocalContainer: {
    position: "absolute",
    alignSelf: "center",
    paddingTop: moderateScale(20)
  },
});

export default styles;
