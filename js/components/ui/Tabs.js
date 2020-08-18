// @flow
import React, { Component, Children, Fragment } from "react";
import { View } from "react-native";

import TabPane from "./TabPane";
import styles from "styles/ui/tabs";

class Tabs extends Component {
  render() {
    const { selectedTabIndex, children, onPressTabItem, style } = this.props;
    return (
      <Fragment>
        <View style={{...styles.tabContainer, ...style}}>
          {Children.map(children, (child, index) => {
            const { name, icon, count } = child.props;
            return (
              <TabPane
                key={index + name}
                index={index}
                label={name}
                icon={icon}
                count={count}
                selectedTabIndex={selectedTabIndex}
                onPressTab={onPressTabItem}
              />
            );
          })}
        </View>
        <Fragment>
          {Children.map(children, (child, index) => {
            if (
              this.props.selectedTabIndex === index
            ) {
              return React.cloneElement(child, {
                currentTabIndex: this.props.selectedTabIndex
              });
            }
          })}
        </Fragment>
      </Fragment>
    );
  }
}

export default Tabs;