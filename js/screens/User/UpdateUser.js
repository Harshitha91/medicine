import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import InputField from "styles/ui/auth/InputField";
import Buttons from "components/ui/Button";
import isEmpty from "lodash/isEmpty";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { getUserDetails } from "actions";
import Form from "components/ui/forms/Form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  onFieldChange,
  setState,
  resetForms,
  setFormFields,
  updateUser,
} from "actions";
import updateUserModel from "models/updateUser";
import { validate } from "util/validator";
import CountryCheck from "util/CountryCheck";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from "react-native-image-picker";
import inputStyles from "styles/ui/auth/signUp";
import { moderateScale, normalize } from "util/sizes";
import { CachedImage } from "react-native-cached-image";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { isUndefined } from "../../util/core";

const Button = withPreventDoubleClick(Buttons);

export default class UpdateUser extends Component {
  static get options() {
    return {
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
      },
    };
  }

  static defaultProps = {
    btnState: false,
    frmUpdateUser: {},
    updateUserModelError: {},
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    pickedImage: null,
    imgData: null,
  };

  reset = () => {
    this.setState({
      pickedImage: null,
      imgData: null,
    });
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
      (res) => {
        if (res.didCancel) {
          console.log("Image selection canceled");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: res.uri,
            imgData: res.data,
          });
        }
      }
    );
  };

  resetHandler = () => {
    this.reset();
  };

  componentDidMount() {
    const { userDetails, getUserDetails, setFormFields } = this.props;
    getUserDetails();
    if (userDetails) {
      if (
        userDetails.phoneNumber &&
        userDetails.phoneNumber.charAt(0) === "+"
      ) {
        let countryCode = CountryCheck.getCountryCodeOfNumber(
          userDetails.phoneNumber
        );
        let dialCode = CountryCheck.getDialCode(userDetails.phoneNumber);
        let callingCode = CountryCheck.getNumeric(dialCode);
        setFormFields({
          name: updateUserModel.name,
          value: {
            ...userDetails,
            phoneNumber: userDetails.phoneNumber.replace(dialCode, ""),
            Country: { cca2: countryCode, callingCode: [callingCode] },
          },
        });
      } else {
        setFormFields({
          name: updateUserModel.name,
          value: userDetails,
        });
      }
      this.setState({
        pickedImage: userDetails.imageUrl,
        imgData: userDetails.id + ".jpg",
      });
    }
  }

  componentWillUnmount() {
    this.props.resetForms();
    this.props.setState({
      updateUserModelError: {},
    });
  }

  render() {
    const { frmUpdateUser, updateUserModelError } = this.props;
    const { userDetails, btnState } = this.props;
    let userStatus = userDetails ? userDetails.userStatus : "";
    const updateUserFields = updateUserModel.fields;

    const formData = {
      name: updateUserModel.name,
      data: frmUpdateUser,
    };
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={{
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
          }}
        >
          <View
            style={{
              height: 60,
              marginTop: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.pickedImage && this.state.pickedImage !== null ? (
              <View>
                <CachedImage
                  source={{ uri: this.state.pickedImage }}
                  style={styles.profileImg}
                  onLoadEnd={() => {
                    this.handleFieldChange("imageData", this.state.imgData);
                  }}
                  schema={updateUserFields.imageData}
                  error={updateUserModelError}
                />
                <View style={styles.editIcon}>
                  <TouchableOpacity onPress={this.pickImageHandler}>
                    <Image
                      source={require("images/camera.png")}
                      style={{ width: 17, height: 15 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.profileImgEmpty}>
                <Icon
                  name="add"
                  size={moderateScale(45)}
                  color="#555"
                  onPress={this.pickImageHandler}
                />
              </View>
            )}
          </View>

          <View style={styles.userContainer}>
            <Form form={formData}>
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.userName}
                inlineImagePadding={20}
                inlineImageLeft="user"
                placeholder={"Username"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
                editable={false}
              />
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.fullName}
                inlineImagePadding={20}
                inlineImagePadding={20}
                inlineImageLeft="user"
                placeholder={"Full Name"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
              />
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.email}
                inlineImagePadding={20}
                inlineImagePadding={20}
                inlineImageLeft="mail"
                placeholder={"Email Address"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
              />
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.phoneNumber}
                inlineImagePadding={20}
                inlineImageLeft="user"
                placeholder={"Mobile Number"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
              />
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.fullName}
                inlineImagePadding={20}
                inlineImageLeft="user"
                placeholder={"Address"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
              />
              <InputField
                style={inputStyles.inputField}
                schema={updateUserFields.fullName}
                inlineImagePadding={20}
                inlineImageLeft="user"
                placeholder={"Date of Birth"}
                onChange={this.handleFieldChange}
                error={updateUserModelError}
              />
            </Form>
            <View
              style={{
                marginTop: moderateScale(30),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(255, 32, 32)",
                }}
                onPress={this.resetPassword}
              >
                Reset Password
              </Text>
            </View>
          </View>
          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              onPress={this.updateUserData}
              loading={btnState}
            >
              {"Update"}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  resetPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ChangePassword",
        passProps: {
          componentId: this.props.componentId,
        },
        options: {
          topBar: {
            visible: true,
            height: 60,
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              text: "Change Password",
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

  handleFieldChange = (name, value) => {
    const { onFieldChange } = this.props;
    onFieldChange({
      form: updateUserModel.name,
      name,
      value,
    });
  };

  updateUserData = () => {
    const { frmUpdateUser, setState, updateUser } = this.props;
    let formUpdateUser = { ...frmUpdateUser };
    if (isUndefined(frmUpdateUser.Country)) {
      let initialCountry = {
        cca2: "US",
        currency: ["USD"],
        callingCode: ["1"],
        region: "Americas",
        subregion: "North America",
        flag: "flag-us",
        name: "United States",
      };
      formUpdateUser = { ...frmUpdateUser, Country: initialCountry };
    }
    const validateStatus = validate(updateUserModel, formUpdateUser);
    setState({
      updateUserModelError: validateStatus,
    });
    if (isEmpty(validateStatus)) {
      let phoneNumber = frmUpdateUser.phoneNumber.toString();
      if (phoneNumber.charAt(0) == "0") {
        phoneNumber = phoneNumber.substring(1);
      }

      let formattedNumber = `+${formUpdateUser.Country.callingCode}${phoneNumber}`;

      const objUser = {
        id: frmUpdateUser.id,
        email: frmUpdateUser.email,
        userName: frmUpdateUser.userName,
        phoneNumber: formattedNumber,
        imageData: frmUpdateUser.imageData,
        fullName: frmUpdateUser.fullName,
      };
      setState({ btnState: true });
      updateUser(objUser, this.props.componentId);
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    sessionObject: state.app.sessionObject,
    userDetails: state.app.userData,
    updateUserModelError: state.app.updateUserModelError,
    frmUpdateUser: state.form.updateUser,
  };
};

export const UpdateUserContainer = connect(mapStateToProps, {
  getUserDetails,
  onFieldChange,
  resetForms,
  setFormFields,
  setState,
  updateUser,
})(UpdateUser);

const styles = StyleSheet.create({
  userContainer: {
    width: "90%",
    top: 50,
    left: "5%",
    right: "5%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  editIcon: {
    position: "absolute",
    left: "auto",
    right: "0%",
    top: 67,
    fontSize: 15,
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: "rgb(169,169,169)",
    justifyContent: "center",
    alignItems: "center",
    width: 33,
    height: 33,
    backgroundColor: "#ddd",
  },
  deleteIcon: {
    position: "absolute",
    left: "auto",
    right: "40%",
    top: 20,
    color: "black",
    fontSize: 15,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 50,
  },
  profileImgEmpty: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 50,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSection: {
    width: "100%",
    top: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  rcsButton:
    Platform.Os === "android"
      ? {
          height: moderateScale(50),
          width: "80%",
          backgroundColor: "#ff2020",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ff2020",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(50),
          marginBottom: moderateScale(100),
          marginTop: moderateScale(30),
        }
      : {
          height: moderateScale(50),
          width: "80%",
          backgroundColor: "#ff2020",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ff2020",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(50),
          marginBottom: moderateScale(100),
          marginTop: moderateScale(30),
          paddingTop: moderateScale(10),
          paddingBottom: moderateScale(0),
        },
});
