// @flow
import React, { Component } from "react";
import { View } from 'react-native';
import theme from "styles/theme";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import Text from "../Text";
import { moderateScale, normalize, verticalScale } from "util/sizes";

class ButtonGroupButton extends Component {
  static defaultProps = {
    onPress: () => { },
    onLongPress: () => { },
    transparent: false,
    iconBtn: false,
    loading: false,
    loadingHeight: 20,
    disabled: false,
    style: {},
    customBtn: false
  };

  _handlePress() {
    this.props.onPress();
  }

  render() {
    const { style } = this.props;
    const btnStyle = [
      styles.containerStyle,
      style
    ];
    return (
      <TouchableOpacity
        style={btnStyle}
        activeOpacity={0.2}
        onPress={() => this._handlePress()}
      >
        <Text type='bold' style={styles.btnTextDefault}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

export default ButtonGroupButton;


const styles = StyleSheet.create({
  containerStyle: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(100),
    height: verticalScale(24),
    backgroundColor: theme.button.backgroundColor,
    padding: moderateScale(theme.button.padding),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    borderRadius: 50
  },
  btnTextDefault: Platform.OS === 'android' ? {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.button.color,
  } : {
    fontSize: normalize(theme.text.buttonTextSize),
    color: theme.button.color,
    paddingBottom: moderateScale(15)
  },
});