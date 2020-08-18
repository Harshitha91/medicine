// @flow
import React, { PureComponent } from "react";

import { View, Text, Picker, Platform } from "react-native";

import styles from "styles/ui/form/field";
import { isUndefined } from "util/core";

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

function HackedPicker(props) {
  const key = React.Children.map(props.children, c => {
    return Object.values(c.props).join(",");
  }).join(";");
  return <Picker {...props} key={key} />;
}

export default class PickerField extends PureComponent {
  state = { selected: "" };

  static defaultProps = {
    data: [],
    value: "0",
    labelStyles: {}
  };

  changeHandler = (itemValue: string) => {
    const { onChange, value, name } = this.props;
    if (itemValue !== value) {
      onChange(name, itemValue);
    }
  };
  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  render() {
    const {
      customStyle,
      nolabel,
      label,
      required,
      containerStyle,
      small,
      data,
      mode,
      enabled,
      placeholder,
      value,
      error,
      labelStyles,
      componentSpecificStyles
    } = this.props;

    const inputGroup = (customStyle) || [
      styles.inputGroup,
      small && styles.smallInputGroup
    ];

    const inputStyle = componentSpecificStyles ? componentSpecificStyles : [
      styles.container,
      small && styles.smallContainer,
      containerStyle,
      error && styles.errorContainer,
    ];

    const labelStyle = [styles.label, labelStyles];

    return (
      <View style={inputGroup}>
        {!nolabel && (
          <Text style={labelStyle}>
            {label}
            {required}
          </Text>
        )}
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={inputStyle}>
              <HackedPicker
                selectedValue={value}
                onValueChange={this.changeHandler}
                style={{ height: Platform.OS === 'android' ? 50 : 41 }}
                itemStyle={{ height: 41, fontSize:15 }}
                mode={mode}
                enabled={enabled}
              >
                {this.renderEmptyPickerItem(placeholder)}
                {data
                  .filter(item => isUndefined(item.show) || item.show)
                  .map(item => {
                    return (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    );
                  })}
              </HackedPicker>
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderEmptyPickerItem(placeholder = "Select an Item") {
    return <Picker.Item key={0} label={placeholder} value="0" />;
  }

  renderErrorMsg(error) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}
