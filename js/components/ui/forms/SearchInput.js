// @flow
import React, { Component } from "react";
import { View, TextInput } from "react-native";
import debounce from "lodash/debounce";

import styles from "styles/ui/form/search";
import Icon from "components/ui/Icon";

import Style from "styles";

const theme = Style.get();

type Props = {
  placeholder: string,
  style?: any,
  onChangeText: string => void
};

export default class SearchInput extends Component<Props> {
  static defaultProps = {
    onChangeText: () => {},
    style: {}
  };

  constructor() {
    super();

    this.handleInputChange = debounce(this.handleInputChange, 300);
  }
  render() {
    const { placeholder, style } = this.props;
    return (
      <View style={[styles.inputGroup, style]}>
        <TextInput
          allowFontScaling={true}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={text => this.handleInputChange(text)}
        />
        <Icon name="search" size={26} color={theme.text.subTextColor} />
      </View>
    );
  }

  handleInputChange = (text: string) => {
    this.props.onChangeText(text.trim());
  };
}
