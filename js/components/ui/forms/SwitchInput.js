// @flow
import React, { Component } from "react";
import { View, Text, Switch, Platform } from "react-native";

import styles from "styles/ui/form/field";

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";

import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";
import { isUndefined } from "util/core";
import Style from "styles";
const stylePropType = StyleSheetPropType(ViewStylePropTypes);

const theme = Style.get();

class SwitchInput extends Component {
  input;

  static defaultProps = {
    required: false,
    noLabel: false,
    small: false
  };

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  onValueChange = (value) => {
    const { onChange, name } = this.props;
    onChange(name, value);
  };

  render() {
    //eslint-disable-next-line
    const {
      customStyle,
      value,
      defaultValue,
      noLabel,
      label,
      required,
      small,
      containerStyle,
      name,
      onChange,
      style,
      noBottomMargin,
      error,
      ...rest
    } = this.props;
    const inputGroup = (customStyle && customStyle.inputGroup) || [
      styles.inlineInputGroup,
      small && styles.smallInputGroup,
      noBottomMargin && styles.noBottomMargin
    ];
    const inputStyle = [
      styles.switchContainer,
      small && styles.smallContainer,
      containerStyle,
      error && styles.errorContainer
    ];
    const labelStyle = [styles.switchLabel, small && styles.smallLabel];
    return (
      <View style={inputGroup}>
        <View style={styles.switchLabelWrapper}>
          <Text style={labelStyle}>
            {label}
            {required && this.checkRequired()}
          </Text>
          {error && this.renderErrorMsg(error)}
        </View>
        <View style={[styles.inputElementWrapper, styles.switchElementWrapper]}>
          <View style={inputStyle}>
            <Switch
              style={{ transform: Platform.OS === 'android' ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              ref={ref => (this.input = ref)}
              trackColor={{
                true: '#F78181',
                false: theme.button.brandSecondActive
              }}
              thumbColor={'#FF5733'}
              onValueChange={this.onValueChange}
              value={isUndefined(value) ? defaultValue : value }
              {...rest}
            />
          </View>
        </View>
      </View>
    );
  }

  renderErrorMsg(error) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}

export default SwitchInput;
