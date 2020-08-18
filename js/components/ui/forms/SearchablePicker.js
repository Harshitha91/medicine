// @flow
import React, { PureComponent } from "react";
import PickerModal from 'react-native-picker-modal-view';
import { View, Text, Picker, StyleSheet, TextInput, Platform } from "react-native";
import RNPicker from "rn-modal-picker";
import styles from "styles/ui/form/field";
import { isUndefined } from "util/core";
import countries from '../../../countries.json';

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

function HackedPicker(props) {
  const key = React.Children.map(props.children, c => {
    return Object.values(c.props).join(",");
  }).join(";");
  return <Picker {...props} key={key} />;
}

export default class SearchablePicker extends PureComponent {
  state = { selected: "" };

  static defaultProps = {
    data: [],
    value: ''
  };

  changeHandler = (itemValue) => {
    const { onChange, value, name } = this.props;
    if (itemValue !== value) {
      onChange(name, itemValue);
    }
  };
  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  _selectedValueAndroid(index, itemValue) {
    // this.setState({ selectedText: name });

    const { onChange, value, name } = this.props;
    if (itemValue !== value) {
      onChange(name, itemValue);
    }
  }

  _selectedValueIOS(itemValue) {
    // this.setState({ selectedText: name });

    const { onChange, value, name } = this.props;
    if (itemValue !== value) {
      onChange(name, itemValue);
    }

    return itemValue;
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
      error
    } = this.props;

    const inputGroup = (customStyle) || [
      styles.inputGroup,
      small && styles.smallInputGroup
    ];

    const inputStyle = [
      styles.container,
      small && styles.smallContainer,
      containerStyle,
      error && styles.errorContainer
    ];

    const labelStyle = [styles.label, small && styles.smallLabel];
    
    let hasDefaultValue = value !== '';
    let convertedValue = { "Name": value };
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
            {Platform.OS === 'android' && hasDefaultValue &&  //This library has some issues. It's not rerender when porps get changed. That's why it's added to two separete blocks.
                <RNPicker
                    dataSource={data}
                    dummyDataSource={data}
                    defaultValue={true}
                    pickerTitle={"Country Picker"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search....."}
                    showPickerTitle={true}
                    searchBarContainerStyle={Styles.searchBarContainerStyle}
                    pickerStyle={Styles.pickerStyle}
                    selectedLabel={value}
                    placeHolderLabel={'Select Country'}
                    selectLabelTextStyle={Styles.selectLabelTextStyle}
                    placeHolderTextStyle={Styles.placeHolderTextStyle}
                    dropDownImageStyle={Styles.dropDownImageStyle}
                    selectedValue={(index, name) => this._selectedValueAndroid(index, name)}
                    />
            }
            {Platform.OS === 'android' && !hasDefaultValue && 
                <RNPicker
                    dataSource={data}
                    dummyDataSource={data}
                    defaultValue={false}
                    pickerTitle={"Country Picker"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search....."}
                    showPickerTitle={true}
                    searchBarContainerStyle={Styles.searchBarContainerStyle}
                    pickerStyle={Styles.pickerStyle}
                    selectedLabel={value}
                    placeHolderLabel={'Select Country'}
                    selectLabelTextStyle={Styles.selectLabelTextStyle}
                    placeHolderTextStyle={Styles.placeHolderTextStyle}
                    dropDownImageStyle={Styles.dropDownImageStyle}
                    selectedValue={(index, name) => this._selectedValueAndroid(index, name)}
                    />
            }
            {Platform.OS === 'ios' && 
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => {
                      return (
                          <TextInput
                            underlineColorAndroid="transparent"
                            editable={true}
                            autoCorrect={false}
                            multiline={false}
                            style={{
                              color: theme.text.inputTextColor,
                              paddingTop: moderateScale(6.3),
                              paddingBottom: moderateScale(6.5),
                              paddingLeft: moderateScale(8),
                              paddingRight: moderateScale(8),
                              fontSize: normalize(theme.form.inputFontSize),
                              fontFamily: 'Ubuntu-Regular',
                            }}
                            value={convertedValue.Name}
                            autoCapitalize={`none`}
                            placeholder={'Country'}
                            placeholderTextColor="rgb(158,158,158)"
                            onFocus={showModal}
                          />
                      );
                    }
                  }
                  onSelected={(name) => this._selectedValueIOS(name)}
                  onClosed={() => {}}
                  onBackButtonPressed={() => {}}
                  items={countries}
                  sortingLanguage={'tr'}
                  showToTopButton={true}
                  selected={convertedValue}
                  showAlphabeticalIndex={true}
                  autoGenerateAlphabeticalIndex={true}
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText={'Search...'}
                  requireSelection={false}
                  autoSort={false}
                />}
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

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
  
    searchBarContainerStyle: {
      marginBottom: 10,
      flexDirection: "row",
      height: 40,
    //   shadowOpacity: 1.0,
    //   shadowRadius: 5,
    //   shadowOffset: {
    //     width: 1,
    //     height: 1
    //   },
    //   backgroundColor: "rgba(255,255,255,1)",
    //   shadowColor: "#d3d3d3",
    //   borderRadius: 10,
    //   elevation: 3,
      marginLeft: 10,
      marginRight: 10,
    },
  
    selectLabelTextStyle: {
      color: "#000",
      textAlign: "left",
      width: "100%",
      padding: 10,
      flexDirection: "row"
    },
    placeHolderTextStyle: {
      color: "#D3D3D3",
      padding: 10,
      textAlign: "left",
      width: "100%",
      flexDirection: "row"
    },
    dropDownImageStyle: {
      marginLeft: 10,
      width: 10,
      height: 10,
      alignSelf: "center"
    },
  
    pickerStyle: {
      marginLeft: 18,
    //   elevation:3,
      paddingRight: 25,
      marginRight: 10,
      marginBottom: 2,
    //   shadowOpacity: 1.0,
    //   shadowOffset: {
    //     width: 1,
    //     height: 1
    //   },
      borderWidth:0,
    //   shadowRadius: 10,
    //   backgroundColor: "rgba(255,255,255,1)",
    //   shadowColor: "#d3d3d3",
    //   borderRadius: 5,
      flexDirection: "row",
    //   backgroundColor: "#000000"
    }
  });