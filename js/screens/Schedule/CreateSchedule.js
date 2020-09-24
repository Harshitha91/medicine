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
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveSchedule,
  getDropdownMedicines,
} from "actions";
import scheduleModel from "models/schedule.json";
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
import moment from "moment";
const Button = withPreventDoubleClick(Buttons);

export default class CreateSchedule extends React.Component {
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
    loading: false,
    medicines: [],
  };

  state = {
    timeData: [],
    isUpdate: false,
    pickedImage: null,
    imgData: null,
    updatebtnDisable: false,
    times: [],
  };

  componentDidMount() {
    const { data, setFormFields, setState } = this.props;
    // if (data) {
    //   setFormFields({
    //     name: scheduleModel.name,
    //     value: data,
    //   });

    //   this.setState({
    //     isUpdate: true,
    //     updatebtnDisable: true,
    //   });
    // }
    setState({ btnState: false });
    this.props.getDropdownMedicines();
  }

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

    const scheduleFields = scheduleModel.fields;
    const timeFields = timeModel.fields;
    const formData = {
      name: scheduleModel.name,
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
              data={this.props.medicines}
              schema={scheduleFields.medicine_id}
              placeholder={"Medicine"}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            <InputField
              data={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
              ]}
              schema={scheduleFields.recurring_type}
              placeholder={"Recurring Type"}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            <InputField
              schema={scheduleFields.start_date}
              placeholder={"Start Date"}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
            <InputField
              schema={scheduleFields.end_date}
              placeholder={"End Date"}
              onChange={this.handleFieldChange}
              error={scheduleModelError}
            />
          </Form>

          <View style={styles.complainTypeSectionHeader}>
            <Text style={styles.complainTypeViewLabels}>Times And Doses</Text>
          </View>

          {this.state.times.length !== 0 && (
            <View style={styles.listContainer}>
              <FlatList
                data={this.state.times}
                schema={scheduleModel.schedule}
                extraData={this.state.times}
                renderItem={({ item, index }) => (
                  <ComplainTypeListItem
                    data={item}
                    isScheduleUpdate={true}
                    keyIndex={item.id}
                    removeTime={this.removeTime}
                    onPress={this.handleTimeItemClick}
                  />
                )}
                onEndReachedThreshold={0.5}
              />
            </View>
          )}
          {/* {!this.state.isUpdate && this.state.timesData.length !== 0 && (
            <View style={styles.listContainer}>
              <FlatList
                data={this.state.complainTypeData}
                schema={propertyModel.complainTypes}
                extraData={{ complainTypeData }}
                renderItem={({ item, index }) => (
                  <ComplainTypeListItem
                    data={item}
                    isPropertyUpdate={false}
                    keyIndex={index}
                    removeComplainType={this.removeComplainType}
                    onPress={this.handleComplainTypeItemClick}
                  />
                )}
                onEndReachedThreshold={0.5}
              />
            </View>
          )} */}
          <View style={styles.addBtnContainer}>
            <Button
              style={styles.complainTypeAddBtn}
              onPress={() =>
                setState({
                  isVisibleTimeModal: true,
                })
              }
            >
              {"+ Add"}
            </Button>
          </View>

          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              disabled={this.state.updatebtnDisable}
              onPress={this.scheduleHandler}
              loading={btnState}
            >
              {buttonLabel}
            </Button>
          </View>

          <View style={styles.buttonSection2}></View>
          <Modal
            visible={isVisibleTimeModal}
            animationType={"fade"}
            transparent={true}
            presentationStyle={"overFullScreen"}
            onRequestClose={() => {}}
          >
            <View style={modalStyle.overlay}>
              <View style={modalStyle.body}>
                <View style={modalStyle.header}>
                  <Text style={modalStyle.headerText}>{"Times And Doses"}</Text>
                </View>
                <View style={modalStyle.containerStyle}>
                  <KeyboardAwareScrollView
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                  >
                    <InputField
                      schema={timeFields.time}
                      containerStyle={{ width: "98%" }}
                      form={timeFormData}
                      onChange={this.handleTimeModalFieldChange}
                      error={timeModelError}
                    />
                    <InputField
                      schema={timeFields.dose}
                      containerStyle={{ width: "98%" }}
                      form={timeFormData}
                      onChange={this.handleTimeModalFieldChange}
                      error={timeModelError}
                    />

                    <View style={modalStyle.btnAreaFromEnd}>
                      <Button
                        transparent
                        style={styles.cancelBtn}
                        onPress={() =>
                          this.handleCancelButtonClick(timeFormData.name)
                        }
                      >
                        <Text style={{ color: "#000000" }}>{"Cancel"}</Text>
                      </Button>
                      <Button style={modalStyle.btn} onPress={this.addTime}>
                        {isUndefined(timeFormData.data.hasSchedule)
                          ? "Add"
                          : "Update"}
                      </Button>
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </View>
            </View>
          </Modal>
          {this.renderSpinnerLoader()}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderSpinnerLoader = () => {
    return <Spinner visible={this.props.loading} />;
  };

  scheduleHandler = () => {
    const { frmSchedule, setState, saveSchedule, componentId } = this.props;

    // if (!this.state.isUpdate) {

    // }
    const validateStatus = validate(scheduleModel, { ...frmSchedule });
    setState({
      scheduleModelError: validateStatus,
    });

    let hasActiveComplainTypes = false;

    frmSchedule.schedule = {
      [frmSchedule.recurring_type]: this.state.times,
    };

    if (isEmpty(validateStatus)) {
      setState({ btnState: true });
      saveSchedule(
        {
          ...frmSchedule,
          medicine_id: 1,
          start_date: moment.unix(frmSchedule.start_date).format("YYYY-MM-DD"),
          end_date: moment.unix(frmSchedule.end_date).format("YYYY-MM-DD"),
        },
        componentId
      );
    }
  };

  handleTimeItemClick = (item) => {
    const { setState, setFormFields } = this.props;
    setFormFields({
      name: timeModel.name,
      value: item,
    });

    setState({ isVisibleTimeModal: true });
  };

  removeTime = (keyIndex) => {
    // if (this.state.isUpdate) {
    //   this.props.removeTime(keyIndex);
    // } else {
    const timeArray = [...this.state.times];
    timeArray.splice(keyIndex, 1);

    this.setState({
      times: timeArray,
    });
    // }
  };

  handleFieldChange = (name, value) => {
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG", name, value);
    const { onFieldChange } = this.props;
    onFieldChange({
      form: scheduleModel.name,
      name,
      value,
    });
  };

  handleTimeModalFieldChange = (name, value) => {
    const { onFieldChange, times } = this.props;
    onFieldChange({
      form: timeModel.name,
      name,
      value,
    });
    if (this.state.times.length == 0) {
      this.setState({
        updatebtnDisable: false,
      });
    }
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
        times: [...this.state.times, frmTime],
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
    loading: state.schedule.loading,
    medicines: state.schedule.medicines,
  };
};

export const CreateScheduleContainer = connect(mapStateToProps, {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveSchedule,
  getDropdownMedicines,
})(CreateSchedule);

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
    backgroundColor: "#00adf5",
    borderRadius: moderateScale(20),
    marginTop: moderateScale(15),
  },
  buttonSection: {
    width: "100%",
    marginTop: "10%",
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
          backgroundColor: "#00adf5",
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
