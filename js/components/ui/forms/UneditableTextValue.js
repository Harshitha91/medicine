// @flow
import React, { Component } from "react";
import { Text } from "react-native";
import { isUndefined } from "util/core";
import styles from "styles/font";


export default class UneditableTextValue extends Component {
    static defaultProps = {
        schema: {},
        form: { name: "", data: {} }
    };
    
    render() {
        const { schema, form, style } = this.props;

        const value = (isUndefined(form.data[schema.name])) ? '-' :  form.data[schema.name];

        const textStyle = [styles['string'], style];
        return <Text style={textStyle}>{schema.label} : {value}</Text>;
    }
}
