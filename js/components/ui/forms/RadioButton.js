// @flow
import React, { Component } from "react";

import styles from "styles/ui/form/field";
import { View, TouchableOpacity } from "react-native";
import Text from "../Text";

import Icon from "../Icon";

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";

import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

import { isUndefined } from "util/core";

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

type Props = {
  customStyle?: stylePropType,
  small?: boolean,
  noBottomMargin?: boolean,
  noLabel?: boolean,
  label?: string,
  required?: boolean,
  editable?: boolean,
  inline?: boolean,
  containerStyle?: stylePropType,
  onChange: (string, string) => mixed,
  name: string,
  value: ?string,
  error?: string,
  data: Array<{
    value: string,
    label: string,
    show?: boolean,
    icon?: string,
    extraLabel?: string
  }>,
  disabled?: boolean
};

export default class RadioButton extends Component<Props> {
  render() {
    const {
      customStyle,
      noLabel,
      label,
      required,
      containerStyle,
      small,
      noBottomMargin,
      error,
      inline
    } = this.props;
    const inputGroup = (customStyle && customStyle.inputGroup) || [
      styles.inputGroup,
      inline && styles.inlineInputGroup,
      small && styles.smallInputGroup,
      noBottomMargin && styles.noBottomMargin
    ];
    const labelStyle = [styles.label, small && styles.smallLabel];
    const inputStyle = [
      styles.noBorderContainer,
      small && styles.smallContainer,
      // !editable && styles.editableFalseStyle,
      styles.rowBtn,
      containerStyle,
      error && styles.errorContainer
    ];
    return (
      <View style={inputGroup}>
        {!noLabel && (
          <Text style={labelStyle}>
            {label}
            {required && this.checkRequired()}
          </Text>
        )}
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={inputStyle}>{this.renderRadioButtons()}</View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderRadioButtons() {
    const { value: selectedValue, onChange, name, data, disabled } = this.props;
    const getRadioBtnStyle = (value: string, index: number) => {
      return [
        styles.radioBtn,
        styles.radioInActive,
        index === 0 && styles.firstButton,
        index === data.length - 1 && styles.lastButton,
        data.length === 2 && index === 0 && styles.firstButtonBorder,
        selectedValue === value && styles.radioActive,
        disabled && styles.radioBtnDisabled,
        disabled && selectedValue === value && styles.disabledActive
      ];
    };
    const getRadioBtnTextStyle = (value: string) => {
      return [
        styles.radioInActiveText,
        selectedValue === value && styles.radioActiveText,
        disabled && styles.disabledText,
        disabled && selectedValue === value && styles.disabledActiveText
      ];
    };

    const getIconColor = (value: string) => {
      if (selectedValue === value) {
        return "#FFF";
      }

      return "#555";
    };

    if (data.length > 3 || data.length < 2)
      return <Text>Button component is only supported for 2 or 3 options</Text>;
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={item.value}
          style={getRadioBtnStyle(item.value, index)}
          onPress={!disabled ? () => onChange(name, item.value) : () => {}}
        >
          {item.icon ? (
            <Icon name={item.icon} size={20} color={getIconColor(item.value)} />
          ) : (
            <View style={styles.rowBtn}>
              <Text style={getRadioBtnTextStyle(item.value)}>{item.label}</Text>
              {!isUndefined(item.extraLabel) &&
                item.extraLabel !== "" && (
                  <View style={styles.numLabel}>
                    <Text style={styles.numLabelText}>{item.extraLabel}</Text>
                  </View>
                )}
            </View>
          )}
        </TouchableOpacity>
      );
    });
  }

  renderErrorMsg(error: string) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }
}
