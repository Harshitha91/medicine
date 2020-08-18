// @flow
import React, { Component, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import styles from "styles/ui/form/field";
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import StyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import ViewStylePropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes";
import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

// const StyleSheetPropType = require('react-native/Libraries/StyleSheet/StyleSheetPropType');
// const ViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

class TextField extends Component {
  static defaultProps = {
    editable: true,
    autoFocus: false,
    multiline: false,
    required: false,
    noLabel: false,
    small: false,
    selectTextOnFocus: true
  };

  constructor() {
    super();

    // this.onPressFlag = this.onPressFlag.bind(this);
    // this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      countryCode: 'US',
      callingCode: '+1',
      country: '',
    };
  }

  componentDidMount() {
    let initialCountry = {
      cca2: "US",
      currency: ["USD"],
      callingCode: ["1"],
      region: "Americas",
      subregion: "North America",
      flag: "flag-us",
      name: "United States"
    };
    this.props.onChange('Country', initialCountry);
  }

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

  onPressFlag() {
    this.countryPicker.openModal();
  }

  appendCallingCode = () => {
    const { onChange, name } = this.props;
    onChange(name, this.state.callingCode);
  }

  onChange = (value) => {
    const { onChange, name } = this.props;
    onChange(name, value);
  }

  onCountrySelect = (country) => {
    const { onChange } = this.props;
    this.setState({
      countryCode:country.cca2,
      callingCode:country.callingCode
    });

    onChange('Country', country);
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
      formData,
      ...rest
    } = this.props;
    const valueString = value ? value.toString() : "";
     
    let countryCode = null;
    if (formData && formData.Country) {
      countryCode = formData.Country.cca2.toUpperCase();
    } else {
      countryCode = this.state.countryCode;
    }
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
    const inputStyles = [styles.input, small && styles.samllInput, style];

    return (
      <View style={{ flexDirection: "row"}}>
          
          <View style={inputGroup}>
            <View style={styles.inputElementWrapper}>
            <View style={signupStyles.inputSubWrapper}>
                <View style={signupStyles.input}>
                    <CountryPicker 
                        countryCode={countryCode}
                        // containerButtonStyle={signupStyles.input}
                        withEmoji
                        withFilter
                        withCallingCode
                        withCallingCodeButton
                        onSelect={this.onCountrySelect}
                    />
                </View>
            {/* </View>
            </View>
          </View>
          <View style={signupStyles.inputGroup}>
            <View style={styles.inputElementWrapper}>
            <View style={styles.inputSubWrapper}> */}
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
                      style={signupStyles.phoneNumberInput}
                      value={valueString}
                      autoCapitalize={`none`}
                      onChangeText={this.onTextChange.bind(this)}
                      placeholder={placeholder}
                      placeholderTextColor="#999"
                      onSubmitEditing={onSubmitEditing}
                      ref={refInput}
                      {...rest}
                  />
                </View>
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
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('17%'),
    borderWidth: 2,
    borderColor: 'orange',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  logo: {
    width: 256,
    height: 64,
  },
  rcsButton: {
    height: 60,
    width: 315,
    backgroundColor: '#ff2020',
    shadowColor: 'rgba(255, 107, 107, 0.45)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
  },
  rcsButtonSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerHeader: {
    color: 'black',
  },
  baseText: {
    fontSize: 30,
    marginTop: '1%',
    color: 'black',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 15,
    color: 'black',
  },
  signingLinktText:{
    marginTop:'15%',
    color: 'rgb(255, 32, 32)'
  },
  inputSection:{
    height: 48,
    width: '69%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#C0C0C0',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    flexDirection: 'row',
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: normalize(theme.form.inputFontSize),
    fontFamily: 'Ubuntu-Regular',
    height: 48,
    width: '30%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 1,
  },
  inputGroup: {
    flex: 0,
    width: '70%',
    marginLeft: moderateScale(5),
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: moderateScale(20)
  },
  textInput: {
    flexDirection: 'row',
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(6.3),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: normalize(theme.form.inputFontSize),
    fontFamily: 'Ubuntu-Regular',
    height: 48,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20,
    elevation: 1,
  },
  phoneNumberInput: {
    color: theme.text.inputTextColor,
    paddingTop: moderateScale(6.3),
    paddingBottom: moderateScale(6.5),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    fontSize: normalize(theme.form.inputFontSize),
    fontFamily: 'Ubuntu-Regular',
    height: 48,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 1,
  },
  inputSubWrapper: {
    flex: 1,
    flexDirection: "row",
    width: '100%'
  },
})