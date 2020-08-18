// @flow
import React, { Component } from "react";

import { StyleSheet } from "react-native";
import Style from "styles";

import ActionButton from "react-native-action-button";

const theme = Style.get();

const styles = StyleSheet.create({
  button: {
    flex: 1,
    zIndex: 999
  }
});

class Fab extends Component {
  static defaultProps = {
    onPress: () => {}
  };

  _handlePress = () => {
    this.props.onPress();
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
          shadowOffset: { width: 100, height: 100 }
        }}
        hideShadow={false}
        fixNativeFeedbackRadius={true}
        onPress={this._handlePress}
      />
    );
  }
}

export default Fab;
