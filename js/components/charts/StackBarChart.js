import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryZoomContainer, VictoryTooltip, VictoryLegend , VictoryAxis} from "victory-native";
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { moderateScale, normalize } from "util/sizes";

export default class StackBarChart extends React.Component {

    state = {
        propertyId: ''
    }

    render() {
        const {
            data
        } = this.props;

        return (
            <VictoryChart width={350} domainPadding={20}
                containerComponent={
                    <VictoryZoomContainer allowZoom={false} zoomDomain={{ x: [0, 5] }} />
                }
            >
                <VictoryLegend y={-8}
                    orientation="horizontal"
                    gutter={20}
                    rowGutter={-8}
                    itemsPerRow={3}
                    data={[
                        { name: "Pending", symbol: { fill: "#FFA726" } },
                        { name: "In Progress", symbol: { fill: "#20C7EF" } },
                        { name: "Re-Open", symbol: { fill: "#FACF10" } },
                        { name: "OnHold", symbol: { fill: "#D57350" } },
                        { name: "Completed", symbol: { fill: "#69C31D" } }
                    ]}
                />
                <VictoryAxis
                    crossAxis
                />
                <VictoryAxis dependentAxis crossAxis
                    tickFormat={t => Math.round(t) !== t ? undefined : t}
                    minDomain={{ y: 0 }}
                />
                <VictoryStack
                    colorScale={["#FFA726", "#20C7EF", "#FACF10", "#D57350", "#69C31D"]}
                >
                    <VictoryBar
                        data={data.pending} x="userName" y="complaintCount" labels={() => "pending"}
                        style={{
                            data: {
                                width: 20
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip />
                        }
                    />
                    <VictoryBar
                        data={data.inProgress} x="userName" y="complaintCount" labels={() => "in progress"}
                        style={{
                            data: {
                                width: 20
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip />
                        }
                    />
                    <VictoryBar
                        data={data.reOpen} x="userName" y="complaintCount" labels={() => "reopen"}
                        style={{
                            data: {
                                width: 20
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip />
                        }
                    />
                    <VictoryBar
                        data={data.onHold} x="userName" y="complaintCount" labels={() => "onHold"}
                        style={{
                            data: {
                                width: 20
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip />
                        }
                    />
                    <VictoryBar
                        data={data.completed} x="userName" y="complaintCount" labels={() => "completed"}
                        style={{
                            data: {
                                width: 20
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip />
                        }
                    />
                </VictoryStack>
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
        height: 35
    },
});
