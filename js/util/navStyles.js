// @flow
import Style from "styles";

const theme = Style.get();

export const getNavigatorStyles = () => {
  return {
    navBarTextColor: theme.text.headerTextColor,
    statusBarColor: theme.statusBar,
    navBarBackgroundColor: theme.navBarHeaderColor,
    topTabTextColor: theme.text.topTabText,
    selectedTopTabTextColor: theme.text.headerTextColor,
    navBarButtonColor: theme.button.topTabButtonBackgroundColor,
    selectedTopTabIndicatorHeight: 3,
    selectedTopTabIndicatorColor: theme.button.topTabButtonBackgroundColor,
    screenBackgroundColor: theme.componentBackground.default
  };
};

export const getNavigatorStylesWithotShadow = () => {
  return {
    navBarTextColor: theme.text.headerTextColor,
    topBarElevationShadowEnabled: false,
    statusBarColor: theme.statusBar,
    navBarBackgroundColor: theme.navBarHeaderColor,
    topTabTextColor: theme.text.topTabText,
    selectedTopTabTextColor: theme.text.headerTextColor,
    navBarButtonColor: theme.button.topTabButtonBackgroundColor,
    selectedTopTabIndicatorHeight: 3,
    selectedTopTabIndicatorColor: theme.button.topTabButtonBackgroundColor,
    screenBackgroundColor: theme.componentBackground.default
  };
};

export const getStartupHeaderNavigatorStyle = () => {
  return {
    navBarHidden: true,
    navBarTextColor: "#444",
    statusBarColor: "#333",
    navBarBackgroundColor: "#FFF",
    navBarTitleTextCentered: true,
    topBarElevationShadowEnabled: false,
    selectedTopTabTextColor: "#FFF",
    navBarTextFontSize: 24,
    navBarButtonColor: "#333",
    selectedTopTabIndicatorHeight: 3,
    selectedTopTabIndicatorColor: "#FFF",
    screenBackgroundColor: "#FFF"
  };
};

export const getAddButtonStyle = () => {
  return {
    collapsedIcon: require("images/navicon_add.png"),
    collapsedIconColor: theme.text.fabIconColor,
    backgroundColor: theme.button.backgroundColor
  };
};
