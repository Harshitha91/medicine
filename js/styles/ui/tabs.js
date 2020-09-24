// @flow
import { StyleSheet } from "react-native";
import { moderateScale, normalize } from "util/sizes";

import Style from "styles";
const theme = Style.get();

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1000,
  },
  tabContent: {
    marginTop: moderateScale(40),
    zIndex: 10000,
  },
  tabpaneContainerItem: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: moderateScale(12),
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 3,
    zIndex: 1000200,
    elevation: 0,
  },
  tabpaneContainerSelected: {
    borderBottomColor: "#00adf5",
    borderBottomWidth: 3,
    zIndex: 1000200,
  },
  iconStyle: {
    justifyContent: "center",
    margin: moderateScale(5),
  },
  tabTextStyle: {
    fontSize: normalize(theme.text.subTitleSize),
    fontFamily: "Ubuntu-Bold",
    color: "#000",
  },
  tabDisabledTextStyle: {
    fontSize: normalize(theme.text.subTitleSize),
    color: "#9e9e9e",
    fontWeight: "normal",
  },
  tabContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default styles;
