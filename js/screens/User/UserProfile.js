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

  static defaultProps = {
    userDeatails: {
      patient: {},
    },
  };

  static get options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: "menuBtn",
            icon: require("images/baseline_menu.png"),
            color: "black",
          },
        ],
        rightButtons: [
          {
            id: "updateBtn",
            text: "Update",
            color: "black",
          },
        ],
      },
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "updateBtn") {
      Navigation.push("CenterStack", {
        component: {
          name: "UpdateUser",
          passProps: {
            data: {},
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
                text: "Update Profile",
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
    } else if (buttonId === "menuBtn") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }

  componentDidMount() {
    const { setFormFields, userDetails } = this.props;
    setFormFields({
      name: updateUserModel.name,
      value: userDetails,
    });
  }

  componentDidAppear() {
    this.props.getUserDetails();
  }

  Signout = () => {
    const { logout } = this.props;
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
    const { userDetails, btnState, userDeatails } = this.props;
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
                  marginTop: 75,
                  marginLeft: 100,
                  width: "60%",
                }}
              >
                {userDeatails.patient.first_name +
                  " " +
                  userDeatails.patient.last_name}
              </Text>
              {/* <Text
                onPress={this.goToEditPage}
                style={styles.editIcon}
                color="#000000"
              >
                Update
              </Text> */}
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginTop: 25,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <View style={{ flex: 3, padding: 20 }}>
              {/* <Text style={{ marginBottom: 10 }}>
                Name :
                <Text style={{ fontWeight: "bold" }}> {"Thiraj Hassen"}</Text>
              </Text> */}
              <Text style={{ marginBottom: 10 }}>
                Address :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {userDeatails.patient.address}
                </Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Mobile :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {userDeatails.patient.mobile}
                </Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Date of Birth :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {userDeatails.patient.date_of_birth}
                </Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Height :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {userDeatails.patient.height + " cm"}
                </Text>
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Weight :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {userDeatails.patient.weight + " KG"}
                </Text>
              </Text>
              <Text>
                BMI :
                <Text style={{ fontWeight: "bold" }}> {userDeatails.bmi}</Text>
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

  // goToEditPage = (item) => {
  //   Navigation.push("CenterStack", {
  //     component: {
  //       name: "UpdateUser",
  //       passProps: {
  //         data: item,
  //       },
  //       options: {
  //         topBar: {
  //           visible: true,
  //           height: moderateScale(60),
  //           topMargin: 15,
  //           borderHeight: 0,
  //           elevation: 0,
  //           title: {
  //             alignment: "center",
  //             text: "Update Profile",
  //             fontSize: 25,
  //             fontFamily: "Ubuntu-Bold",
  //           },
  //           backButton: {
  //             showTitle: false,
  //           },
  //           background: {
  //             color: "#FFFFFF",
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

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
    userDeatails: state.user.userDeatails,
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
})(UserProfile);

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
  },
  topProBlock: {
    height: 80,
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
    // left: "auto",
    right: 180,
    top: 10,
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
