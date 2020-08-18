// @flow
import React, { PureComponent } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import styles from "styles/ui/form/field";
import modalStyle from "styles/ui/modalStyle";
import TextField from "components/ui/forms/TextField";
import Button from "components/ui/Button";

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
  onChange: Function,
  onSubmitEditing?: Function,
  placeholder?: string,
  style?: stylePropType,
  selectTextOnFocus: boolean,
  noBottomMargin?: boolean,
  editable: boolean,
  error?: string,
  valueText: string,
  data: Object[],
  renderItems: Object => any,
  onChangeText: string => void,
  getSelectedValueText: Object => string
};

type State = {
  isShowItemModal: boolean,
  text: string
};

export default class Autocomplete extends PureComponent<Props, State> {
  input: any;

  state = {
    isShowItemModal: false,
    text: ""
  };

  static defaultProps = {
    editable: true,
    autoFocus: false,
    multiline: false,
    required: false,
    noLabel: false,
    small: false,
    selectTextOnFocus: true
  };

  setKeyboardType(keyboardType: ?string) {
    if (!keyboardType) {
      return "default";
    } else {
      return keyboardType;
    }
  }

  blurInput() {
    this.input.blur();
  }

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  focusInput() {
    this.input.focus();
  }

  onTextChange(text: string) {
    const { onChange, name } = this.props;
    onChange(name, text);
  }

  render() {
    //eslint-disable-next-line
    const {
      customStyle,
      noLabel,
      label,
      required,
      small,
      containerStyle,
      placeholder,
      style,
      noBottomMargin,
      editable,
      valueText,
      getSelectedValueText,
      error,
      value,
      data
    } = this.props;
    const selectedValue: Object = data.filter(item => item.id === value)[0];

    const inputGroup = (customStyle && customStyle.inputGroup) || [
      styles.inputGroup,
      small && styles.smallInputGroup,
      noBottomMargin && styles.noBottomMargin
    ];
    const inputStyle = [
      styles.container,
      small && styles.smallContainer,
      !editable && styles.editableFalseStyle,
      containerStyle,
      error && styles.errorContainer
    ];
    const labelStyle = [styles.label, small && styles.smallLabel];
    const inputStyles = [
      styles.autocompleteInput,
      small && styles.samllInput,
      style
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
            <View style={inputStyle}>
              <TouchableOpacity
                onPress={() => this.visibleItemModal(true)}
                style={inputStyles}
              >
                <Text style={styles.autoInputSelectedText}>
                  {selectedValue
                    ? getSelectedValueText(selectedValue)
                    : placeholder}
                </Text>
              </TouchableOpacity>
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isShowItemModal}
          onRequestClose={() => this.visibleItemModal(false)}
        >
          <View style={modalStyle.overlay}>
            <View style={[modalStyle.body, styles.acModalContainer]}>
              <KeyboardAwareScrollView
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.acFormContainer}
              >
                <View style={styles.acInputContainer}>
                  <TextField
                    autoFocus={true}
                    name="autocomplete"
                    noLabel={true}
                    onChange={this.onChangeText}
                    value={valueText}
                    ref={ref => (this.input = ref)}
                  />
                </View>
                <View style={styles.searchItems}>
                  {data.map(this.handleRenderItems)}
                </View>
              </KeyboardAwareScrollView>
              <View style={styles.btnArea}>
                <Button
                  style={styles.btn}
                  onPress={this.closeItemModal}
                  transparent={true}
                >
                  Close
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  handleRenderItems = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleItemSelect(item)}
        style={styles.acItem}
        key={item.id}
      >
        {this.props.renderItems(item)}
      </TouchableOpacity>
    );
  };

  handleItemSelect = (item: any) => {
    const { name, onChange } = this.props;
    onChange(name, item.id);
    this.visibleItemModal(false);
  };

  onChangeText = (name: string, value: string) => {
    this.props.onChangeText(value);
  };

  renderErrorMsg(error: string) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }

  visibleItemModal = (status: boolean) => {
    this.setState({
      isShowItemModal: status
    });
  };

  closeItemModal = () => {
    this.setState({
      isShowItemModal: false
    });
  };
}
