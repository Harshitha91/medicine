// @flow
import { StyleSheet } from "react-native";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

const styles = StyleSheet.create({
  containerStyle: {
    flex: 0,
    flexDirection: "row"
  },
  textContainerStyle: {
    padding: moderateScale(3),
    backgroundColor: theme.label.default,
    borderRadius: moderateScale(2)
  },
  labelTextStyle: {
    fontSize: normalize(theme.text.subTitleSize)
  },
  progressBarContainer: {
    flexDirection: "column",
    width: moderateScale(40),
    height: verticalScale(16),
    alignItems: "flex-start",
    backgroundColor: theme.label.default,
    overflow: "hidden",
    borderRadius: moderateScale(2)
  },
  progressBar: {
    position: "absolute",
    height: "100%",
    top: 0,
    backgroundColor: theme.brandGreen,
    borderTopLeftRadius: moderateScale(2),
    borderBottomLeftRadius: moderateScale(2)
  },
  progressText: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    paddingTop: moderateScale(3)
  }
});

export default styles;
