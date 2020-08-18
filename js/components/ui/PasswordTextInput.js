//@flow
import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import TextField from "components/ui/forms/TextField";
import startupStyles from "styles/ui/startup";
type Props = {
  locale: any,
  onChange: any,
  name: string,
  value: string,
  label: string,
  placeholder: string,
  error: Object,
  refInput?: any
};

type State = {
  isPasswordHidden: boolean
};
export default class PasswordTextInput extends Component<Props, State> {
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
          secureTextEntry={this.state.isPasswordHidden}
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
                ? require("images/view.png")
                : require("images/hide.png")
            }
            style={startupStyles.btnImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
