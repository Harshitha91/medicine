import React from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { ComplainListItem } from "screens/components/ComplainListItem";
import styles from "styles/ui/active";
import Text from "components/ui/Text";
import debounce from "lodash/debounce";
import { Navigation } from "react-native-navigation";
import { moderateScale, verticalScale } from "util/sizes";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";

const ComplainListItems = withPreventDoubleClick(ComplainListItem);

export default class HistoryList extends React.Component {
  static defaultProps = {
    isFetching: false,
    loaderComplain: false,
    refreshing: false,
  };

  options = {
    page: 1,
    rows: DEFAULT_NUMBER_OF_ROWS,
  };

  constructor(props) {
    super(props);
    //This is temporary unused.
    this.dbounceItemClick = debounce(this.handleItemClick, 200);
  }

  componentDidMount() {
    const {
      getComplains,
      complainFilterString,
      name,
      setState,
      complainFilters,
    } = this.props;
  }

  componentWillUnmount() {
    this.props.clearComplains();
  }

  handleItemClick = (item) => {
    this.props.onItemClick(item);
  };

  renderFooter = () => {
    return this.props.isFetchingMoreComplains ? (
      <ActivityIndicator
        animating={true}
        style={true && { height: 80 }}
        size="large"
        color="#032DFF"
      />
    ) : null;
  };

  render() {
    let data = [
      {
        id: "3423434",
        date: "2020-01-20",
        medicines: [
          { name: "Panadol", count: 2 },
          { name: "Vitamin C", count: 1 },
        ],
      },
      {
        id: "3423435",
        date: "2020-01-21",
        medicines: [
          { name: "Zitrazine", count: 1 },
          { name: "Vitamin C", count: 1 },
        ],
      },
    ];
    const {
      isFetching,
      toastMessage,
      name,
      refreshing,
      onRefresh,
      loaderComplain,
    } = this.props;
    return (
      <View style={[styles.wrapper, styles.tabContent]}>
        <View style={styles.wrapper}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 12 }}
            data={data}
            extraData={this.state}
            keyExtractor={(item) => item.complainsId}
            renderItem={({ item }) => (
              <ComplainListItems
                data={item}
                toastMessage={toastMessage}
                onPress={() => this.handleItemClick(item)}
                name={name}
              />
            )}
            refreshing={false}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }

  handleRefresh = (props) => {
    const {
      setState,
      getComplains,
      name,
      complainFilterString,
      complainFilters,
    } = this.props;
    setState({ refreshing: true });
    getComplains(complainFilterString, name, this.options, complainFilters);
  };

  handleLoadMore = () => {
    const {
      data,
      getComplains,
      isFetchingMoreComplains,
      setState,
      complainFilterString,
      name,
      complainFilters,
    } = this.props;
    if (data.length >= DEFAULT_NUMBER_OF_ROWS && !isFetchingMoreComplains) {
      setState({
        isFetchingMoreComplains: true,
      });
      const options = {
        page: this.options.page + 1,
        rows: DEFAULT_NUMBER_OF_ROWS,
      };
      getComplains(complainFilterString, name, options, complainFilters);
      this.options = options;
    }
  };
}

const imageStyles = StyleSheet.create({
  userImg: {
    marginTop: verticalScale(100),
    width: moderateScale(235),
    height: verticalScale(119),
    marginBottom: verticalScale(50),
    flex: 1,
  },
  baseText: {
    fontSize: 20,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(20),
    color: "black",
    textAlign: "center",
  },
  titleText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  logo: {
    marginTop: verticalScale(17),
    width: moderateScale(190),
    height: verticalScale(60),
  },
  labelArea: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
