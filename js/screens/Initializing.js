import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import {
  setState,
  resetForms,
  handleUserSession,
  handleGetStated,
  getProperties,
  getNotifications,
  updateUserDeviceId,
  getHostEnvironment,
  generateUniqueId,
} from "actions";
import { Navigation } from "react-native-navigation";
import {
  SESSION,
  FIRST,
  HAS_PREVIOUSLY_SETUP,
  UNIQUE_SIGNALR_DEVICE_ID,
  HOSTED_ENVIRONMENT,
} from "constant";

//style
import styles from "../styles/ui/initializing/initializing";
import Buttons from "components/ui/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Swiper from "react-native-swiper";

import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { moderateScale } from "../util/sizes";
const Button = withPreventDoubleClick(Buttons);

export default class Initializing extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    hasPreviouslySetup: true,
    notificationData: {},
  };

  static defaultProps = {
    isShowLogin: false,
  };

  async componentDidMount() {
    try {
      this.props.handleUserSession(
        this.state.notificationData,
        this.props.componentId
      );
    } catch (e) {
      console.log("Error " + e);
    }
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={[styles.firstContainer]}>
        <ActivityIndicator size="large" color="#032DFF" />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isShowLogin: state.app.isShowLogin,
    error: state.app.error,
  };
};
export const InitializingContainer = connect(mapStateToProps, {
  setState,
  resetForms,
  handleUserSession,
  handleGetStated,
  getProperties,
  getNotifications,
  updateUserDeviceId,
  getHostEnvironment,
  generateUniqueId,
})(Initializing);
