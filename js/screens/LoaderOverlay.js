// @flow
import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { readNotification } from "actions";

export default class LoaderOverlay extends Component {
  componentDidMount() {
    this.props.readNotification(this.props.componentId, this.props.data);
  }

  render() {
    return (
      <View style={{ flex: 1, height: "100%", marginTop: 200 }}>
        <ActivityIndicator
          animating={true}
          style={{ height: 80 }}
          size="large"
          color="#00adf5"
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
export const LoaderOverlayContainer = connect(mapStateToProps, {
  readNotification,
})(LoaderOverlay);
