// @flow
import React, { Component } from "react";
import { View } from "react-native";
import SwitchInput from "components/ui/forms/SwitchInput";
import { isUndefined } from "util/core";
import { includes } from "lodash";
type Props = {
  data: any,
  onChange: (name: string, value: any) => void,
  name: string,
  form: Object,
  value: any
};
const getLocationString = data => {
  return (
    data.areaName_en +
    " " +
    data.areaName_si +
    " " +
    data.areaName_tl +
    " " +
    "(" +
    data.locationCode +
    ")"
  );
};
type State = {
  locationCodes: string[]
};

export default class CheckBoxList extends Component<Props, State> {
  state = {
    locationCodes: []
  };
  render() {
    const { data, name, value, ...rest } = this.props;
    return data.map(item => (
      <SwitchInput
        key={item.id}
        name={item.locationCode}
        onChange={this.onValueChange}
        label={getLocationString(item)}
        value={this.getValue(item.locationCode)}
      />
    ));
  }
  getValue = (locationCode: string) => {
    const { value } = this.props;
    if (!isUndefined(value)) {
      return includes(value, locationCode);
    }
  };
  onValueChange = (name: string, value: boolean) => {
    const { locationCodes } = this.state;
    const { onChange } = this.props;
    let codes = [];
    if (value) {
      codes = [...locationCodes, name];
    } else {
      codes = locationCodes.filter(item => item !== name);
    }
    this.setState({
      locationCodes: codes
    });
    onChange(this.props.name, codes);
  };
}
