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
} from "actions";
import { Navigation } from "react-native-navigation";
import {
  SESSION,
  FIRST,
  HAS_PREVIOUSLY_SETUP,
  UNIQUE_SIGNALR_DEVICE_ID,
  HOSTED_ENVIRONMENT,
} from "constant";
import firebase from "react-native-firebase";
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
    this.checkPermission();
    this.createNotificationListeners();
    try {
      this.props.handleUserSession(
        this.state.notificationData,
        this.props.componentId
      );
    } catch (e) {
      console.log("Error " + e);
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    let currentDeviceToken = await AsyncStorage.getItem("fcmToken");
    this.updateUserDeviceToken(currentDeviceToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  async createNotificationListeners() {
    const {
      getSubscribedUsers,
      getComplainers,
      getComplainComments,
      getProperties,
      getNotifications,
    } = this.props;

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        // firebase.notifications().displayNotification(notification);
        const { title, data } = notification;
        // this.showAlert(title, body);
        this.setState({ notificationData: data });
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, data } = notificationOpen.notification;
        // this.showAlert(title, body);
        this.setState({ notificationData: data });
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, data } = notificationOpen.notification;
      // this.showAlert(title, body);
      this.setState({ notificationData: data });
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {});
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
})(Initializing);
