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

const stylescmn = StyleSheet.create({
  loginContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    height: '100%',
  },
  loginFormWrapper: {
    width: "100%",
    flexDirection: "column",
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(10),
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelArea: {
    marginTop: verticalScale(10),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: verticalScale(17),
    width: moderateScale(190),
    height: verticalScale(60),
  },
  key: {
    marginTop: verticalScale(40),
    width: moderateScale(240),
    height: verticalScale(110),
    marginBottom: verticalScale(50),
  },
  lock: {
    marginTop: verticalScale(40),
    width: moderateScale(240),
    height: verticalScale(100),
    marginBottom: verticalScale(50),
  },
  baseText: {
    marginTop: '1%',
    fontSize: 30,
    marginBottom: verticalScale(10),
    color: 'black',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  bottomText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(40),
  },
  forgotPasswordArea: {
    marginTop: verticalScale(20),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    height: 48,
    width: 315,
    backgroundColor: '#ff2020',
    shadowColor: 'rgba(255, 107, 107, 0.45)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20
  },
  signUpArea: {
    marginTop: verticalScale(10),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: moderateScale(50),
    marginBottom: 50
  },
  linkText: {
    color: 'rgb(255, 32, 32)',
    //fontWeight: 'bold'
  },
  buttonSignIn: {
    height: 60,
    width: 315,
    backgroundColor: '#ff2020',
    shadowColor: 'rgba(255, 107, 107, 0.45)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
    marginTop: verticalScale(30),
  },
  buttonSection: {
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  fixedbutton:{
    width: '100%',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    marginBottom: '20%'
  },
  rcsButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#ff2020',
    shadowColor: 'rgba(255, 107, 107, 0.45)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
  },
  signingLinktText: {
    marginTop: '15%',
    color: 'rgb(255, 32, 32)'
  },
  inputField: {
    height: 48,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
    elevation: 1,
    paddingLeft: 15
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
});

export default stylescmn;