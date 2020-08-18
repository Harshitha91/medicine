// @flow
import React, { Component } from "react";
import { ScrollView } from "react-native";

import styles from "styles/container";

type Props = {
  children: Object,
  getRef: ?Object,
  style: Object
};

class Container extends Component<Props> {
  static defaultProps: Props;
  render() {
    const { children, getRef, style } = this.props;
    return (
      <ScrollView
        ref={getRef}
        style={[styles.container, style]}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
      >
        {children}
      </ScrollView>
    );
  }
}

export default Container;
