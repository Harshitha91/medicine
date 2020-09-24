// @flow
import { StyleSheet, Dimensions, Platform } from "react-native";

import Style from "styles";
import { normalize, moderateScale, verticalScale } from "util/sizes";

const theme = Style.get();
const { width } = Dimensions.get("window");
const minTabSize = theme.tabScreenSize.minTabScreenSize;
const minMobileSize = theme.mobileWidth.maxMobileWidth;

const getInputWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 36;
  }

  return "100%";
};

const getImageWidth = () => {
  if (width >= minMobileSize) {
    return moderateScale(196);
  }

  return moderateScale(216);
};

const getImageHeight = () => {
  if (width >= minMobileSize) {
    return moderateScale(50);
  }

  return moderateScale(55);
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
    backgroundColor: "#FFFFFF",
  },
  loginFormWrapper: {
    width: "100%",
    flexDirection: "column",
    marginTop: verticalScale(30),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#FFFFFF",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  labelArea: {
    marginTop: verticalScale(0),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginTop: verticalScale(17),
    width: 85,
    height: 100,
  },

  baseText: {
    marginTop: "10%",
    fontSize: 30,
    marginBottom: verticalScale(10),
    color: "black",
  },

  titleText: {
    fontSize: 20,
    color: "black",
  },
  forgotPasswordArea: {
    marginTop: verticalScale(20),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInButton: {
    height: 48,
    width: 315,
    backgroundColor: "#ff2020",
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
    marginTop: verticalScale(20),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: moderateScale(30),
  },
  linkText: {
    color: "#00adf5",
  },
  buttonSignIn: {
    height: 60,
    width: 315,
    backgroundColor: "#ff2020",
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
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  rcsButton:
    Platform.OS === "android"
      ? {
          height: 48,
          width: "100%",
          backgroundColor: "#00adf5",
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
    marginTop: 30,
    width: "100%",
  },
});

export default styles;
