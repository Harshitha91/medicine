// @flow
import { StyleSheet } from "react-native";
import Style from "styles";

const theme = Style.get();

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Ubuntu-Regular",
    color: theme.text.textColor
  },
  medium: {
    fontFamily: "Ubuntu-Medium",
    color: theme.text.textColor
  },
  bold: {
    fontFamily: "Ubuntu-Bold",
    color: theme.text.textColor
  },
  italic: {
    fontFamily: "Ubuntu-RegularItalic",
    color: theme.text.textColor
  }
});

export default styles;
