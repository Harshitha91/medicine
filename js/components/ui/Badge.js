// @flow
import React, { Component } from "react";
import { Badge as RNBadge } from 'react-native-elements';
import styles from "styles/ui/badge";

type Props = {
  label: string,
  status: string
};

export default class Badge extends Component<Props> {
  static defaultProps = {
    label: "",
    status: "default"
  };

  render() {
    const { label, size, status } = this.props;
    return (
      <RNBadge
        value={label}
        textStyle={styles[`${status}Text`]}
        badgeStyle={styles[`${status}Badge`]}
        containerStyle={{ position: 'absolute', top: 200, left: 20 }}
        {...this.props}
      />
    )
  }
}
