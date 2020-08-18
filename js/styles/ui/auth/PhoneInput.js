// @flow
import React, { Component } from "react";
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

// This component is not using currently.
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

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'US',
      callingCode: '+1',
      phoneNumber: '+1'
    };
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

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, callingCode: '+'+country.callingCode });
    this.phone.focus();
  }

  appendCallingCode = () => {
    // this.setState({
    //   value: this.state.callingCode
    // });

    const { onChange, name } = this.props;
    onChange(name, this.state.callingCode);
  }

  onChange = (value) => {
    const { onChange, name } = this.props;
    onChange(name, value);
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
      ...rest
    } = this.props;
    const valueString = value ? value.toString() : "";
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
    const inputStyles = [styles.phoneInput, small && styles.samllInput, style];
    return (
      <View style={inputGroup}>
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={signupStyles.inputSection}>
              <PhoneInput
                ref={(ref) => {
                  this.phone = ref;
                }}
                onPressFlag={this.onPressFlag}
                style={inputStyles}
                value={valueString}
                textProps={{
                  placeholder: placeholder, 
                  onFocus: this.appendCallingCode,
                  onChangeText: this.onChange
                }}
                textStyle={{fontSize: normalize(theme.form.inputFontSize), fontFamily: 'Ubuntu-Regular'}}
              />

              <CountryPicker
                ref={(ref) => {
                  this.countryPicker = ref;
                }}
                onChange={value => this.selectCountry(value)}
                translation="eng"
                cca2={this.state.cca2}
              >
                <View />
              </CountryPicker>
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
    width: '98%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(125, 125, 125, 0.19)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 20
  }

})