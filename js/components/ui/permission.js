//@flow
import React, { Fragment } from "react";
import { View } from "react-native";
import { hasPermission } from "util/core";
type Props = {
  userPermissions: Object,
  allowedPermissionKey: string,
  children: Object
};

export const AccessControl = (props: Props) => {
  const { userPermissions, allowedPermissionKey } = props;
  const isPermitted = hasPermission(userPermissions, allowedPermissionKey);
  if (!isPermitted) return <View />;
  return <Fragment>{props.children}</Fragment>;
};
