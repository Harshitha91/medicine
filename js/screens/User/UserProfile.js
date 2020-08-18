import React, { Component } from "react";
import { View, Image, StyleSheet, Alert, Platform } from "react-native";
import InputField from "styles/ui/auth/InputField";
import Buttons from "components/ui/Button";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { CachedImage } from "react-native-cached-image";
import Badge from "components/ui/Badge";
import {
  logout,
  setState,
  resetForms,
  updateUser,
  setFormFields,
  onFieldChange,
  getUserDetails,
  updateUserDeviceId,
} from "actions";
import updateUserModel from "models/updateUser";
import Text from "components/ui/Text";
import { moderateScale } from "util/sizes";

import withPreventDoubleClick from "screens/components/PreventDoubleClick";
const Button = withPreventDoubleClick(Buttons);

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { setFormFields, userDetails } = this.props;
    setFormFields({
      name: updateUserModel.name,
      value: userDetails,
    });
  }

  Signout = () => {
    const { updateUserDeviceId, logout } = this.props;
    const objUserToken = {
      deviceToken: null,
      app: "Admin",
    };
    updateUserDeviceId(objUserToken);
    logout();
  };

  onSignOut() {
    return Alert.alert(
      "Confirm",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: () => this.Signout(),
        },
        {
          text: "No",
          onPress: () => {
            return;
          },
        },
      ],
      { cancelable: true }
    );
  }

  componentWillUnmount() {}

  render() {
    const { userDetails, btnState } = this.props;
    let userStatus = userDetails ? userDetails.userStatus : "";
    return (
      <View style={styles.userContainer}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={{
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.topProBlock}>
              {userDetails && userDetails.imageUrl !== null ? (
                <Image
                  source={{ uri: userDetails.imageUrl }}
                  style={styles.profileImg}
                />
              ) : (
                <Image
                  source={require("images/sample-user.png")}
                  style={styles.profileImg}
                />
              )}
              <Text
                type="bold"
                style={{
                  fontSize: 24,
                  paddingLeft: 20,
                  marginTop: 120,
                  width: "60%",
                }}
              >
                {userDetails ? userDetails.fullName : ""}
              </Text>
              <Text
                onPress={this.goToEditPage}
                style={styles.editIcon}
                color="white"
              >
                Edit
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <View style={{ flex: 3, padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>
                Weight :<Text style={{ fontWeight: "bold" }}> {"73 KG"}</Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Height :<Text style={{ fontWeight: "bold" }}> {"150 cm"}</Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Phone :
                <Text style={{ fontWeight: "bold" }}> {"+94719354760"}</Text>
              </Text>
              <Text>
                Email :
                <Text style={{ fontWeight: "bold" }}> {"test1@gmail.com"}</Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonSection}>
          {Platform.OS === "android" && (
            <Button
              iconBtn
              transparent
              style={styles.rcsButton}
              onPress={() => this.onSignOut()}
            >
              <Text type="bold" style={{ color: "#000", fontSize: 18 }}>
                {"Sign Out"}
              </Text>
            </Button>
          )}
          {Platform.OS === "ios" && (
            <Button style={styles.rcsButton} onPress={() => this.onSignOut()}>
              <Text type="bold" style={{ color: "#000", fontSize: 18 }}>
                {"Sign Out"}
              </Text>
            </Button>
          )}
        </View>
      </View>
    );
  }

  goToEditPage = (item) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "UpdateUser",
        passProps: {
          data: item,
        },
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Edit Profile Details",
              fontSize: 25,
              fontFamily: "Ubuntu-Bold",
            },
            backButton: {
              showTitle: false,
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionObject: state.app.sessionObject,
    userDetails: state.app.userData,
    updateUserModelError: state.app.updateUserModelError,
    frmUpdateUser: state.form.updateUser,
  };
};

export const UserProfileContainer = connect(mapStateToProps, {
  getUserDetails,
  onFieldChange,
  resetForms,
  setFormFields,
  setState,
  updateUser,
  logout,
  updateUserDeviceId,
})(UserProfile);

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
  },
  topProBlock: {
    height: 120,
    width: "100%",
  },
  editIcon: {
    position: "absolute",
    left: "auto",
    right: 10,
    top: 40,
    color: "white",
    fontSize: 20,
  },
  profileImg: {
    height: Platform.OS === "android" ? 55 : moderateScale(55),
    width: Platform.OS === "android" ? 55 : moderateScale(55),
    borderRadius: Platform.OS === "android" ? 40 : moderateScale(55 / 2),
    borderWidth: 1,
    position: "absolute",
    left: "auto",
    right: 50,
    top: 50,
  },
  profileImgBg: {
    position: "absolute",
    left: "auto",
    right: -50,
    top: -50,
    height: 270,
    width: 210,
  },
  buttonSection: {
    bottom: 0,
    marginBottom: 36,
    alignItems: "center",
  },
  rcsButton:
    Platform.OS === "android"
      ? {
          width: "80%",
          height: moderateScale(50),
          backgroundColor: "transparent",
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(20),
          borderWidth: 1.6,
          borderColor: "#000",
        }
      : {
          width: "80%",
          height: moderateScale(65),
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(20),
          borderWidth: 1.6,
          borderColor: "#000",
          backgroundColor: "#ffffff",
        },
});
