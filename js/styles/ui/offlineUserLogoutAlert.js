// @flow
import { StyleSheet, Dimensions } from "react-native";

import Style from "styles";
import { normalize, moderateScale } from "util/sizes";

const theme = Style.get();
const { width } = Dimensions.get("window");
const minTabSize = theme.tabScreenSize.minTabScreenSize;

const getInputWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 36;
  }
  return "100%";
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
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
  componentArea: {
    width: getInputWidth(),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(4)
  },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16)
  }
});

export default styles;
