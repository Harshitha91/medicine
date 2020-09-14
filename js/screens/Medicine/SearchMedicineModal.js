import React, { Component } from "react";
import {
  Modal,
  Text,
  Image,
  TouchableHighlight,
  View,
  Keyboard,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
export class SearchMedicineModal extends Component {
  constructor(props) {
    super(props);
    this._inputType = props.inputType;
    this._title = props.title;
    this.arrayObject = props.arrayObjects;
    this.previousItem = null;
    this.selectedItem = null;
    this.state = {
      refreshList: false,
      filterredArray: [],
      selectedItem: null,
      selectedItemId: null,
      page: 1,
      totalPages: 1,
      filterString: "",
    };
  }

  componentDidMount() {
    this.setState({
      selectedItemId: this.props.value,
    });
  }

  onModalShow = () => {
    this.setState({
      selectedItemId: this.props.value,
    });
  };

  returnFieldTextFromEachItem(item) {
    switch (this.props.inputType) {
      case "Service":
        return item.name;
      case "Service Category":
        return item.name;
      default:
        return item.name;
    }
  }

  onChangeText_Search = (text) => {
    this.setState({ filterString: text });
    this.props.filterValues(text);
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", item);
          this.props.onClick(item);
        }}
        activeOpacity={0.8}
        style={styles.radioButton}
      >
        <Text style={[styles.textStyle]}>{item.medicine_name}</Text>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return this.props.isLoadingMore ? (
      <ActivityIndicator
        animating={true}
        style={true && { height: 80 }}
        size="large"
      />
    ) : null;
  };

  renderFlatList = () => {
    // if (this.props.arrayObjects && this.props.arrayObjects.length > 0) {
    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode={"interactive"}
        data={this.props.arrayObjects}
        extraData={this.props.arrayObjects}
        renderItem={this.renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        removeClippedSubviews={true}
        onScroll={(e) => {
          Keyboard.dismiss();
        }}
      />
    );
    // } else {
    //     return (
    //         <NoDataText />
    //     );
    // }
  };

  renderNoData = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 100,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 25,
            color: "#636c72",
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          No Data {"\n"}Available
        </Text>
      </View>
    );
  };

  onTapCancelButton = () => {
    this.props.cancelButton();
  };

  render() {
    const { visible, cancelButton, title, closeModal } = this.props;
    return (
      <Modal
        transparent
        animationType={"fade"}
        visible={visible}
        onShow={this.onModalShow}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.searchableDialogContentView}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>{title}</Text>
            </View>

            <View style={styles.searchContainer}>
              {/* <SearchBar
                margin={13}
                value={this.state.filterString}
                containHeight={40}
                placeholder={"Search"}
                onChangeText={(text) => {
                  this.onChangeText_Search(text);
                }}
              /> */}

              <SearchBar
                platform={Platform.OS}
                placeholder="Search Medicine"
                containerStyle={styles.search}
                inputStyle={{ marginTop: -2, height: 45 }}
                inputContainerStyle={{ marginTop: -8 }}
                onChangeText={this.onChangeText_Search}
                value={this.state.filterString}
                backIcon={{ name: "home" }}
                leftIconContainerStyle={{
                  backgroundColor: "#F5F5F5",
                  width: 30,
                  borderRadius: 50,
                  height: 30,
                }}
                rightIconContainerStyle={{ width: 30, height: 30 }}
              />
            </View>

            {this.props.arrayObjects && this.props.arrayObjects.length > 0 ? (
              <View style={styles.containerRadio}>{this.renderFlatList()}</View>
            ) : (
              this.renderNoData()
            )}

            <View style={styles.containerButtion}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={this.onTapCancelButton}
              >
                <Text style={styles.buttionText}> Cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7021a",
    padding: 100,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  containerRadio: {
    flex: 1,
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
  },
  searchContainer: {},

  radioButton: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 16,
    color: "#636c72",
    marginLeft: 0,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: 'row',
  },

  searchableDialogContentView: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  buttonCancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#032DFF",
    height: 44,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 22,
  },

  buttionText: {
    color: "white",
  },
  headerTextContainer: {
    backgroundColor: "#e9e9ea",
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    // flex: 1,
    height: 50,
    marginBottom: 15,
  },
  scrollViewCointainer: {
    flex: 1,
  },

  containerButtion: {
    flexDirection: "row", //////make all the children in order of row
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  NoDataView: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  textStyle: {
    // marginLeft: 10,
    fontSize: 14,
    textAlign: "center",
  },
  addNewCustomerTxt: {
    // marginLeft: 10,
    fontSize: 12,
    textAlign: "center",
  },
  AddNewCustomer: {
    height: 100,
    width: 200,
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 15,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: "#032DFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPlusIcon: {
    width: 20,
    height: 20,
    // marginBottom: 8,
    // borderRadius: 15
  },

  imageContainerView: {
    width: 40,
    height: 40,
    backgroundColor: "#032DFF",
    marginBottom: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
