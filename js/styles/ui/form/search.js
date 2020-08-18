// @flow
import { StyleSheet } from "react-native";

import { moderateScale } from "util/sizes";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  inputGroup: {
    flex: 0,
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.form.searchInputBackgroundColor
  },
  input: { flex: 4 },
  clearSearch: {
    position: "absolute",
    right: moderateScale(14),
    top: moderateScale(7.8)
  }
});

export default styles;
