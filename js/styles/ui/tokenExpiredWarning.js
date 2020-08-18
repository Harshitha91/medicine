// @flow
import { StyleSheet } from "react-native";

import Style from "styles";
import { normalize, moderateScale } from "util/sizes";

const theme = Style.get();

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    flexDirection: "column",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16)
  },
  titleText: {
    fontSize: normalize(theme.text.bigTitleSize),
    marginTop: moderateScale(10),
    alignSelf: "center"
  },
  componentArea: {
    flex: 0,
    borderRadius: 4,
    marginTop: 15,
    flexDirection: "column"
  }
});

export default styles;
