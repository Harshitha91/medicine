// @flow
import React, { PureComponent } from "react";
import PickerModal from 'react-native-picker-modal-view';
import { View, Text, Picker, StyleSheet, TextInput, Platform } from "react-native";
import ButtonGroupButton from "./ButtonGroupButton";
import styles from "styles/ui/form/field";
import withPreventDoubleClick from 'screens/components/PreventDoubleClick';
import { isUndefined } from "util/core";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// import StyleSheetPropType from "react-native/Libraries/StyleSheet/StyleSheetPropType";
// import ViewStylePropTypes from "react-native/Libraries/Components/View/ViewStylePropTypes";
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const BTN = withPreventDoubleClick(ButtonGroupButton);

const theme = Style.get();

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

const items = [
    {
      name: "Apple",
      id: 1,
    },
    {
      name: "Strawberry",
      id: 2,
    },
    {
      name: "Pineapple",
      id: 3,
    },
    {
      name: "Banana",
      id: 4,
    },
    {
      name: "Watermelon",
      id: 5,
    },
  ];

export default class ButtonGroup extends PureComponent {

  constructor() {
    super();
  }

  static defaultProps = {
    data: [],
    buttonContainer: {},
    fieldName: {}
  };

  onPress = (value, isAlreadySelected) => {
    const { onChange, name, data } = this.props;
    if(isAlreadySelected) {
      onChange(name, [...data.filter(item => item !== value.name)]);
    } else {
      onChange(name, [value.name, ...data]);
    }
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
      buttons,
      buttonContainer,
      fieldName
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
            <Text style={Styles.label}>
                {label}
            </Text>
            )}
        <View style={styles.inputElementWrapper}>
          <View style={fieldName == 'status' ? buttonContainer : [styles.inputSubWrapper, {flexDirection: 'row'}]}>

                {buttons.map((item) => {
                    let isSelected = data.includes(item.name);
                    return(
                        <ButtonGroupButton
                            style={[Styles.btn, {backgroundColor: isSelected ? '#ff4848' : '#EDEDED'}]}
                            onPress={() => this.onPress(item, isSelected)}
                            >
                            <Text
                                type='medium'
                                style={fieldName == 'status' ? { color: '#000', fontSize: 14 } : { color: '#000', fontSize: 16 }}
                                >
                                {item.label}
                            </Text>
                        </ButtonGroupButton>
                    );
                })}
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
    btn: Platform.OS === 'android' ? {
        marginTop: moderateScale(5),
        marginRight: moderateScale(3),
        marginLeft: moderateScale(3),
        borderColor: '#000000',
        borderColor: '#EDEDED',
      } : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(3),
        marginLeft: moderateScale(3),
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#EDEDED'
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