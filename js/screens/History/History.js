import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { setState } from "actions";
import { SearchBar } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "util/sizes";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import Tabs from "components/ui/Tabs";
import HistoryList from "./HistoryList";
import DropdownAlert from "react-native-dropdownalert";
import debounce from "lodash/debounce";
import _ from "lodash";

export default class History extends React.Component {
  static defaultProps = {
    isFetching: false,
    selectedTabIndex: 0,
    sessionObject: {},
    complains: [],
    refreshing: true,
    loaderComplain: true,
    isFetchingMoreComplains: false,
    complainFilterString: "",
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toastMessage !== this.props.toastMessage) {
      this.dropdown.alertWithType(
        nextProps.toastMessage.status,
        nextProps.toastMessage.header,
        nextProps.toastMessage.details
      );
    }
  }

  componentDidMount() {}

  render() {
    const {
      complains,
      toastMessage,
      refreshing,
      loaderComplain,
      getComplains,
      clearComplains,
      allComplainsCount,
      setState,
      isFetchingMoreComplains,
      complainFilterString,
      complainFilters,
    } = this.props;

    return (
      <View style={styles.containerStyle}>
        {/* <Tabs
            onPressTabItem={this.onPressTabItem}
            selectedTabIndex={selectedTabIndex}
            complains={complains}
            style={{ marginTop: 56 }}
          > */}
        <HistoryList
          name={"All"}
          onItemClick={() => {}}
          data={complains}
          count={allComplainsCount}
          toastMessage={toastMessage}
          refreshing={refreshing}
          loaderComplain={loaderComplain}
          complainFilterString={complainFilterString}
          getComplains={getComplains}
          clearComplains={clearComplains}
          setState={setState}
          isFetchingMoreComplains={isFetchingMoreComplains}
          complainFilters={complainFilters}
        />

        {/* </Tabs> */}
        <DropdownAlert ref={(ref) => (this.dropdown = ref)} showCancel={true} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionObject: state.app.sessionObject,
    complainFilterString: state.app.complainFilterString,
    toastMessage: state.app.toastMessage,
    selectedTabIndex: state.app.selectedTabIndex,
    refreshing: state.app.refreshing,
    loaderComplain: state.app.loaderComplain,
    allComplainsCount: state.app.allComplainsCount,
    pendingComplainsCount: state.app.pendingComplainsCount,
    currentComplainsCount: state.app.currentComplainsCount,
    completedComplainsCount: state.app.completedComplainsCount,
    isFetchingMoreComplains: state.app.isFetchingMoreComplains,
    complainFilters: state.complainFilters,
  };
};
export const HistoryContainer = connect(mapStateToProps, {
  setState,
})(History);

let styles;
if (Platform.OS === "android") {
  styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      marginTop: 10,
      backgroundColor: "#FFFFFF",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    search: {
      borderRadius: 40,
      elevation: 2,
      marginLeft: "4.5%",
      marginRight: "4.5%",
      marginTop: 10,
      height: 42,
    },
  });
} else if (Platform.OS === "ios") {
  styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      marginTop: 10,
      backgroundColor: "#FFFFFF",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    search: {
      backgroundColor: "#FFFFFF",
      marginLeft: "2%",
      marginRight: "2%",
    },
    searchInput: {
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: "#FFFFFF",
      borderRadius: 40,
      marginTop: -8,
      height: 42,
    },
  });
}
