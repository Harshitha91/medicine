// @flow
import * as React from "react";
import Ionicons from "react-native-vector-icons/FontAwesome5";

type Props = {
  name?: string,
  size: number,
  color: string
};

const Icon = (props: Props) => (
  <Ionicons
    name={props.name}
    size={props.size}
    color={props.color}
    {...props}
  />
);

Icon.defaultProps = {
  size: 20,
  color: "#FFF"
};

export default Icon;
