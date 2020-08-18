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
  formElement: {
    paddingTop: moderateScale(11),
    flex: 0,
    flexDirection: "column",
    height: 10
  }
});

export default styles;
