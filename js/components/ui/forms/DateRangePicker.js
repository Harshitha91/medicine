// @flow
import React, { Component } from "react";
import { View, Text, DatePickerAndroid, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "components/ui/Icon";

import moment from "moment";

import styles from "styles/ui/form/field";

import Style from "styles";
import { moderateScale, normalize } from "util/sizes";
const theme = Style.get();

async function showPicker(
  mode,
  name,
  onChange,
  isbackDated,
  minDate,
  maxDate,
  value,
  data,
  field
) {
  let date;
  try {
    // if (isbackDated) {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: value ? new Date(Number(value) * 1000) : new Date(),
        mode,
        minDate,
        maxDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        date = moment(new Date(year, month, day)).format();
        data[field] = Date.parse(date) / 1000;
        onChange(name, data);
      }
    // } else {
    //   const { action, year, month, day } = await DatePickerAndroid.open({
    //     minDate: new Date(Number(value) * 1000),
    //     mode
    //   });
    //   if (action !== DatePickerAndroid.dismissedAction) {
    //     date = moment(new Date(year, month, day)).format();
    //     data[field] = Date.parse(date) / 1000;
    //     onChange(name, data);
    //   }
    // }
  } catch (e) {
    console.warn("Cannot open date picker", e.message);
  }
}

class DateRangePicker extends Component {
  static defaultProps = {
    isbackDated: true,
    data: {
      from: '',
      to: ''
    }
  };

  state = {
    showIosDateFromPicker: false,
    showIosDateToPicker: false
  };

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  onConfirm(date, field) {
    const { onChange, name, data } = this.props;
    // date = moment(new Date(year, month, day)).format();
    data[field] = Date.parse(date) / 1000;
    onChange(name, data);

    if (field === 'from') {
      this.setState({showIosDateFromPicker: false});
    } else if (field === 'to') {
      this.setState({showIosDateToPicker: false});
    }
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
      disabled,
      data,
      labelStyles,
      inputStyles
    } = this.props;

    let minDate = (data.from && data.from !== '') ? new Date(Number(data.from) * 1000) : undefined;
    let maxDate = (data.to && data.to !== '') ? new Date(Number(data.to) * 1000) : undefined;
    
    return (
      <View style={[styles.inputGroup, { marginTop: 25 }]}>
        <Text style={[Styles.label, labelStyles]}>
          {label}
          {required && this.checkRequired()}
        </Text>
        <View style={styles.inputElementWrapper}>
          <View style={[styles.inputSubWrapper, { flexDirection: 'row' }]}>
            <View style={[styles.container, { marginRight: 5 }, inputStyles]}>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={
                   (Platform.OS === 'android') ? showPicker.bind(
                        this,
                        mode,
                        name,
                        onChange,
                        isbackDated,
                        minDate,
                        maxDate,
                        data.from,
                        data,
                        'from'
                      ) : () => this.setState({showIosDateFromPicker: true})
                }
              >
                <View style={styles.dataTextWrapper}>
                  <Text style={!disabled ? styles.text : styles.disabledText}>
                    {data.from !== undefined && data.from !== ""
                      ? moment
                          .unix(
                            data.from
                          )
                          .format("DD-MM-YYYY")
                      : "Pick a date"}
                  </Text>
                  {data.from !== undefined &&
                    !disabled &&
                    data.from !== "" && (
                      <TouchableOpacity
                        style={styles.dateRemoveBtn}
                        onPress={() => onChange(name, { from: '', to: data.to })}
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
            <Text  style={{ marginTop: 18, marginLeft: 20, marginRight: 20 }}>To</Text>
            <View style={[styles.container, { marginLeft: 5, marginRight: 5 }, inputStyles]}>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={
                      (Platform.OS === 'android') ? showPicker.bind(
                        this,
                        mode,
                        name,
                        onChange,
                        isbackDated,
                        minDate,
                        maxDate,
                        data.to,
                        data,
                        'to'
                      ) : () => this.setState({showIosDateToPicker: true})
                }
              >
                <View style={styles.dataTextWrapper}>
                  <Text style={!disabled ? styles.text : styles.disabledText}>
                    {data.to !== undefined && data.to !== ""
                      ? moment
                          .unix(
                            data.to
                          )
                          .format("DD-MM-YYYY")
                      : "Pick a date"}
                  </Text>
                  {data.to !== undefined &&
                    !disabled &&
                    data.to !== "" && (
                      <TouchableOpacity
                        style={styles.dateRemoveBtn}
                        onPress={() => onChange(name, { from: data.from, to: '' })}
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
          </View>
        </View>
        {Platform.OS === 'ios' && <DateTimePickerModal
          isVisible={this.state.showIosDateFromPicker}
          mode="date"
          onConfirm={(date)=> this.onConfirm(date, 'from')}
          onCancel={() => this.setState({showIosDateFromPicker: false})}
          minimumDate={minDate}
          maximumDate={maxDate}
        />}
        {Platform.OS === 'ios' && <DateTimePickerModal
          isVisible={this.state.showIosDateToPicker}
          mode="date"
          onConfirm={(date)=> this.onConfirm(date, 'to')}
          onCancel={() => this.setState({showIosDateToPicker: false})}
          minimumDate={minDate}
          maximumDate={maxDate}
        />}
      </View>
    );
  }

  renderErrorMsg(error) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}

export default DateRangePicker;

const Styles = StyleSheet.create({
  label: {
    width: "100%",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
    paddingRight: moderateScale(12.5),
    fontSize: normalize(18),
    color: theme.text.inputTextColor,
    fontFamily: 'Ubuntu-Medium'
  },
});