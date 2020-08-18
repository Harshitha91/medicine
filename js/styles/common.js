// @flow
import { StyleSheet } from "react-native";
import { scale, moderateScale, verticalScale } from "util/sizes"; // eslint-disable-line

import { normalize } from "util/sizes";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    borderRadius: 4,
    flex: 1,
    backgroundColor: theme.componentBackground.default
  },
  titleText: {
    fontSize: normalize(theme.text.xBigTitleSize),
    textAlign: "center",
    paddingBottom: 25,
    paddingTop: 30
  },
  saleTile: {
    width: 150,
    height: 100,
    backgroundColor: "red"
  }
});

export default styles;
