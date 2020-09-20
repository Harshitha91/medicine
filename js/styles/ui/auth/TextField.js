// @flow
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import styles from "styles/ui/form/field";

import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

// const StyleSheetPropType = require('react-native/Libraries/StyleSheet/StyleSheetPropType');
// const ViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      onSubmitEditing,
      placeholder,
      style,
      selectTextOnFocus,
      noBottomMargin,
      editable,
      inlineImageLeft,
      error,
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
                placeholder={placeholder}
                inlineImageLeft={inlineImageLeft}
                placeholderTextColor="#999"
                onSubmitEditing={onSubmitEditing}
                ref={refInput}
                secureTextEntry={secureTextEntry}
                textContentType="password"
                {...rest}
              />
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderErrorMsg(error) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}

export default TextField;

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
