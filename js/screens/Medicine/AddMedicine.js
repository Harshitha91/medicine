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
  saveMedicine,
  searchFilter,
} from "actions";
import medicineModel from "models/medicine.json";
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
import { SearchMedicineModal } from "./SearchMedicineModal";

const Button = withPreventDoubleClick(Buttons);

export default class AddMedicine extends React.Component {
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
    frmMedicine: {},
    frmTime: {},
    medicineModelError: {},
    isKeyboardShow: false,
    sessionObject: {},
    isVisibleTimeModal: false,
    timeModelError: {},
    filterData: [],
  };

  state = {
    timeData: [],
    isUpdate: false,
    pickedImage: null,
    imgData: null,
    updatebtnDisable: false,
    times: [],
    showSearchModal: false,
  };

  componentDidMount() {
    const { data, setState } = this.props;
    setState({ btnState: false });
    // if (data) {
    //   setFormFields({
    //     name: medicineModel.name,
    //     value: data,
    //   });

    //   this.setState({
    //     isUpdate: true,
    //     updatebtnDisable: true,
    //   });
    // }
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
      frmMedicine,
      medicineModelError,
      timeModelError,
      frmTime,
      isVisibleTimeModal,
      setState,
      time,
      btnState,
    } = this.props;

    const medicineFields = medicineModel.fields;
    const formData = {
      name: medicineModel.name,
      data: frmMedicine,
    };
    return (
      <View style={styles.containerStyle}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.formContainer}
        >
          <Form form={formData}>
            <InputField
              // data={[
              //   { id: "2424", value: "sfsdfsdf" },
              //   { id: "2425", value: "sfsdfsdf" },
              // ]}
              schema={medicineFields.medicine_name}
              placeholder={"Medicine"}
              onFocus={this.onFocusMedicine}
              onChange={this.handleFieldChange}
              error={medicineModelError}
            />
            <InputField
              schema={medicineFields.preferred_name}
              placeholder={"Preffered Name"}
              onChange={this.handleFieldChange}
              error={medicineModelError}
            />
            <InputField
              schema={medicineFields.count}
              placeholder={"No Of Pills"}
              onChange={this.handleFieldChange}
              error={medicineModelError}
            />
          </Form>

          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              disabled={this.state.updatebtnDisable}
              onPress={this.scheduleHandler}
              loading={btnState}
            >
              {"Add"}
            </Button>
          </View>
          <SearchMedicineModal
            title={"Search Medicine"}
            filterValues={this.filterValues}
            visible={this.state.showSearchModal}
            cancelButton={this.onTapCancelButton}
            onClick={this.onSelect}
            arrayObjects={this.props.filterData}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onSelect = (value) => {
    console.log(
      "PPPPPPPPLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
      value
    );
    const { onFieldChange } = this.props;
    onFieldChange({
      form: medicineModel.name,
      name: "medicine_name",
      value: value.medicine_name,
    });
    onFieldChange({
      form: medicineModel.name,
      name: "medicine_stength",
      value: value.medicine_stength,
    });
    this.setState({ showSearchModal: false });
  };

  filterValues = (text) => {
    this.props.searchFilter(text);
  };

  onTapCancelButton = () => {
    this.setState({ showSearchModal: false });
  };

  onFocusMedicine = () => {
    this.setState({ showSearchModal: true });
  };

  scheduleHandler = () => {
    const { frmMedicine, setState, saveMedicine, componentId } = this.props;

    const validateStatus = validate(medicineModel, { ...frmMedicine });
    setState({
      medicineModelError: validateStatus,
    });

    if (isEmpty(validateStatus)) {
      setState({ btnState: true });
      saveMedicine(frmMedicine, componentId);
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    frmMedicine: state.form.medicine,
    sessionObject: state.app.sessionObject,
    isVisibleTimeModal: state.app.isVisibleTimeModal,
    medicineModelError: state.app.medicineModelError,
    filterData: state.app.filterData,
  };
};

export const AddMedicineContainer = connect(mapStateToProps, {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
  saveMedicine,
  searchFilter,
})(AddMedicine);

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
