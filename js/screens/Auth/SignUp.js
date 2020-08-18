import React from "react";
import { View, CheckBox, Linking, Alert, Switch, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Texts from "components/ui/Text";
import Buttons from "components/ui/Button";
import InputField from "styles/ui/auth/InputField";
import Form from "components/ui/forms/Form";
import { validate } from "util/validator";
import { onFieldChange, setState, saveUser, resetForms } from "actions";
import signUpModel from "models/signUp.json";
import styles from "styles/ui/auth/signUp";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { Navigation } from "react-native-navigation";
import { normalize, moderateScale, verticalScale } from "util/sizes";
import Style from "styles";
const theme = Style.get();

const Button = withPreventDoubleClick(Buttons);
const Text = withPreventDoubleClick(Texts);

export default class SignUp extends React.Component {
  static defaultProps = {
    btnState: false,
    frmSignUp: {},
    signUpModelError: {},
    isKeyboardShow: false,
  };

  state = {
    checkBoxChecked: false,
  };
  componentWillUnmount() {
    this.props.resetForms();
    this.props.setState({
      signUpModelError: {},
    });
  }

  constructor(props) {
    super(props);
  }

  checkBoxChangedAction = (e) => {
    this.setState({
      checkBoxChecked: !this.state.checkBoxChecked,
    });
  };

  render() {
    const { frmSignUp, signUpModelError, btnState } = this.props;
    const signUpFields = signUpModel.fields;
    signUpFields.RoleName = "Admin";
    const formData = {
      name: signUpModel.name,
      data: frmSignUp,
    };
    return (
      <View style={styles.loginContainer}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={styles.loginFormWrapper}
        >
          {/* <View style={styles.labelArea}>
            <Text style={styles.titleText}>
              Make your life easier by {"\n"}connecting with RCS
            </Text>
          </View> */}

          {/* <View>
            <ActivityIndicator
              animating={btnState}
              style={btnState && { height: 80 }}
              size="large"
              color="#ff2020"
            />
          </View> */}

          <View style={styles.inputContainer}>
            <Form form={formData}>
              <InputField
                style={styles.inputField}
                schema={signUpFields.Email}
                inlineImagePadding={30}
                inlineImageLeft="mail"
                placeholder={"Email Address"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
              />
              <InputField
                style={styles.inputField}
                schema={signUpFields.Fullname}
                inlineImagePadding={30}
                inlineImageLeft="user"
                placeholder={"Full Name"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
              />
              <InputField
                style={styles.inputField}
                schema={signUpFields.Username}
                inlineImagePadding={30}
                inlineImageLeft="user"
                placeholder={"Username"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
              />
              <InputField
                style={styles.inputField}
                schema={signUpFields.PhoneNumber}
                placeholder={"Mobile Number"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
                inlineImagePadding={30}
                inlineImageLeft="phone"
              />
              <InputField
                style={styles.inputField}
                schema={signUpFields.Password}
                inlineImagePadding={30}
                inlineImageLeft="lock"
                placeholder={"Password"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
              />
              <InputField
                style={styles.inputField}
                schema={signUpFields.ConfirmPassword}
                inlineImagePadding={30}
                inlineImageLeft="lock"
                placeholder={"Confirm Password"}
                onChange={this.handleFieldChange}
                error={signUpModelError}
              />
            </Form>
          </View>
          {/* <View
            style={{
              marginTop: verticalScale(5),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: moderateScale(5),
            }}
          >
            {Platform.OS === "android" && (
              <CheckBox
                value={this.state.checkBoxChecked}
                onValueChange={(e) => this.checkBoxChangedAction(e)}
                tintColors={"#cccccc"}
              />
            )}
            {Platform.OS === "ios" && (
              <Switch
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                ios_backgroundColor={theme.button.transparentUnderlayColor}
                value={this.state.checkBoxChecked}
                onValueChange={(e) => this.checkBoxChangedAction(e)}
              />
            )}
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              I agree to the RCS{" "}
              <Text onPress={this.conditions} style={styles.linkText}>
                Privacy Policy
              </Text>
            </Text>
          </View> */}
          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              onPress={this.signUp}
              loading={btnState}
            >
              {"Sign Up"}
            </Button>
          </View>
          <View style={styles.signUpArea}>
            <Text style={styles.linkText} onPress={this.signIn}>
              Already a user? Sign In
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  conditions = () => {
    Linking.openURL("https://rcsapp.net/privacy-policy.html");
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: "Condition",
    //     options: {
    //       topBar: {
    //         visible: true,
    //         height: 60,
    //         topMargin: 15,
    //         borderHeight: 0,
    //         elevation: 0,
    //         title: {
    //           text: 'Privacy Policy',
    //           alignment: 'center',
    //           fontSize: 25,
    //           fontFamily: 'Ubuntu-Bold'
    //         },
    //         background: {
    //           color: '#FFFFFF'
    //         }
    //       }
    //     },
    //   }
    // });
  };

  signIn = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SignIn",
        passProps: { root: "signup" },
        options: {
          layout: {
            backgroundColor: "white",
          },
          topBar: {
            visible: false,
            height: 0,
          },
          bottomTab: {
            fontSize: 12,
            text: "Sign In",
            icon: require("images/signin.png"),
          },
        },
      },
    });
  };

  signUp = () => {
    if (this.state.checkBoxChecked) {
      this.saveUserHandler();
    } else {
      Alert.alert(
        "Privacy Policy",
        "Please agree to RCS Privacy Policy to proceed",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: true }
      );
    }
  };

  handleFieldChange = (name, value) => {
    const { onFieldChange } = this.props;
    onFieldChange({
      form: signUpModel.name,
      name,
      value,
    });
  };

  saveUserHandler = () => {
    const { frmSignUp, setState, saveUser, componentId } = this.props;
    const validateStatus = validate(signUpModel, { ...frmSignUp });
    setState({
      signUpModelError: validateStatus,
    });
    if (frmSignUp.Password !== frmSignUp.ConfirmPassword) {
      return;
    }
    if (isEmpty(validateStatus)) {
      setState({ btnState: true });
      let phoneNumber = frmSignUp.PhoneNumber.toString();
      if (phoneNumber.charAt(0) == "0") {
        phoneNumber = phoneNumber.substring(1);
      }

      let formattedNumber = `+${frmSignUp.Country.callingCode}${phoneNumber}`;
      const { Country: __, ...frmSignUpWithoutCountry } = frmSignUp;
      saveUser(
        { ...frmSignUpWithoutCountry, PhoneNumber: formattedNumber },
        componentId
      );
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    frmSignUp: state.form.signUp,
    signUpModelError: state.app.signUpModelError,
    isKeyboardShow: state.app.isKeyboardShow,
  };
};

export const SignUpContainer = connect(mapStateToProps, {
  onFieldChange,
  resetForms,
  saveUser,
  setState,
})(SignUp);
