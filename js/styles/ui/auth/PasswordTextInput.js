//@flow
import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import TextField from "./TextField";
import startupStyles from "styles/ui/startup";

export default class PasswordTextInput extends Component {
  static defaultProps = {
    error: {}
  };
  state = {
    isPasswordHidden: true
  };
  render() {
    const {
      locale,
      onChange,
      name,
      value,
      label,
      placeholder,
      error,
      refInput,
      ...rest
    } = this.props;
    return (
      <View>
        <TextField
          label={label}
          placeholder={placeholder}
          name={name}
          secureTextEntry={this.state.isPasswordHidden }
          onChange={onChange}
          value={value}
          error={error[name]}
          refInput={refInput}
          {...rest}
        />
        <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          style={startupStyles.visibilityBtn}
          onPress={() =>
            this.setState({
              isPasswordHidden: !this.state.isPasswordHidden
            })
          }
        >
          <Image
            source={
              this.state.isPasswordHidden
                ? require("images/hide.png")
                : require("images/view.png")
            }
            style={startupStyles.btnImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
