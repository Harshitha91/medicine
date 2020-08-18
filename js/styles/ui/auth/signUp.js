// @flow
import { StyleSheet, Dimensions, Platform } from "react-native";

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
  loginContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    height: "100%",
  },
  loginFormWrapper: {
    width: "100%",
    flexDirection: "column",
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(10),
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#FFFFFF",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelArea:
    Platform.OS === "android"
      ? {
          marginTop: verticalScale(10),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }
      : {
          marginTop: verticalScale(10),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: verticalScale(10),
        },
  logo: {
    marginTop: verticalScale(17),
    width: moderateScale(210),
    height: verticalScale(50),
  },
  key: {
    marginTop: verticalScale(40),
    width: moderateScale(240),
    height: verticalScale(110),
    marginBottom: verticalScale(50),
  },
  lock: {
    marginTop: verticalScale(40),
    width: moderateScale(218),
    height: verticalScale(115),
    marginBottom: verticalScale(50),
  },
  baseText: {
    marginTop: "1%",
    fontSize: 30,
    marginBottom: verticalScale(10),
    color: "black",
  },
  titleText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  bottomText: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(40),
  },
  forgotPasswordArea: {
    marginTop: verticalScale(30),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    height: 48,
    width: 315,
    backgroundColor: "#032DFF",
    shadowColor: "rgba(255, 107, 107, 0.45)",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
  },
  signUpArea: {
    marginTop: verticalScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: moderateScale(5),
    marginBottom: 30,
  },
  linkText: {
    color: "#032DFF",
    marginBottom: 50,
  },
  buttonSignIn: {
    height: 60,
    width: 315,
    backgroundColor: "#032DFF",
    shadowColor: "rgba(255, 107, 107, 0.45)",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
    marginTop: verticalScale(30),
  },
  buttonSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  rcsButton:
    Platform.OS === "android"
      ? {
          height: 48,
          width: "100%",
          backgroundColor: "#032DFF",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: 20,
        }
      : {
          height: 45,
          width: "100%",
          backgroundColor: "#ff2020",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: 20,
          paddingTop: moderateScale(12),
          paddingBottom: moderateScale(0),
        },
  signingLinktText: {
    marginTop: "15%",
    color: "#032DFF",
  },
  inputField: {
    height: 48,
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(125, 125, 125, 0.19)",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
    elevation: 1,
    paddingLeft: 15,
  },
  inputContainer: {
    marginTop: moderateScale(10),
    width: "100%",
  },
});

export default styles;
