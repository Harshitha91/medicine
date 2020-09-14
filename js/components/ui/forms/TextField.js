// @flow
import React, { Component } from "react";
import { View, Text, TextInput, Platform } from "react-native";

import styles from "styles/ui/form/field";

import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

// const StyleSheetPropType = require('react-native/Libraries/StyleSheet/StyleSheetPropType');
// const ViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

class TextField extends Component {
  static defaultProps = {
    editable: true,
    autoFocus: false,
    multiline: false,
    required: false,
    noLabel: false,
    small: false,
    selectTextOnFocus: true,
  };

  setKeyboardType(keyboardType) {
    if (!keyboardType) {
      return "default";
    } else {
      return keyboardType;
    }
  }

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  onTextChange(text) {
    const { onChange, name } = this.props;
    onChange(name, text);
  }
  render() {
    //eslint-disable-next-line
    const {
      customStyle,
      numberOfLines,
      multiline,
      value,
      noLabel,
      label,
      autoFocus,
      blurOnSubmit,
      required,
      small,
      containerStyle,
      name,
      onChange,
      onFocus,
      onSubmitEditing,
      placeholder,
      style,
      selectTextOnFocus,
      noBottomMargin,
      editable,
      error,
      refInput,
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
      Platform.OS === "android" && !editable && styles.editableFalseStyle,
      containerStyle,
      error && styles.errorContainer,
    ];
    const labelStyle = [styles.label, small && styles.smallLabel];
    const inputStyles = [styles.input, small && styles.samllInput, style];
    return (
      <View style={inputGroup}>
        {!noLabel && (
          <Text style={labelStyle}>
            {label}
            {required}
            {/* {required && this.checkRequired()} */}
          </Text>
        )}
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={inputStyle}>
              <TextInput
                underlineColorAndroid="transparent"
                blurOnSubmit={blurOnSubmit || true}
                selectTextOnFocus={selectTextOnFocus}
                autoFocus={autoFocus}
                editable={editable}
                autoCorrect={false}
                multiline={multiline}
                numberOfLines={numberOfLines}
                style={inputStyles}
                value={valueString}
                autoCapitalize={`none`}
                onChangeText={this.onTextChange.bind(this)}
                onFocus={onFocus}
                placeholder={placeholder}
                placeholderTextColor="rgb(158,158,158)"
                onSubmitEditing={onSubmitEditing}
                ref={refInput}
                {...rest}
              />
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

export default TextField;
