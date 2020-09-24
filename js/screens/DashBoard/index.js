import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { pushComplainTypeScreen } from "../navigation";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Navigation } from "react-native-navigation";
import { PropertyListItem } from "../components/PropertyListItem";
import CallButton from "components/ui/CallButton";
import { CheckBox } from "react-native-elements";
import { moderateScale } from "util/sizes";
import withPreventDoubleClick from "../components/PreventDoubleClick";
import moment from "moment";
import { setState, getScheduleCalandar, updateTakenStatus } from "actions";
import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
const window = Dimensions.get("window");
const { height, width } = window;

export default class DashBoard extends React.Component {
  static defaultProps = {
    refreshing: false,
    sessionObject: {},
    data: [],
    loading: false,
  };
  state = {
    filterString: "",
    selectedDate: "",
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {}

  handleRefresh(props) {
    const { setState, getProperties } = props;
    setState({ refreshing: true });
    getProperties();
    this.handleSearchInputChange("");
  }

  render() {
    const { refreshing, properties, loaderProperty, data } = this.props;
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ", data);

    let formatedCurrentDate = moment(new Date()).format("YYYY-MM-DD");

    return (
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FirstChart />
        {/* <SecondChart /> */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionObject: state.app.sessionObject,
    refreshing: state.app.refreshing,
    loaderProperty: state.app.loaderProperty,
    data: state.home.data,
    loading: state.home.loading,
  };
};
export const DashBoardContainer = connect(mapStateToProps, {
  setState,
  getScheduleCalandar,
  updateTakenStatus,
})(DashBoard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
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
  pickerStyles: {
    borderWidth: 1,
    borderRadius: moderateScale(5),
    borderColor: "#000000",
    height: 35,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
