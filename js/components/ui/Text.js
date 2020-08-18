// @flow
import * as React from "react";
import { Text } from "react-native";
import styles from "styles/font";

type Props = {
  type: string,
  numberOfLines: number,
  children: any,
  style?: any,
  onPress: Function
};

const RobotoText = (props: Props) => {
  const textStyle = [styles[props.type], props.style];

  return <Text numberOfLines={props.numberOfLines} onPress={props.onPress} style={textStyle}>{props.children}</Text>;
};

RobotoText.defaultProps = {
  type: "regular",
  onPress: null,
  numberOfLines: null
};

export default RobotoText;
