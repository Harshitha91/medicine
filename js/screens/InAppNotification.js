// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { Navigation } from "react-native-navigation";
import Text from "components/ui/Text";
import styles from "styles/ui/notification";
import * as Animatable from "react-native-animatable";

export default class InAppNotification extends Component {
  static defaultProps = {
    errorMessage: "error",
    autoDismissTimerSec: 5000,
  };

  state = {
    keyFrames: {
      from: { translateY: -100 },
      to: { translateY: 0 },
    },
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        keyFrames: {
          from: { translateY: 0 },
          to: { translateY: -100 },
        },
      });
      setTimeout(() => {
        Navigation.dismissOverlay(this.props.componentId);
      }, this.props.autoDismissTimerSec);
    }, this.props.autoDismissTimerSec);
  }

  render() {
    const { notificationType, notificationMessage } = this.props;
    const errorStyle = selectErrorType(notificationType);
    return (
      <Animatable.View
        useNativeDriver={true}
        animation={this.state.keyFrames}
        style={styles.containerStyle}
      >
        <Text style={errorStyle}>{notificationMessage}</Text>
      </Animatable.View>
    );
  }
}

function selectErrorType(errorType) {
  if (errorType === "warn") {
    return styles.warnText;
  } else if (errorType === "error") {
    return styles.errorText;
  } else if (errorType === "success") {
    return styles.successText;
  }
}
