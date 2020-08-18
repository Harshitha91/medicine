// @flow
import React, { Component } from "react";

import { View, Text } from "react-native";
import styles from "styles/ui/form/forms";

type Props = {
  title: string,
  disableChildren?: boolean,
  children: any
};

class FormSection extends Component<Props> {
  static defaultProps: Props;
  render() {
    const { title, children, disableChildren } = this.props;

    return (
      <View style={styles.formSectionWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <View
          pointerEvents={disableChildren ? "none" : "auto"}
          style={
            disableChildren ? styles.formSectionDisabled : styles.formSection
          }
        >
          {children}
        </View>
      </View>
    );
  }
}

export default FormSection;
