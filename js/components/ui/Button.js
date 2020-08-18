// @flow
import React, { Component } from "react";
import { View } from 'react-native';
import styles from "styles/ui/button";
import theme from "styles/theme";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import Text from "./Text";

class Button extends Component {
  static defaultProps = {
    onPress: () => { },
    onLongPress: () => { },
    transparent: false,
    iconBtn: false,
    loading: false,
    loadingHeight: 20,
    disabled: false,
    style: {},
    customBtn: false,
    buttonTextStyle: {}
  };

  _handlePress() {
    this.props.onPress();
  }

  renderLoading() {
    return (
      <ActivityIndicator
        animating={this.props.loading}
        style={[{ height: this.props.loadingHeight }]}
        size="small"
        color="#FFF"
      />
    );
  }

  render() {
    const { transparent, loading, disabled, style, iconBtn, customBtn, buttonTextStyle } = this.props;
    const btnStyle = [
      !transparent ? styles.containerStyle : styles.transparent,
      iconBtn && styles.iconBtn,
      style
    ];
    const btnTextStyle = [
      !transparent ? styles.btnTextDefault : styles.btnTextTransparent,
      buttonTextStyle
    ];
    return (
      <TouchableHighlight
        style={btnStyle}
        activeOpacity={0.7}
        underlayColor={
          iconBtn
            ? "transparent"
            : transparent
              ? theme.button.transparentUnderlayColor
              : theme.button.underlayColor
        }
        onPress={() => !loading && !disabled && this._handlePress()}
      >
        {loading ? this.renderLoading() :
          (iconBtn ? <View style={btnTextStyle}>{this.props.children}</View> : (
            customBtn ? <View style={styles.btnLabel}>{this.props.children}</View> :
              <Text type='bold' style={btnTextStyle}>{this.props.children}</Text>))
          }
      </TouchableHighlight>
    );
  }
}

export default Button;
