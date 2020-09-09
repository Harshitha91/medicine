import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Keyboard,
  BackHandler,
  ActivityIndicator,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { AirbnbRating } from "react-native-ratings";
import Text from "components/ui/Text";
import Buttons from "components/ui/Button";
import modalStyle from "styles/ui/modalStyle";
import InputField from "components/ui/forms/InputField";
import Form from "components/ui/forms/Form";
import { dialNumber } from "util/core";
import { Navigation } from "react-native-navigation";
import Badge from "components/ui/Badge";
import { moderateScale } from "util/sizes";
import { onFieldChange, setState, resetForms, setFormFields } from "actions";
import Icon from "react-native-vector-icons/MaterialIcons";
import Style from "styles";
import ImageView from "react-native-image-view";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { CachedImage } from "react-native-cached-image";
import { localTime } from "../../helpers/datetimeHelper";
import debounce from "lodash/debounce";
import { imageBucket } from "../../../config";

const Button = withPreventDoubleClick(Buttons);
const theme = Style.get();

export default class ChannelingDetails extends React.Component {
  static defaultProps = {
    frmComplain: {},
    btnState: false,
    isModalVisible: false,
    complainModelError: {},
    isKeyboardShow: false,
    sessionObject: {},
    complaintViewLoader: true,
    complaintStatusValue: null,
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.toastMessage !== this.props.toastMessage) {
  //     this.dropdown.alertWithType(nextProps.toastMessage.status, nextProps.toastMessage.header, nextProps.toastMessage.details);
  //   }
  // }

  componentDidMount() {}

  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      isImageViewVisible: false,
      isUpdate: false,
      pickedImages: [
        {
          imageUrl:
            "https://www.shutterstock.com/image-vector/blank-rx-prescription-form-isolated-on-249725020",
        },
        {
          imageUrl:
            "https://www.shutterstock.com/image-vector/blank-rx-prescription-form-isolated-on-249725020",
        },
      ],
    };
    Navigation.events().bindComponent(this);
  }

  render() {
    const { btnState, isModalVisible, data } = this.props;
    let badgeType = "success";
    let badgeText = "COMPLETED";
    let badgeColor = "#69C31D";
    const { isImageViewVisible, imageIndex } = this.state;

    return (
      <View>
        {false ? (
          <ActivityIndicator
            animating={false}
            style={
              false && {
                height: "100%",
                width: "100%",
                alignContent: "center",
                justifyContent: "center",
              }
            }
            size="large"
            color="#ff2020"
          />
        ) : (
          <KeyboardAwareScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.formContainer}
          >
            <View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    width: "80%",
                    top: 15,
                    marginBottom: moderateScale(8),
                  }}
                >
                  <Text
                    style={{
                      marginTop: moderateScale(5),
                      marginBottom: moderateScale(2),
                      color: "#ff2020",
                    }}
                  >
                    ID: <Text style={{ color: "#ff2020" }}>{"C 3492"}</Text>
                  </Text>
                  <Text
                    type="bold"
                    style={{ fontSize: 20, color: "rgb(67,67,67)" }}
                  >
                    {"Dr. Ruwan Wijewardhana"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  top: moderateScale(10),
                  flexWrap: "wrap",
                  maxWidth: "75%",
                }}
              >
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "gray",
                    left: moderateScale(10),
                  }}
                />
                <View>
                  <Icon
                    style={[
                      styles.linkIcon,
                      { left: moderateScale(15), top: moderateScale(-2) },
                    ]}
                    name="schedule"
                    size={moderateScale(18)}
                    color="gray"
                  />
                </View>
                <View>
                  <Text
                    style={{ left: moderateScale(15), top: moderateScale(2) }}
                  >
                    {"2020-09-21"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: moderateScale(15),
                  fontSize: moderateScale(17),
                }}
              >
                <Text style={{ color: "rgb(154,154,154)", fontSize: 15 }}>
                  Channeling Center:
                </Text>
                <Text
                  style={{
                    color: "rgb(67,67,67)",
                    marginTop: moderateScale(5),
                  }}
                >
                  {"Asiri Medical."}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: moderateScale(15),
                  color: "rgb(154,154,154)",
                  fontSize: 15,
                }}
              ></View>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "rgb(154,154,154)", fontSize: 15 }}>
                  Prescriptions:{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    height: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    marginLeft: moderateScale(12),
                    width: "100%",
                  }}
                >
                  {this.state.pickedImages.length
                    ? this.state.pickedImages.map((image, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              height: 100,
                              width: "30%",
                              borderWidth: 1.3,
                              borderColor: "#000",
                              borderRadius: 8,
                              borderStyle: "dashed",
                              marginRight: moderateScale(6),
                              marginBottom: moderateScale(6),
                            }}
                          >
                            <CachedImage
                              style={{ height: 96, width: "100%" }}
                              source={{
                                uri: image.imageUrl,
                              }}
                              onLoadEnd={() =>
                                this.handleFieldChange("imageData", imageData)
                              }
                            />
                            <View
                              style={{
                                position: "absolute",
                                top: 2,
                                opacity: 0.58,
                                backgroundColor: "rgba(52, 52, 52, 0.8)",
                                borderRadius: 10,
                                right: 2,
                              }}
                            >
                              <Icon
                                name="clear"
                                onPress={() => {}}
                                size={moderateScale(18)}
                                color="white"
                              />
                            </View>
                          </View>
                        );
                      })
                    : null}
                  {this.state.pickedImages.length < 10 ? (
                    <View
                      style={{
                        height: 100,
                        width: "30%",
                        borderWidth: 1.3,
                        borderColor: "#000",
                        borderRadius: 8,
                        borderStyle: "dashed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Icon
                        name="add"
                        size={moderateScale(45)}
                        color="#555"
                        onPress={() => {}}
                      />
                    </View>
                  ) : null}
                </View>
              </View>

              {/* <View>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ color: "rgb(154,154,154)", fontSize: 15 }}>
                    Facility details{" "}
                  </Text>
                </View>

                <View style={{ marginTop: 15, paddingRight: 10 }}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: "80%" }}>
                      <Text
                        type="bold"
                        style={{ fontSize: 18, color: "rgb(67,67,67)" }}
                      >
                        {frmComplain.propertyName}
                      </Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ width: "10%" }}>
                          <Image
                            source={require("images/Location.png")}
                            style={{
                              height: 25,
                              width: 20,
                              top: 5,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: "90%",
                            marginLeft: 5,
                            height: moderateScale(35),
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{ fontSize: 14, color: "rgb(67,67,67)" }}
                          >{`${frmComplain.propertyAddress}, ${
                            frmComplain.propertyPostalCode || ""
                          }, ${frmComplain.propertyCountry}.`}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ width: "20%", height: 50 }}>
                      {frmComplain && frmComplain.propertyImageUrl == null ? (
                        <Image
                          source={require("images/placeholder-rcs.png")}
                          style={{
                            position: "absolute",
                            height: 55,
                            right: 0,
                            top: 5,
                            width: 55,
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: frmComplain.propertyImageUrl }}
                          style={{
                            position: "absolute",
                            height: 55,
                            right: 0,
                            top: 5,
                            width: 55,
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View> */}

              {/* <View style={{ marginTop: 30 }}>
                <View>
                  <Text style={{ color: "rgb(154,154,154)", fontSize: 15 }}>
                    Complainer contact details
                  </Text>
                </View>

                <View style={{ paddingRight: 15 }}>
                  <Text style={{ marginTop: 10, color: "rgb(67,67,67)" }}>
                    Name :
                    <Text style={{ color: "rgb(67,67,67)" }}>
                      {" "}
                      {frmComplain.createdBy}
                    </Text>
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "rgb(67,67,67)" }}>
                      Phone :
                      <Text style={{ color: "rgb(67,67,67)" }}>
                        {" "}
                        {frmComplain.userPhoneNumber}{" "}
                      </Text>
                    </Text>
                    <Icon
                      style={{
                        justifyContent: "center",
                        bottom: moderateScale(2),
                      }}
                      name="phone"
                      size={moderateScale(18)}
                      color="black"
                      onPress={() => dialNumber(frmComplain.userPhoneNumber)}
                    />
                  </View>
                  <Text style={{ color: "rgb(67,67,67)" }}>
                    Email :
                    <Text style={{ color: "rgb(67,67,67)" }}>
                      {" "}
                      {frmComplain.userEmail}
                    </Text>
                  </Text>
                </View>
              </View> */}

              {/* <View
                style={{
                  marginTop: moderateScale(20),
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                }}
              /> */}
              <View style={{ marginTop: moderateScale(20) }}>
                <View style={styles.buttonSection}>
                  <Button
                    style={styles.rcsButton}
                    onPress={() => {}}
                    loading={btnState}
                  >
                    {"Update"}
                  </Button>
                </View>
              </View>
              {/* <View
                style={{
                  marginTop: moderateScale(20),
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                }}
              /> */}
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }

  closeButton = () => {
    return (
      <TouchableOpacity
        hitSlop={{ top: 30, left: 15, right: 30, bottom: 15 }}
        style={styles.closeButton}
        onPress={() => this.setState({ isImageViewVisible: false })}
      >
        <Text style={styles.closeButton__text}>x</Text>
      </TouchableOpacity>
    );
  };

  generateCid = (cid) => {
    var hash = 0;
    var i = 0;

    if (cid.length == 0) {
      return hash;
    }
    for (i; i < cid.length; i++) {
      char = cid.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  handleFeedbackModal = () => {
    const { isModalVisible, setState } = this.props;
    setState({
      isModalVisible: !isModalVisible,
    });
  };

  updateStatus = () => {
    const { setState, fromNotification } = this.props;
    setState({ btnState: true });
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    isModalVisible: state.app.isModalVisible,
    isKeyboardShow: state.app.isKeyboardShow,
    sessionObject: state.app.sessionObject,
  };
};

export const ChannelingDetailsContainer = connect(mapStateToProps, {
  onFieldChange,
  setState,
  resetForms,
  setFormFields,
})(ChannelingDetails);

const styles = StyleSheet.create({
  complainType: {
    height: 19.639602661132812,
    width: 101.740234375,
    backgroundColor: "#fff0f0",
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "#feddca",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    left: 2,
  },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    backgroundColor: "#FFFFFF", // TODO: need to check with bigger screen
  },
  complaintImage: {
    height: 55,
    top: 5,
    width: 55,
    borderRadius: 10,
    marginRight: 10,
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(3),
  },
  buttonSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rcsButton:
    Platform.OS === "android"
      ? {
          height: moderateScale(50),
          width: "90%",
          backgroundColor: "#032DFF",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(50),
          marginBottom: moderateScale(20),
          marginTop: moderateScale(30),
        }
      : {
          height: moderateScale(57),
          width: "90%",
          backgroundColor: "#ff2020",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "rgba(255, 107, 107, 0.45)",
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 6.7,
          shadowOpacity: 1,
          borderRadius: moderateScale(50),
          marginBottom: moderateScale(20),
          marginTop: moderateScale(30),
        },
  cancelBtn:
    Platform.OS === "android"
      ? {
          borderColor: "#000",
        }
      : {
          borderColor: "#000",
          paddingTop: 1,
          paddingBottom: 1,
          paddingRight: 5,
          paddingLeft: 5,
        },
  profileImg:
    Platform.OS === "android"
      ? {
          position: "absolute",
          right: 0,
          height: 55,
          top: 5,
          width: 55,
          borderRadius: 40,
        }
      : {
          position: "absolute",
          right: 0,
          height: 50,
          top: 5,
          width: 50,
          borderRadius: 50 / 2,
        },
  closeButton: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginRight: 15,
  },
  closeButton__text: {
    backgroundColor: "transparent",
    fontSize: 25,
    lineHeight: 25,
    color: "#FFF",
    textAlign: "center",
  },
});
