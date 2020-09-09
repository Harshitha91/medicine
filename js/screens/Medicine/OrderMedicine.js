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
import orderMedicineModel from "models/orderMedicine.json";
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
import Icon from "react-native-vector-icons/MaterialIcons";

const Button = withPreventDoubleClick(Buttons);

export default class OrderMedicine extends React.Component {
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
    medicineModelError: {},
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

  componentDidMount() {
    const { data, setFormFields } = this.props;
    if (data) {
      setFormFields({
        name: medicineModel.name,
        value: data,
      });

      this.setState({
        isUpdate: true,
        updatebtnDisable: true,
      });
    }
  }

  componentWillUnmount() {
    const { resetForm, setState } = this.props;
    resetForm("schedule");
    setState({
      medicineModelError: {},
    });
  }

  render() {
    const {
      frmSchedule,
      medicineModelError,
      timeModelError,
      frmTime,
      isVisibleTimeModal,
      setState,
      time,
      btnState,
    } = this.props;

    const orderMedicineFields = orderMedicineModel.fields;
    const timeFields = timeModel.fields;
    const formData = {
      name: orderMedicineModel.name,
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
              schema={orderMedicineFields.pharmacy}
              onChange={this.handleFieldChange}
              error={medicineModelError}
            />
            <InputField
              data={[
                { id: "2424", value: "sfsdfsdf" },
                { id: "2425", value: "sfsdfsdf" },
              ]}
              schema={orderMedicineFields.deliveryMethod}
              onChange={this.handleFieldChange}
              error={medicineModelError}
            />
            <Text
              type="medium"
              style={{
                marginTop: moderateScale(20),
                marginBottom: moderateScale(10),
                marginLeft: moderateScale(6),
                fontSize: 15,
                color: "black",
              }}
            >
              Prescription
            </Text>
          </Form>
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

          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              disabled={this.state.updatebtnDisable}
              onPress={this.scheduleHandler}
              loading={btnState}
            >
              {"Order"}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  scheduleHandler = () => {
    const { frmSchedule, setState, saveSchedule, componentId } = this.props;

    // if (!this.state.isUpdate) {
    frmSchedule.times = this.state.timeData;
    // }
    const validateStatus = validate(medicineModel, { ...frmSchedule });
    setState({
      medicineModelError: validateStatus,
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
    const timeArray = [...this.state.timeData];
    timeArray.splice(keyIndex, 1);

    this.setState({
      timeData: timeArray,
    });
    // }
  };

  handleFieldChange = (name, value) => {
    const { onFieldChange } = this.props;
    onFieldChange({
      form: medicineModel.name,
      name,
      value,
    });

    if (this.state.isUpdate) {
      this.setState({
        updatebtnDisable: false,
      });
    }
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
    medicineModelError: state.app.medicineModelError,
    timeModelError: state.app.timeModelError,
  };
};

export const OrderMedicineContainer = connect(mapStateToProps, {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveSchedule,
})(OrderMedicine);

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
