// @flow
import { StyleSheet } from "react-native";

import Style from "styles";
import { moderateScale, verticalScale, normalize } from "util/sizes";

const theme = Style.get();

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: theme.sidebarBackground
  },
  navTopWrapper: {
    justifyContent: "center",
    padding: moderateScale(10)
  },
  linksArea: {
    flex: 1,
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(12),
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  linkItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.sidebarItemBackground,
    width: moderateScale(130),
    padding: moderateScale(10),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    marginBottom: verticalScale(20),
    borderRadius: 1
  },
  bottomLinkItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(15)
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(6)
  },
  linkText: {
    color: theme.sidebarLinkTextColor,
    fontSize: normalize(theme.text.buttonTextSize),
    textAlign: "center",
    paddingTop: 10
  },
  bottomLinkText: {
    color: theme.text.liteText,
    textAlign: "center",
    fontSize: normalize(theme.text.subTitleSize),
    paddingLeft: moderateScale(8)
  },
  profileArea: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(20)
  },
  profileWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(25)
  },
  dummyProfilePic: {
    backgroundColor: theme.componentBackground.default,
    padding: moderateScale(7),
    borderRadius: 100 * 100,
    alignItems: "center",
    width: moderateScale(48),
    height: moderateScale(48)
  },
  dummyProfileText: {
    fontSize: normalize(theme.text.xBigTitleSize + 20),
    color: theme.brandColor
  },
  userName: {
    fontSize: normalize(theme.text.xBigTitleSize),
    color: theme.text.liteText,
    paddingTop: moderateScale(8)
  },
  bottomArea: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: theme.brandColor,
    justifyContent: "space-around"
  },
  versionContainer: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10)
  },
  versionText: {
    color: theme.text.liteText,
    fontSize: normalize(theme.text.bigTitleSize)
  }
});

export default styles;
