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
} from "actions";
import propertyModel from "models/property.json";
import complainTypeModel from "models/complainType.json";
import { moderateScale, normalize } from "util/sizes";
import Form from "components/ui/forms/Form";
import InputField from "components/ui/forms/InputField";
import Buttons from "components/ui/Button";
import ImagePicker from "react-native-image-picker";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";

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
    frmProperty: {},
    frmComplainType: {},
    propertyModelError: {},
    isKeyboardShow: false,
    sessionObject: {},
    isVisibleComplainTypeModal: false,
    complainTypeModelError: {},
    country: [],
  };

  state = {
    complainTypeData: [],
    isMounted: false,
    isUpdate: false,
    pickedImage: null,
    imgData: null,
    updatebtnDisable: false,
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

  reset = () => {
    this.setState({
      pickedImage: null,
      imgData: null,
    });
  };

  componentDidMount() {
    const { data, setFormFields } = this.props;
    if (data) {
      setFormFields({
        name: propertyModel.name,
        value: data,
      });

      // getComplainTypes(data.propertyId);

      this.setState({
        isUpdate: true,
        imgData: data.imageData,
        pickedImage: data.imageData,
        updatebtnDisable: true,
      });

      // if(data.complainTypes) {
      //   this.setState({
      //     complainTypeData: data.complainTypes
      //   });
      // }
    }
  }

  componentWillUnmount() {
    const { resetForm, setState } = this.props;
    resetForm("property");
    setState({
      propertyModelError: {},
      country: [],
    });
  }

  render() {
    const {
      frmProperty,
      propertyModelError,
      complainTypeModelError,
      frmComplainType,
      isVisibleComplainTypeModal,
      setState,
      complainTypes,
      btnState,
      country,
    } = this.props;

    const propertyFields = propertyModel.fields;
    const formData = {
      name: propertyModel.name,
      data: frmProperty,
    };
    let countryList = [];
    country.forEach((item) => {
      countryList.push({ id: item.name, name: item.name });
    });
    const buttonLabel = this.state.isUpdate ? "Update Facility" : "Add";

    let types = [
      { value: 3, label: "High" },
      { value: 2, label: "Medium" },
      { value: 1, label: "Low" },
    ];

    return (
      <View style={styles.containerStyle}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.formContainer}
        >
          <Form form={formData}>
            <InputField
              data={types}
              style={styles.dropdown}
              schema={propertyFields.type}
              onChange={this.handleFieldChange}
              error={propertyModelError}
            />
            <InputField
              data={types}
              style={styles.dropdown}
              schema={propertyFields.type}
              onChange={this.handleFieldChange}
              error={propertyModelError}
            />
            <InputField
              schema={propertyFields.description}
              placeholder={"Description"}
              multiline={true}
              numberOfLines={3}
              onChange={this.handleFieldChange}
              error={propertyModelError}
            />
            <InputField
              data={types}
              style={styles.dropdown}
              schema={propertyFields.type}
              onChange={this.handleFieldChange}
              error={propertyModelError}
            />
            <InputField
              data={types}
              style={styles.dropdown}
              schema={propertyFields.type}
              onChange={this.handleFieldChange}
              error={propertyModelError}
            />
          </Form>
          <View style={styles.buttonSection}>
            <Button
              style={styles.rcsButton}
              disabled={this.state.updatebtnDisable}
              onPress={this.propertyHandler}
              loading={btnState}
            >
              {buttonLabel}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  handleFieldChange = (name, value) => {
    const { onFieldChange } = this.props;
    if (name == "country") {
      let countryName = value.name ? value.name : value;
      onFieldChange({
        form: propertyModel.name,
        name,
        value: Platform.OS === "android" ? countryName : value.Name,
      });
    } else {
      onFieldChange({
        form: propertyModel.name,
        name,
        value,
      });
    }

    if (this.state.isUpdate) {
      this.setState({
        updatebtnDisable: false,
      });
    }
  };

  handleComplainTypeModalFieldChange = (name, value) => {
    const { onFieldChange, complainTypes } = this.props;
    onFieldChange({
      form: complainTypeModel.name,
      name,
      value,
    });
    if (complainTypes.length == 0) {
      this.setState({
        updatebtnDisable: false,
      });
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    btnState: state.app.btnState,
    frmProperty: state.form.property,
    frmComplainType: state.form.complainType,
    sessionObject: state.app.sessionObject,
    isVisibleComplainTypeModal: state.app.isVisibleComplainTypeModal,
    propertyModelError: state.app.propertyModelError,
    complainTypeModelError: state.app.complainTypeModelError,
    userProperties: state.app.userProperties,
    country: state.app.country,
  };
};

export const OrderMedicineContainer = connect(mapStateToProps, {
  setState,
  setFormFields,
  onFieldChange,
  resetForm,
  resetUpdateFormFields,
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
    backgroundColor: "#ff2020",
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
