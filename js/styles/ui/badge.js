// @flow
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  successBadge: {
    borderWidth: 1,
  },
  successText: {
    color: 'rgb(255,255,255)'
  },
  errorBadge: {
    backgroundColor: 'rgb(239,239,239)',
    borderColor: 'rgb(112,112,112)',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:25
  },
  errorText: {
    color: '#9c9797'
  },
  warningBadge: {
    backgroundColor: '#FEDDCA',
    borderColor: 'rgb(255,240,240)',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:25
  },
  warningText: {
    color: '#F0361D'
  },
  creatorBadge: {
    backgroundColor: '#FEDDCA',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:25
  },
  creatorText: {
    color: '#000000'
  },
  defaultBadge: {
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:25
  },
  defaultText: {
    color: '#000'
  }
});

export default styles;
