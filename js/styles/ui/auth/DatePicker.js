// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  DatePickerAndroid,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";
import Icon from "components/ui/Icon";

import moment from "moment";

import styles from "styles/ui/form/field";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Style from "styles";
import { moderateScale } from "util/sizes";
const theme = Style.get();

type Props = {
  value: ?string,
  label?: string,
  required?: boolean,
  name: string,
  isbackDated?: boolean,
  error?: string,
  minDate: number,
  maxDate: number,
  mode?: "calendar" | "spinner" | "default",
  onChange: (string, any) => mixed,
  disabled?: boolean,
};

async function showPicker(
  mode,
  name,
  onChange,
  isbackDated,
  minDate,
  maxDate,
  value
) {
  let date;
  try {
    if (isbackDated) {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: value ? new Date(Number(value) * 1000) : new Date(),
        mode,
        minDate,
        maxDate,
      });
      // $FlowFixMe
      if (action !== DatePickerAndroid.dismissedAction) {
        date = moment(new Date(year, month, day)).format();
        onChange(name, Date.parse(date) / 1000);
      }
    } else {
      const { action, year, month, day } = await DatePickerAndroid.open({
        minDate: new Date(Number(value) * 1000),
        mode,
      });
      // $FlowFixMe
      if (action !== DatePickerAndroid.dismissedAction) {
        date = moment(new Date(year, month, day)).format();
        onChange(name, Date.parse(date) / 1000);
      }
    }
  } catch (e) {
    console.warn("Cannot open date picker", e.message);
  }
}

class DatePicker extends Component<Props> {
  static defaultProps = {
    isbackDated: true,
  };

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  render() {
    const {
      value,
      label,
      required,
      name,
      isbackDated,
      onChange,
      mode,
      error,
      minDate,
      maxDate,
      disabled,
      customStyle,
      numberOfLines,
      multiline,
      noLabel,
      autoFocus,
      blurOnSubmit,
      small,
      containerStyle,
      onSubmitEditing,
      placeholder,
      style,
      selectTextOnFocus,
      noBottomMargin,
      editable,
      inlineImageLeft,
      refInput,
      secureTextEntry,
      ...rest
    } = this.props;
    const valueString = value ? value.toString() : "";
    const inputGroup = (customStyle && customStyle.inputGroup) || [
      styles.inputGroup,
      small && styles.smallInputGroup,
      noBottomMargin && styles.noBottomMargin,
    ];
    const inputStyle = [
      styles.container,
      small && styles.smallContainer,
      !editable && styles.editableFalseStyle,
      containerStyle,
      error && styles.errorContainer,
    ];
    const labelStyle = [styles.label, small && styles.smallLabel];
    const inputStyles = [styles.input, small && styles.samllInput, style];
    return (
      <View style={inputGroup}>
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={signupStyles.inputSection}>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={
                  !disabled
                    ? showPicker.bind(
                        this,
                        mode,
                        name,
                        onChange,
                        isbackDated,
                        minDate,
                        maxDate,
                        value
                      )
                    : () => {}
                }
              >
                <View style={styles.dataTextWrapper}>
                  <Text style={!disabled ? styles.text : styles.disabledText}>
                    {value !== undefined && value !== ""
                      ? moment
                          .unix(
                            // $FlowFixMe
                            value
                          )
                          .format("DD-MM-YYYY")
                      : "Pick a date"}
                  </Text>
                  {value !== undefined && !disabled && value !== "" && (
                    <TouchableOpacity
                      style={styles.dateRemoveBtn}
                      onPress={() => onChange(name, "")}
                    >
                      <Icon
                        name={"times"}
                        size={moderateScale(12)}
                        color={theme.button.dangerBGColor}
                      />
                    </TouchableOpacity>
                  )}
                  {/*<Text style={styles.text}>{ (!isUndefined(value)) ? formatUsDate(formatDateTime(value)) : 'Pick a date'}</Text>*/}
                </View>
              </TouchableOpacity>
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderErrorMsg(error: string) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}

export default DatePicker;

const signupStyles = StyleSheet.create({
  container: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  responsiveBox: {
    width: wp("84.5%"),
    height: hp("17%"),
    borderWidth: 2,
    borderColor: "orange",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  logo: {
    width: 256,
    height: 64,
  },
  rcsButton: {
    height: 60,
    width: 315,
    backgroundColor: "#ff2020",
    shadowColor: "rgba(255, 107, 107, 0.45)",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
  },
  rcsButtonSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  registerHeader: {
    color: "black",
  },
  baseText: {
    fontSize: 30,
    marginTop: "1%",
    color: "black",
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 15,
    color: "black",
  },
  signingLinktText: {
    marginTop: "15%",
    color: "rgb(255, 32, 32)",
  },
  inputSection: {
    height: 48,
    width: "98%",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(125, 125, 125, 0.19)",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
  },
});
