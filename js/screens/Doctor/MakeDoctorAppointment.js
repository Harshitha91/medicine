import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveSchedule,
} from "actions";
import doctorModel from "models/doctor.json";
import modalStyle from "styles/ui/modalStyle";
import timeModel from "models/times.json";
import { moderateScale, normalize } from "util/sizes";
import Text from "components/ui/Text";
import Form from "components/ui/forms/Form";
import InputField from "components/ui/forms/InputField";
import Buttons from "components/ui/Button";
import { ComplainTypeListItem } from "../components/ComplainTypeListItem";
import isEmpty from "lodash/isEmpty";
import { validate } from "util/validator";
import { isUndefined } from "util/core";
import { showInAppNotification } from "util/NavigationActions";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
import { Navigation } from "react-native-navigation";

const Button = withPreventDoubleClick(Buttons);

export default class MakeDoctorAppointment extends React.Component {
  constructor(props) {
    super(props);
  }

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
    frmSchedule: {},
    frmTime: {},
    scheduleModelError: {},
    isKeyboardShow: false,
    sessionObject: {},
    isVisibleTimeModal: false,
    timeModelError: {},
  };

  state = {
    timeData: [],
    isUpdate: false,
    pickedImage: null,
    imgData: null,
    updatebtnDisable: false,
    times: [],
  };

  componentDidMount() {}

  componentWillUnmount() {
    const { resetForm, setState } = this.props;
    resetForm("schedule");
    setState({
      scheduleModelError: {},
    });
  }

  render() {
    const {
      frmSchedule,
      scheduleModelError,
      timeModelError,
      frmTime,
      isVisibleTimeModal,
      setState,
      time,
      btnState,
    } = this.props;

    const doctorFields = doctorModel.fields;
    const timeFields = timeModel.fields;
    const formData = {
      name: doctorModel.name,
      data: frmSchedule,
    };
    const timeFormData = {
      name: timeModel.name,
      data: frmTime,
    };
    const timeData = this.state.timeData;
    const buttonLabel = this.state.isUpdate
      ? "Update Schedule"
      : "Create Schedule";
    return (
      <View style={styles.containerStyle}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.formContainer}
        >
          <Form form={formData}>
            <InputField
              data={[
                { id: "2424", value: "sfsdfsdf" },
                { id: "2425", value: "sfsdfsdf" },
              ]}
              schema={doctorFields.hospital}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            <InputField
              data={[
                { id: "2424", value: "sfsdfsdf" },
                { id: "2425", value: "sfsdfsdf" },
              ]}
              schema={doctorFields.date}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            <InputField
              data={[
                { id: "2424", value: "sfsdfsdf" },
                { id: "2425", value: "sfsdfsdf" },
              ]}
              schema={doctorFields.speciality}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            {/* <InputField
              data={[
                { id: "2424", value: "sfsdfsdf" },
                { id: "2425", value: "sfsdfsdf" },
              ]}
              schema={doctorFields.speciality}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            /> */}
          </Form>

          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              disabled={this.state.updatebtnDisable}
              onPress={this.searchDoctorForAppoinment}
              loading={btnState}
            >
              {"Search"}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  searchDoctorForAppoinment = () => {
    Navigation.push("CenterStack", {
      component: {
        name: "TimeSlots",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0.5,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Time Slots",
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

  scheduleHandler = () => {
    const { frmSchedule, setState, saveSchedule, componentId } = this.props;

    // if (!this.state.isUpdate) {
    frmSchedule.times = this.state.timeData;
    // }
    const validateStatus = validate(scheduleModel, { ...frmSchedule });
    setState({
      scheduleModelError: validateStatus,
    });

    let hasActiveComplainTypes = false;

    if (!this.state.isUpdate) {
      if (this.state.timeData.length == 0) {
        showInAppNotification("error", "Please add a complaint type", 5000);
        return;
      }
    } else {
      if (this.state.times.length == 0) {
        showInAppNotification("error", "Please add a complaint type", 5000);
        return;
      }
    }

    if (isEmpty(validateStatus)) {
      setState({ btnState: true });
      saveSchedule(frmSchedule, componentId);
    }
  };

  removeTime = (keyIndex) => {
    // if (this.state.isUpdate) {
    //   this.props.removeTime(keyIndex);
    // } else {
    const timeArray = [...this.state.timeData];
    timeArray.splice(keyIndex, 1);

    this.setState({
      timeData: timeArray,
    });
    // }
  };

  addTime = () => {
    const { frmTime, setState, resetForm, updateTime, saveTime } = this.props;
    const validateStatus = validate(timeModel, { ...frmTime });

    setState({
      timeModelError: validateStatus,
    });

    if (isEmpty(validateStatus)) {
      frmTime.key = Date.now(); //Add timestamp as a key for array item.
      this.setState({
        timeData: [...this.state.timeData, frmTime],
      });
      resetForm(timeModel.name);
      setState({ isVisibleTimeModal: false });
    }
  };

  handleCancelButtonClick = (formName) => {
    const { setState, resetForm, resetUpdateFormFields } = this.props;
    resetForm(formName);
    resetUpdateFormFields(formName);
    setState({
      isVisibleTimeModal: false,
      complainTypeModelError: "",
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    frmSchedule: state.form.schedule,
    frmTime: state.form.time,
    sessionObject: state.app.sessionObject,
    isVisibleTimeModal: state.app.isVisibleTimeModal,
    scheduleModelError: state.app.scheduleModelError,
    timeModelError: state.app.timeModelError,
  };
};

export const MakeDoctorAppointmentContainer = connect(mapStateToProps, {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveSchedule,
})(MakeDoctorAppointment);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: moderateScale(8),
    elevation: 2,
  },
  formContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16),
    backgroundColor: "#FFFFFF", // TODO: need to check with bigger screen
  },
  // formContainer: {
  //   width: "100%",
  //   flexDirection: "column",
  //   flexWrap: "wrap",
  //   justifyContent: "flex-start",
  //   paddingTop: moderateScale(14),
  //   paddingBottom: moderateScale(20),
  //   paddingRight: '10%',
  //   // TODO: need to check with bigger screen
  // },
  btnArea: {
    bottom: 0,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: moderateScale(20),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  btn: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    marginRight: moderateScale(6),
    backgroundColor: "#ff2020",
  },
  btnleft: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    marginRight: moderateScale(6),
    backgroundColor: "#ff2020",
  },
  addBtnContainer: {
    alignItems: "flex-start",
  },
  complainTypeAddBtn: {
    height: moderateScale(20),
    width: moderateScale(98),
    backgroundColor: "#032DFF",
    borderRadius: moderateScale(20),
    marginTop: moderateScale(15),
  },
  buttonSection: {
    width: "100%",
    marginTop: "50%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSection2: {
    marginTop: "5%",
    marginBottom: "5%",
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
          marginTop: moderateScale(30),
        }
      : {
          height: moderateScale(50),
          width: "90%",
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
          marginTop: moderateScale(30),
          paddingTop: moderateScale(10),
          paddingBottom: moderateScale(0),
        },
  listContainer: {
    // marginTop: 30,
    // height: 80,
    // width: '100%',
    // backgroundColor: '#fdfdfd',
    // borderRadius: 6
    // flex:1,
    // flexWrap: "wrap",
    // backgroundColor: '#000000',
  },
  sectionHeader: {
    flex: 0,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(15),
    flexDirection: "row",
  },
  viewLabels: {
    flex: 1,
    fontSize: normalize(18),
    color: "#000000",
  },
  complainTypeSectionHeader: {
    flex: 0,
    marginBottom: moderateScale(15),
    flexDirection: "row",
    marginLeft: moderateScale(5),
  },
  complainTypeViewLabels: {
    flex: 1,
    fontSize: normalize(17),
    height: 30,
    color: "#000000",
  },
  labelRequired: {
    color: "#e85353",
  },
  btnAreaFromEnd: {
    flex: 0,
    flexDirection: "row",
  },
  cancelBtn: {
    marginTop: moderateScale(10),
    borderColor: "#FFFFFF",
    paddingTop:
      Platform.OS === "android" ? moderateScale(20) : moderateScale(10),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    margin: moderateScale(10),
  },
});
