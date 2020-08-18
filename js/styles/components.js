// @flow
import { StyleSheet } from "react-native";
import { moderateScale } from "util/sizes";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: "column",
    padding: moderateScale(10)
  },
  titleText: {
    fontSize: 22,
    paddingBottom: 8,
    color: theme.text.textColor
  },
  componentArea: {
    flex: 0,
    flexDirection: "column"
  },
  componentBlock: {
    flex: 0,
    flexDirection: "column",
    paddingBottom: 30
  },
  rawContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default styles;
