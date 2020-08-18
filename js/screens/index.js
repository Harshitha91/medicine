import React from "react";
import { Navigation } from "react-native-navigation";
import { InitializingContainer } from "./Initializing";
import { SignInContainer } from "./Auth/SignIn";
import { SignUpContainer } from "./Auth/SignUp";
import { UserProfileContainer } from "./User/UserProfile";
import { UpdateUserContainer } from "./User/UpdateUser";
import { UserManagementContainer } from "./User/UserManagement";
import InAppNotification from "./InAppNotification";
import { HistoryContainer } from "./History/History";
import { HomeContainer } from "./Home";
import { AddMedicineContainer } from "./Home/AddMedicine";
import { LoaderOverlayContainer } from "./LoaderOverlay";

export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    "Initializing",
    () => (props) => (
      <Provider store={store}>
        <InitializingContainer {...props} />
      </Provider>
    ),
    () => InitializingContainer
  );
  Navigation.registerComponent(
    "SignIn",
    () => (props) => (
      <Provider store={store}>
        <SignInContainer {...props} />
      </Provider>
    ),
    () => SignInContainer
  );
  Navigation.registerComponent(
    "SignUp",
    () => (props) => (
      <Provider store={store}>
        <SignUpContainer {...props} />
      </Provider>
    ),
    () => SignUpContainer
  );
  Navigation.registerComponent(
    "InAppNotification",
    () => (props) => (
      <Provider store={store}>
        <InAppNotification {...props} />
      </Provider>
    ),
    () => InAppNotification
  );
  Navigation.registerComponent(
    "History",
    () => (props) => (
      <Provider store={store}>
        <HistoryContainer {...props} />
      </Provider>
    ),
    () => HistoryContainer
  );
  Navigation.registerComponent(
    "Home",
    () => (props) => (
      <Provider store={store}>
        <HomeContainer {...props} />
      </Provider>
    ),
    () => HomeContainer
  );
  Navigation.registerComponent(
    "UserProfile",
    () => (props) => (
      <Provider store={store}>
        <UserProfileContainer {...props} />
      </Provider>
    ),
    () => UserProfileContainer
  );
  Navigation.registerComponent(
    "UpdateUser",
    () => (props) => (
      <Provider store={store}>
        <UpdateUserContainer {...props} />
      </Provider>
    ),
    () => UpdateUserContainer
  );
  Navigation.registerComponent(
    "UserManagement",
    () => (props) => (
      <Provider store={store}>
        <UserManagementContainer {...props} />
      </Provider>
    ),
    () => UserManagementContainer
  );
  Navigation.registerComponent(
    "AddMedicine",
    () => (props) => (
      <Provider store={store}>
        <AddMedicineContainer {...props} />
      </Provider>
    ),
    () => AddMedicineContainer
  );
  Navigation.registerComponent(
    "LoaderOverlay",
    () => (props) => (
      <Provider store={store}>
        <LoaderOverlayContainer {...props} />
      </Provider>
    ),
    () => LoaderOverlayContainer
  );
}
