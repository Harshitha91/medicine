// @flow
import React, { Component } from "react";
import { View } from "react-native";

import Text from "components/ui/Text";
import styles from "styles/ui/label";

type Props = {
  style?: Object,
  text: string,
  type?: string,
  labelStyle?: Object
};
export default class Label extends Component<Props> {
  render() {
    const { text, labelStyle, style } = this.props;
    return (
      <View style={[styles.containerStyle, labelStyle, style]}>
        <View style={styles.textContainerStyle}>
          <Text style={styles.labelTextStyle}>{text}</Text>
        </View>
      </View>
    );
  }
}
