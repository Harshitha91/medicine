// @flow
import React, { Component } from "react";

import { StyleSheet } from "react-native";
import Style from "styles";

import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

const theme = Style.get();

const styles = StyleSheet.create({
  button: {
    flex: 1,
    zIndex: 999,
  },
});

class CallButton extends Component {
  static defaultProps = {
    onPress: () => {},
  };

  _handlePress = () => {
    this.props.onPress();
  };

  renderIcon = () => {
    return <Icon name="phone" type="material" color="#ffffff" />;
  };

  render() {
    return (
      <ActionButton
        style={styles.button}
        buttonColor={theme.button.backgroundColor}
        shadowStyle={{
          shadowOpacity: 1,
          shadowRadius: 100,
          shadowColor: "red",
          shadowOffset: { width: 100, height: 100 },
        }}
        renderIcon={this.renderIcon}
        hideShadow={false}
        fixNativeFeedbackRadius={true}
        onPress={this._handlePress}
      />
    );
  }
}

export default CallButton;
