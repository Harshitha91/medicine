// @flow
import React, { Component } from "react";
import { View, Text, DatePickerAndroid, TouchableOpacity } from "react-native";

import Icon from "components/ui/Icon";

import moment from "moment";

import styles from "styles/ui/form/field";

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
  disabled?: boolean
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
        maxDate
      });
      // $FlowFixMe
      if (action !== DatePickerAndroid.dismissedAction) {
        date = moment(new Date(year, month, day)).format();
        onChange(name, Date.parse(date) / 1000);
      }
    } else {
      const { action, year, month, day } = await DatePickerAndroid.open({
        minDate: new Date(Number(value) * 1000),
        mode
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
    isbackDated: true
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
      disabled
    } = this.props;
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label}
          {required && this.checkRequired()}
        </Text>
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={[styles.container, error && styles.errorContainer]}>
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
                  {value !== undefined &&
                    !disabled &&
                    value !== "" && (
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
