// @flow
import { StyleSheet, PixelRatio, Dimensions } from "react-native";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();
const minTabSize = theme.tabScreenSize.minTabScreenSize;
const { width } = Dimensions.get("window");

const getInputWidth = () => {
  if (width >= minTabSize) {
    return width / 2 - 36;
  }

  return "100%";
};

const styles = StyleSheet.create({
  inputGroup: {
    flex: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: moderateScale(20),
  },
  inlineInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  editableFalseStyle: {
    borderWidth: 1,
    borderColor: theme.border.inputBorderColor,
    borderRadius: 1,
    borderStyle: "dotted",
  },
  inputGroupAuto: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
  },
  smallInputGroup: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  checkBoxContainer: {
    flex: 6,
    marginTop: moderateScale(7),
  },
  container: {
    flex: 6,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    borderColor: theme.border.inputBorderColor,
  },
  switchContainer: {
    flex: 0,
  },
  noBorderContainer: {
    flex: 6,
  },
  remainValue: {
    flex: 2,
  },
  remainText: {
    fontSize: normalize(theme.text.buttonTextSize),
    textAlign: "left",
    paddingLeft: moderateScale(9),
  },
  hasRemainValue: {
    flex: 4,
  },
  imagePickerContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  smallContainer: {
    flex: 4,
  },
  errorMsg: {
    paddingTop: 4,
    fontSize: normalize(theme.text.smallText),
    color: theme.text.errorTextColor,
    fontFamily: "Ubuntu-Regular",
  },
  input: {
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(6.3),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: normalize(theme.form.inputFontSize),
    fontFamily: "Ubuntu-Regular",
    color: "#000000",
  },
  phoneInput: {
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(6.3),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: normalize(20),
    fontFamily: "Ubuntu-Regular",
    color: "#000000",
  },
  inputElementWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputSubWrapper: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  switchElementWrapper: {
    justifyContent: "flex-end",
  },
  inputView: {
    padding: moderateScale(4),
  },
  samllInput: {
    padding: moderateScale(2.5),
    fontSize: normalize(theme.form.inputFontSizeSmall),
  },
  label: {
    width: "100%",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
    paddingRight: moderateScale(12.5),
    fontSize: normalize(theme.text.subTitleSize),
    color: theme.text.inputTextColor,
    fontFamily: "Ubuntu-Medium",
  },
  switchLabel: {
    flex: 4,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
    paddingRight: moderateScale(12.5),
    fontSize: normalize(theme.text.subTitleSize),
    color: theme.text.inputTextColor,
  },
  switchLabelWrapper: {
    flex: 1,
    flexDirection: "column",
  },
  checkBoxlabel: {
    flex: 4,
    justifyContent: "center",
    textAlign: "left",
    paddingTop: moderateScale(6),
    paddingRight: moderateScale(12.5),
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.text.inputTextColor,
  },
  smallLabel: {
    flex: 5,
    fontSize: normalize(theme.text.subTitleSize),
    paddingRight: moderateScale(3),
    fontFamily: "Ubuntu",
  },

  pickerContainer: {
    paddingTop: moderateScale(7.7),
    paddingBottom: moderateScale(8),
    paddingLeft: moderateScale(6.5),
    paddingRight: moderateScale(6.5),
  },
  text: {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.text.inputTextColor,
  },
  disabledText: {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.text.greyText,
  },
  inputstyle: {
    flex: 1,
    fontSize: normalize(theme.form.inputFontSize),
    color: theme.text.textColor,
    backgroundColor: "transparent",
  },
  inputContainerStyle: {
    flex: 1,
    margin: 0,
    borderWidth: 2,
    borderColor: theme.border.inputBorderColor,
  },
  itemText: {},
  avatarContainer: {
    borderColor: theme.border.defaultBorderColor,
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: moderateScale(75),
    height: moderateScale(75),
  },
  pickerLink: {
    flex: 8,
    paddingBottom: moderateScale(12.5),
    paddingLeft: moderateScale(13),
  },
  pickerLinkText: {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.text.subTextColor,
  },
  errorContainer: {
    flex: 6,
    borderWidth: 2,
    borderColor: theme.border.errorBorderColor,
  },
  errorBorder: {
    borderWidth: 2,
    borderColor: theme.border.errorBorderColor,
  },
  errorText: {
    color: theme.text.errorTextColor,
  },
  //Autocomplete input styles
  autocompleteInput: {
    height: verticalScale(25.5),
    paddingTop: moderateScale(6.3),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
  },
  autoInputSelectedText: {
    color: theme.text.inputTextColor,
    fontSize: normalize(theme.form.inputFontSize),
  },
  acModalContainer: {
    height: "80%",
  },
  acFormContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  acInputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.sidebarItemBackground,
    paddingTop: moderateScale(10),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
  },
  acItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.sidebarItemBackground,
    padding: moderateScale(14),
  },
  searchItems: {
    flex: 1,
  },
  //////
  toDelete: {
    padding: 0,
    margin: 0,
    backgroundColor: theme.componentBackground.default,
  },
  closeBtn: {
    paddingTop: moderateScale(9.5),
    paddingBottom: moderateScale(9.5),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    borderRadius: moderateScale(25),
  },
  dateRemoveBtn: {
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
  },
  //List Select Box styles
  listSelectContainer: {
    flex: 1,
    margin: moderateScale(6),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listSelectSubContainer: {
    flex: 1,
  },
  listSelectHeader: {
    justifyContent: "center",
  },
  listSelectHeaderText: {
    fontSize: normalize(theme.text.titleSize),
    marginBottom: moderateScale(11.5),
  },
  listSelectContent: {
    flex: 11,
  },
  listSelectBox: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(6),
    margin: moderateScale(6),
  },
  listSelectBoxText: {
    flex: 5,
    fontSize: normalize(theme.text.buttonTextSize),
  },
  listSelectVr: {
    width: 1,
    backgroundColor: "black",
    marginLeft: moderateScale(6),
    marginRight: moderateScale(6),
  },
  bottomSection: {
    flexDirection: "row",
    paddingTop: moderateScale(6),
    justifyContent: "space-between",
  },
  containerCheckButton: {
    flexDirection: "row",
    flex: 6,
  },
  checkButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: theme.border.inputBorderColor,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    height: 40,
    backgroundColor: theme.componentBackground.inputBackground,
  },
  selectedCheckButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: theme.border.inputBorderColor,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    height: 40,
    backgroundColor: theme.button.backgroundColor,
  },
  textCheckButton: {
    color: theme.componentBackground.inputBackground,
  },
  // Radio Button styles
  radioBtn: {
    flex: 1,
    flexBasis: 1,
    padding: 10,
    minWidth: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rowBtn: {
    flexDirection: "row",
  },
  radioActive: {
    borderWidth: 2,
    borderColor: theme.button.backgroundColor,
    backgroundColor: theme.button.backgroundColor,
    alignItems: "center",
  },
  radioInActive: {
    backgroundColor: "transparent",
    borderWidth: 2,
    alignItems: "center",
    borderColor: theme.button.backgroundColor,
  },
  radioBtnDisabled: {
    borderWidth: 2,
    borderColor: theme.border.inputBorderColor,
    backgroundColor: "#EEE",
    alignItems: "center",
  },
  disabledActive: {
    backgroundColor: "#CCc",
  },
  radioActiveText: {
    color: theme.button.color,
    fontSize: normalize(theme.text.subTitleSize),
  },
  disabledActiveText: {
    color: "#777",
  },
  radioInActiveText: {
    color: theme.button.inActiveColor,
    fontSize: normalize(theme.text.subTitleSize),
  },
  acElementWrapper: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  autoCompleteContainer: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  dropdownContainer: {
    width: "95%",
    elevation: 2,
    backgroundColor: "#FFF",
  },
  firstButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderRightWidth: 0,
  },
  lastButton: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderLeftWidth: 0,
  },
  firstButtonBorder: {
    borderRightWidth: 2,
  },
  noData: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: moderateScale(17),
  },
  noDataText: {
    color: theme.text.topTabText,
    fontSize: normalize(theme.text.titleSize),
  },
  dataTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  componentArea: {
    width: getInputWidth(),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(4),
  },
  btnArea: {
    alignItems: "flex-end",
    paddingBottom: moderateScale(5),
  },
  btn: {
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(8),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    marginRight: moderateScale(6),
  },
  numLabel: {
    backgroundColor: theme.brandRed,
    marginLeft: moderateScale(4),
    padding: moderateScale(2),
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  numLabelText: {
    fontSize: normalize(theme.text.tooSmallText),
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
  },
});

export default styles;
