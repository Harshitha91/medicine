// @flow
import React, { Component } from "react";
import { View, Text, TimePickerAndroid, TouchableOpacity } from "react-native";

import styles from "styles/ui/form/field";

type Props = {
  value: ?string,
  label?: string,
  required?: boolean,
  name: string,
  error?: string,
  mode: "clock" | "spinner" | "default",
  onChange: (any, any) => mixed,
  disabled?: boolean
};

function formatTime(hour: number, minute: number) {
  return hour + ":" + (minute < 10 ? "0" + minute : minute);
}

async function showPicker(mode, name, onChange) {
  try {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: 14,
      minute: 0,
      is24Hour: false, // Will display '2 PM'
      mode
    });
    // $FlowFixMe
    if (action !== TimePickerAndroid.dismissedAction) {
      // Selected hour (0-23), minute (0-59)
      onChange(name, formatTime(hour, minute));
    }
  } catch (e) {
    console.warn("Cannot open time picker", e.message);
  }
}

class TimePicker extends Component<Props> {
  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  render() {
    //eslint-disable-next-line
    const {
      value,
      label,
      required,
      mode,
      name,
      error,
      disabled,
      onChange
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
                    ? showPicker.bind(this, mode, name, onChange)
                    : () => {}
                }
              >
                <View>
                  <Text style={!disabled ? styles.text : styles.disabledText}>
                    {value || "Pick a time"}
                  </Text>
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

export default TimePicker;
