import React from "react";
import { View, ActivityIndicator, Image, Alert } from "react-native";
import PasswordTextInput from "styles/ui/auth/PasswordTextInput";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { onFieldChange, setState, authUser } from "actions";
import AsyncStorage from "@react-native-community/async-storage";
import isEmpty from "lodash/isEmpty";
import styles from "styles/ui/auth/signIn";
import Texts from "components/ui/Text";
import TextField from "styles/ui/auth/TextField";
import { Navigation } from "react-native-navigation";
import Buttons from "components/ui/Button";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { checkConnectivity } from "util/NetworkConnection";
import firebase from "react-native-firebase";
import { goHome } from "../navigation";
const Button = withPreventDoubleClick(Buttons);
const Text = withPreventDoubleClick(Texts);

export default class SignIn extends React.Component {
  static defaultProps = {
    btnState: false,
    frmLogin: {},
  };

  state = {
    fcmToken: "",
  };

  async componentDidMount() {
    await AsyncStorage.removeItem("fcmToken");
    this.checkPermission();
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
        this.setState({
          fcmToken: fcmToken,
        });
      }
    }
    let currentDeviceToken = await AsyncStorage.getItem("fcmToken");

    this.setState({
      fcmToken: currentDeviceToken,
    });
  }

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

  signIn = () => {
    checkConnectivity();
    const { frmLogin, btnState, setState, authUser } = this.props;
    if (btnState) {
      return;
    }
    if (isEmpty(frmLogin)) {
      this.onSignInFail();
      return;
    }
    setState({ btnState: true });
    authUser(
      frmLogin,
      {
        deviceToken: this.state.fcmToken,
      },
      this.props.componentId
    );
  };

  forgotPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ForgotPassword",
        options: {
          topBar: {
            visible: true,
            height: 60,
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              text: "Forgot Password ?",
              alignment: "center",
              fontSize: 25,
              fontFamily: "Ubuntu-Bold",
            },
            background: {
              color: "#FFFFFF",
            },
          },
        },
      },
    });
  };

  signUp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SignUp",
        options: {
          topBar: {
            visible: true,
            height: 60,
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              text: "Sign Up",
              alignment: "center",
              fontSize: 25,
              fontFamily: "Ubuntu-Bold",
            },
            background: {
              color: "#FFFFFF",
            },
          },
        },
      },
    });
  };

  onSignInFail() {
    return Alert.alert(
      "Alert",
      "The user name or password is incorrect.",
      [
        {
          text: "OK",
          onPress: () => {
            return;
          },
        },
      ],
      { cancelable: true }
    );
  }

  render() {
    const { frmLogin, btnState } = this.props;
    return (
      <View style={styles.loginContainer}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={styles.loginFormWrapper}
        >
          {/* <View style={styles.logoArea}>
            <Image style={styles.logo} source={require("images/logo.png")} />
          </View> */}
          <View style={styles.labelArea}>
            <Text type="bold" style={styles.baseText}>
              Welcome!
            </Text>
            <Text style={styles.titleText}>Login to continue.</Text>
          </View>

          <View style={styles.inputContainer}>
            <View>
              {/* <ActivityIndicator
                animating={btnState}
                style={btnState && { height: 80 }}
                size="large"
                color="#ff2020"
              /> */}
              <TextField
                style={styles.inputField}
                placeholder={"Email"}
                name="username"
                onChange={this.handleFieldChange}
                value={frmLogin.username}
                returnKeyType={`next`}
                inlineImagePadding={20}
                inlineImageLeft="user"
                onSubmitEditing={() => this.handleSubmitEditing()}
              />
            </View>

            <View>
              <PasswordTextInput
                style={styles.inputField}
                placeholder={"Password"}
                onChange={this.handleFieldChange}
                name={"password"}
                returnKeyLabel={`done`}
                value={frmLogin.password}
                inlineImagePadding={20}
                inlineImageLeft="lock"
                onSubmitEditing={this.signIn}
                refInput={(input) => {
                  this.passwordInput = input;
                }}
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              onPress={this.signIn}
              loading={btnState}
            >
              {"Sign In"}
            </Button>
          </View>

          <View style={styles.signUpArea}>
            <Text style={styles.linkText} onPress={this.signUp}>
              New user? Sign Up
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  handleFieldChange = (name, value) => {
    const { onFieldChange } = this.props;
    onFieldChange({
      form: "frmLogin",
      name,
      value,
    });
  };

  handleSubmitEditing = () => {
    this.passwordInput.focus();
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    frmLogin: state.form.frmLogin,
    btnState: state.app.btnState,
  };
};

export const SignInContainer = connect(mapStateToProps, {
  onFieldChange,
  authUser,
  setState,
})(SignIn);
