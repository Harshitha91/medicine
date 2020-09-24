import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";
import {
  VictoryPortal,
  VictoryChart,
  VictoryStack,
  VictoryGroup,
  VictoryArea,
  VictoryScatter,
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
        title="COMPLAINTS COUNT BY USER"
        containerStyle={{
          marginTop: moderateScale(5),
          width: "95%",
          height: moderateScale(400),
        }}
      >
        <VictoryChart scale={{ x: "time" }} width={400} height={400}>
          <VictoryStack colorScale="warm">
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 2 },
                { x: new Date(1996, 1, 1), y: 3 },
                { x: new Date(2006, 1, 1), y: 5 },
                { x: new Date(2016, 1, 1), y: 4 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 4 },
                { x: new Date(1996, 1, 1), y: 3 },
                { x: new Date(2006, 1, 1), y: 2 },
                { x: new Date(2016, 1, 1), y: 5 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 3 },
                { x: new Date(1996, 1, 1), y: 1 },
                { x: new Date(2006, 1, 1), y: 4 },
                { x: new Date(2016, 1, 1), y: 2 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
          </VictoryStack>
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
