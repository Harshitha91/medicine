// @flow
import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

import styles from "styles/ui/form/field";

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

type Props = {
  customStyle?: stylePropType,
  numberOfLines?: number,
  multiline: boolean,
  value?: string,
  noLabel: boolean,
  label?: string,
  autoFocus: boolean,
  blurOnSubmit?: boolean,
  required: boolean,
  small: boolean,
  containerStyle?: stylePropType,
  name: string,
  onSubmitEditing?: Function,
  placeholder?: string,
  style?: stylePropType,
  selectTextOnFocus: boolean,
  noBottomMargin?: boolean,
  editable: boolean,
  error?: string,
  data: Array<Object>,
  onChangeText: string => void,
  renderItem: Object => Object
};

class AutocompleteInput extends Component<Props> {
  input: any;

  static defaultProps = {
    editable: true,
    autoFocus: false,
    multiline: false,
    required: false,
    noLabel: false,
    small: false,
    selectTextOnFocus: true,
    keyboardType: "default"
  };

  blurInput() {
    this.input.blur();
  }

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  focusInput() {
    this.input.focus();
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
      onSubmitEditing,
      placeholder,
      style,
      selectTextOnFocus,
      noBottomMargin,
      editable,
      error,
      data,
      onChangeText,
      renderItem,
      ...rest
    } = this.props;
    const inputGroup = (customStyle && customStyle.inputGroup) || [
      styles.inputGroup,
      small && styles.smallInputGroup,
      noBottomMargin && styles.noBottomMargin
    ];
    const inputContainerStyle = [
      styles.acInputContainer,
      small && styles.smallContainer,
      !editable && styles.editableFalseStyle,
      containerStyle,
      error && styles.errorContainer
    ];
    const labelStyle = [styles.label, small && styles.smallLabel];
    const inputStyles = [styles.input, small && styles.samllInput, style];
    return (
      <View style={inputGroup}>
        {!noLabel && (
          <Text onPress={() => this.focusInput()} style={labelStyle}>
            {label}
            {required && this.checkRequired()}
          </Text>
        )}
        {/* {autocompleteElementWrapper} */}
        <View style={styles.acElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={styles.autoCompleteContainer}>
              <View style={inputContainerStyle}>
                <TextInput
                  ref={ref => (this.input = ref)}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={blurOnSubmit || true}
                  selectTextOnFocus={selectTextOnFocus}
                  autoFocus={autoFocus}
                  editable={editable}
                  autoCorrect={false}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  style={inputStyles}
                  value={value}
                  autoCapitalize={`none`}
                  onChangeText={onChangeText}
                  placeholder={placeholder}
                  placeholderTextColor="#999"
                  onSubmitEditing={onSubmitEditing}
                  {...rest}
                />
              </View>
              <View style={styles.dropdownContainer}>
                {this.renderDropdownItmes()}
              </View>
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderDropdownItmes = () => {
    const { data, renderItem } = this.props;
    return data.map(renderItem);
  };

  renderErrorMsg(error: string) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }
}

export default AutocompleteInput;
