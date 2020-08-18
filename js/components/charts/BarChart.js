import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, createContainer } from "victory-native";
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { moderateScale, normalize } from "util/sizes";

export default class BarChart extends React.Component {

    state = {
        propertyId: ''
    }

    render() {
        const {
            data
        } = this.props;
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

        return (
            <VictoryChart domainPadding={20}
                containerComponent={
                    <VictoryZoomVoronoiContainer
                        voronoiDimension="x"
                        labels={({ datum }) => `${datum.xAxisData}, ${datum.complaintCount}`}
                        allowZoom={false} zoomDomain={{ x: [0, 5] }}
                    />}
                
            >
                <VictoryAxis
                    crossAxis
                />
                <VictoryAxis dependentAxis crossAxis
                    tickFormat={t => Math.round(t) !== t ? undefined : t}
                    minDomain={{ y: 0 }}
                />
                <VictoryBar
                    data={data} x="xAxisData" y="complaintCount"
                    style={{
                        data: {
                            fill: "#20C7EF",
                            width: 20
                        }
                    }}
                />
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
