// @flow
import { StyleSheet } from "react-native";
import { moderateScale } from "util/sizes";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  //Create Form style
  wrapper: {
    flex: 1
  },
  frmContainer: {
    paddingTop: moderateScale(15)
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: moderateScale(5),
    paddingLeft: moderateScale(6),
    color: theme.text.textColor
  },
  formSection: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(16)
  },
  formSectionDisabled: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(16),
    backgroundColor: theme.disabledBackground
  },
  formSectionWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10)
  }
});

export default styles;
