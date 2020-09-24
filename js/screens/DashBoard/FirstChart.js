import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryGroup,
  VictoryTooltip,
  VictoryTheme,
} from "victory-native";
import _ from "lodash";
import { Card } from "react-native-elements";
import { moderateScale, normalize } from "util/sizes";

const data = {
  pending: [
    { userName: "Harshi", complaintCount: 20 },
    { userName: "Shan", complaintCount: 40 },
    { userName: "Lathangi", complaintCount: 60 },
    { userName: "Sumi", complaintCount: 20 },
  ],
  inProgress: [
    { userName: "Harshi", complaintCount: 20 },
    { userName: "Shan", complaintCount: 40 },
    { userName: "Lathangi", complaintCount: 60 },
    { userName: "Sumi", complaintCount: 20 },
  ],
  reOpen: [
    { userName: "Harshi", complaintCount: 20 },
    { userName: "Shan", complaintCount: 40 },
    { userName: "Lathangi", complaintCount: 60 },
    { userName: "Sumi", complaintCount: 20 },
  ],
  onHold: [
    { userName: "Harshi", complaintCount: 20 },
    { userName: "Shan", complaintCount: 40 },
    { userName: "Lathangi", complaintCount: 60 },
    { userName: "Sumi", complaintCount: 20 },
  ],
  completed: [
    { userName: "Harshi", complaintCount: 20 },
    { userName: "Shan", complaintCount: 40 },
    { userName: "Lathangi", complaintCount: 60 },
    { userName: "Sumi", complaintCount: 20 },
  ],
};

export default class FirstChart extends React.Component {
  state = {
    isProcessingData: true,
    chartData: [],
    formattedData: {},
  };

  render() {
    return (
      <Card
        title="STEPS BY WEEK"
        containerStyle={{
          marginTop: moderateScale(5),
          width: "95%",
          height: moderateScale(400),
        }}
      >
        <VictoryChart theme={VictoryTheme.material} domain={{ y: [0.5, 5.5] }}>
          <VictoryGroup
            horizontal
            offset={10}
            style={{ data: { width: 6 } }}
            colorScale={["brown", "tomato", "gold"]}
          >
            <VictoryBar
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 2 },
                { x: 5, y: 1 },
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 4 },
                { x: 4, y: 5 },
                { x: 5, y: 5 },
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
                { x: 5, y: 4 },
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </Card>
    );
  }
}

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
    height: Platform.OS === "android" ? 45 : 35,
  },
});
