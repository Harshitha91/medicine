// @flow
import React, { Component } from "react";
import { Platform } from "react-native";
import PickerField from "./PickerField";
import ActionSheet from "./ActionSheet";
import RadioButton from "./RadioButton";

class OptionInput extends Component {
  static defaultProps = {
    data: []
  };
  render() {
    const { data, dataSource } = this.props;
    // if (data.length > 0 && data.length <= 2 && dataSource !== "dataBase") {
    //   return <RadioButton {...this.props} />;
    // }

    if (Platform.OS === 'android') {
      return <PickerField {...this.props} />;
    } else {
      return <ActionSheet {...this.props} />;
    }
  }
}

export default OptionInput;
