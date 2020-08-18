// @flow
import React, { PureComponent } from "react";
import PickerModal from 'react-native-picker-modal-view';
import { View, Text, Picker, StyleSheet, TextInput, Platform } from "react-native";
import RNPicker from "rn-modal-picker";
import styles from "styles/ui/form/field";
import { isUndefined } from "util/core";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

export default class MultiSelectDropDown extends PureComponent {

  constructor() {
    super();
  }

  static defaultProps = {
    data: [],
    dropDownHeight: '',
  };

  uniqueKey = null;
  displayKey = null;

  onSelectedItemsChange = (selectedItems) => {
    const { onChange, name } = this.props;
    onChange(name, selectedItems);
  };

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
      items,
      name,
      dropDownHeight,
    } = this.props;

    
    if(name === 'types' ){
      this.uniqueKey = 'complainTypeId';
      this.displayKey = 'name';
    } else if(name === 'createdBy'){
      this.uniqueKey = 'id';
      this.displayKey = 'fullName';
    }

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
            <Text style={Styles.label}>
                {label}
            </Text>
            )}
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
                <SectionedMultiSelect
                    items={items}
                    uniqueKey={this.uniqueKey}
                    displayKey={this.displayKey}
                    subKey="children"
                    selectText="Choose..."
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={data}
                    styles={{
                        separator: {
                            height: 0,
                        },
                        selectToggle: {
                          height: dropDownHeight ? dropDownHeight : 40,
                          paddingHorizontal: 10,
                            paddingVertical: Platform.OS === 'android' ? 12 : 10,
                            borderWidth: 1,
                            borderRadius: moderateScale(5),
                            borderColor: '#000000'
                        }
                    }}
                    itemFontFamily="light"
                />
          </View>
        </View>
      </View>
    );
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
    },
    label: {
      width: "100%",
      textAlign: "left",
      alignSelf: "flex-start",
      paddingTop: moderateScale(6),
      paddingBottom: moderateScale(6),
      paddingRight: moderateScale(12.5),
      fontSize: normalize(18),
      color: theme.text.inputTextColor,
      fontFamily: 'Ubuntu-Medium'
    },
  });