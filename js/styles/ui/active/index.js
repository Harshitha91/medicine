// @flow
import { StyleSheet, Dimensions } from "react-native";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";
const th = Style.get();
const { width } = Dimensions.get("window");
const theme = Style.get();
const minTabSize = theme.tabScreenSize.minTabScreenSize;

const getInputWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 36;
  }

  return "100%";
};

const customDatePickerWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 144;
  }

  return "80%";
};

export const getListItemWidth = (listType) => {
  const { width } = Dimensions.get("window");
  if (listType === "grid") {
    return { width: width / 2 };
  }
  return { width };
};

const getLanugageBoxAlignment = () => {
  if (width >= minTabSize) {
    return "flex-end";
  }

  return "center";
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    flexDirection: "column"
  },
  flatListContentContainer: {
    alignItems: "center"
  },
  listContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  gridListContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  listTextContainer: {
    flex: 1,
    flexDirection: "column"
  },
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    margin: moderateScale(2),
    borderRadius: moderateScale(1),
    borderBottomWidth: 1,
    borderBottomColor: theme.sidebarItemBackground
  },
  listItemColumn: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    width: getInputWidth(),
    elevation: 3
  },
  listIconContainer: {
    flexDirection: "column",
    flexGrow: moderateScale(0.02),
    // alignItems: "center",
    justifyContent: "space-around",
    minHeight: 70,
    paddingLeft: moderateScale(8)
  },
  listItemText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.textColor
  },
  listItemSubText: {
    fontSize: normalize(theme.text.subTitleSize),
    color: theme.brandSecondActive,
    paddingTop: moderateScale(4),
    paddingBottom: moderateScale(4)
  },
  // form container styles
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16) // TODO: need to check with bigger screen
  },
  formSubTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: moderateScale(2),
    paddingLeft: moderateScale(3),
    color: theme.text.textColor
  },
  formSubTitleFullWidth: {
    width: "100%",
    justifyContent: "flex-start"
  },
  componentArea: {
    width: getInputWidth(),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(4)
  },
  languageSection: {
    width: getInputWidth(),
    alignSelf: "flex-end",
    paddingTop: moderateScale(8),
    paddingRight: moderateScale(10)
  },
  btnArea: {
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: moderateScale(20),
    marginBottom: moderateScale(20)
  },
  btn: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    marginRight: moderateScale(6),
    backgroundColor: '#ff2020',
  },
  btnCommonPool: {
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(8),
    paddingRight: moderateScale(10),
    marginRight: moderateScale(2)
  },
  commonPoolButtonArea: {
    width: "26%",
    alignSelf: "flex-end",
    borderColor: theme.sidebarItemBackground,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10)
  },
  fullWidth: {
    width: "100%",
    alignItems: getLanugageBoxAlignment()
  },
  listSearchContainer: {
    flex: 0,
    flexDirection: "row",
    padding: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: theme.sidebarItemBackground
  },
  searchContainer: {
    flex: 2
  },
  optionBox: {
    flex: 1,
    paddingRight: moderateScale(5)
  },
  radioContainer: {
    flex: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    paddingBottom: moderateScale(5),
    paddingTop: moderateScale(8)
  },
  householdIcon: {
    justifyContent: "center"
  },
  circleIcon: {
    marginTop: moderateScale(4)
  },
  map: {
    height: verticalScale(200),
    marginTop: 20
  },
  btnAreaContainer: {
    flex: 1,
    flexDirection: "row"
  },
  btnContainer: {
    flex: 1
  },
  listItemCloseIconInnerContainer: {
    borderRadius: 20,
    backgroundColor: theme.navBarHeaderColor,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40
  },
  CloseIconOuterContainer: {
    position: "absolute",
    top: moderateScale(1),
    right: moderateScale(1),
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: moderateScale(8),
    flexDirection: "row"
  },
  closeIcon: {
    justifyContent: "center"
  },
  buttonAreaContainer: {
    marginLeft: moderateScale(36),
    marginRight: moderateScale(1),
    width: 790,
    height: 100,
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  labelArea: {
    flexDirection: "row"
  },
  labelStyle: {
    marginRight: moderateScale(3)
  },
  membeberArea: {
    flexDirection: "column",
    borderBottomWidth: 1,
    paddingBottom: moderateScale(15),
    borderBottomColor: theme.sidebarItemBackground
  },
  searchArea: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderBottomWidth: 3,
    paddingTop: moderateScale(6),
    borderTopColor: theme.sidebarItemBackground,
    borderBottomColor: theme.sidebarItemBackground,
    paddingRight: moderateScale(10)
  },
  languageCotainer: {
    flex: 1,
    width: getInputWidth(),
    alignSelf: "flex-end",
    paddingTop: moderateScale(8),
    paddingRight: moderateScale(10)
  },
  memberAddButton: {
    flex: 0,
    alignSelf: "flex-end",
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(2),
    paddingRight: moderateScale(10)
  },
  tabContent: {
    marginTop: moderateScale(10)
  },
  nicTextStyle: {
    color: theme.text.redText
  },
  nicTextStylePink: {
    color: theme.text.pinkLabel
  },
  commonCitizenBackground: {
    backgroundColor: theme.brandSecond
  },
  comonPoolmemberOuterArea: {
    borderBottomWidth: 3,
    borderBottomColor: theme.sidebarItemBackground
  },
  activityIndicator: {
    flex: 1,
    marginTop: moderateScale(50),
    flexDirection: "column",
    alignItems: "center"
  },
  activityText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(10)
  },
  clearDateButton: {
    flexDirection: "row",
    padding: moderateScale(25),
    marginTop: moderateScale(5),
    width: 112,
    height: 112,
    color: theme.button.dangerBGColor
  },
  datePickerComponentArea: {
    width: customDatePickerWidth(),
    marginLeft: moderateScale(4)
  },
  acItemText: {
    fontSize: normalize(th.text.bigTitleSize)
  },
  memberSection: {
    marginTop: moderateScale(10),
    padding: moderateScale(10)
  },
  memberSectionTitle: {
    fontSize: normalize(theme.text.xBigTitleSize)
  },
  emptyListStyle: {
    flex: 1,
    justifyContent: "center"
  },
  emptyMessageStyle: {
    textAlign: "center",
    color: theme.emptyMessageColor,
    fontSize: normalize(theme.text.xBigTitleSize)
  },
  noResult: {
    alignItems: "center",
    paddingTop: moderateScale(5)
  },
  noResultTest: {
    alignItems: "center",
    paddingTop: moderateScale(4),
    fontSize: normalize(theme.text.buttonTextSize)
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: moderateScale(0.02),
    alignItems: "center",
    justifyContent: "center"
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(3)
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#FFFFFF'
  },
  tabContent: {
    marginTop: moderateScale(50),
    zIndex: 10000,
    backgroundColor: '#FFFFFF'
  }
});

export default styles;
