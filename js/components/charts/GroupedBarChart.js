import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryZoomContainer, VictoryTooltip, VictoryLegend } from "victory-native";
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { moderateScale, normalize } from "util/sizes";

export default class GroupedBarChart extends React.Component {

    state = {
        propertyId:''
    }

    render() {
        const {
          data
        } = this.props;
    
        return (
                    <VictoryChart width={350} domainPadding={20}
                        containerComponent={
                        <VictoryZoomContainer allowZoom={false} zoomDomain={{x: [0, 4]}}/>
                        }
                    >
                        <VictoryGroup 
                            offset={20}
                            colorScale={"qualitative"}
                        >
                            <VictoryBar
                                data={data.completed} x="xAxisData" y="complaintCount"
                                style={{
                                    data: {
                                        fill: "#69C31D",
                                        width: 20
                                    }
                                }}
                            />
                            <VictoryBar
                                data={data.reOpen} x="xAxisData" y="complaintCount"
                                style={{
                                    data: {
                                        fill: "#FACF10",
                                        width: 20
                                    }
                                }}
                            />
                        </VictoryGroup>
                    </VictoryChart>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    },
    formContainer: {
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      paddingTop: moderateScale(15),
      paddingBottom: moderateScale(10),
      paddingLeft: moderateScale(8),
      paddingRight: moderateScale(16),
      backgroundColor: '#FFFFFF' // TODO: need to check with bigger screen
    },
    pickerStyles: {
      borderWidth: 1,
      borderRadius: moderateScale(5),
      borderColor: '#000000',
      height:35
    },
  });
