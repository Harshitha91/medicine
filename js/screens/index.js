import React from "react";
import { Navigation } from "react-native-navigation";
import { InitializingContainer } from "./Initializing";
import { SignInContainer } from "./Auth/SignIn";
import { SignUpContainer } from "./Auth/SignUp";
import { UserProfileContainer } from "./User/UserProfile";
import { UpdateUserContainer } from "./User/UpdateUser";
import { SliderContainer } from "./Slider";
import InAppNotification from "./InAppNotification";
import { ScheduleHistoryContainer } from "./Schedule/ScheduleHistory";
import { HomeContainer } from "./Home";
import { MedicineListContainer } from "./Medicine/MedicineList";
import { AddMedicineContainer } from "./Medicine/AddMedicine";
import { OrderMedicineContainer } from "./Medicine/OrderMedicine";
import { DoctorAppointmentsListContainer } from "./Doctor/DoctorAppointmentsList";
import { MakeDoctorAppointmentContainer } from "./Doctor/MakeDoctorAppointment";
import { LabAppointmentsListContainer } from "./Lab/LabAppointmentsList";
import { MakeLabAppointmentContainer } from "./Lab/MakeLabAppointment";
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
    "ScheduleHistory",
    () => (props) => (
      <Provider store={store}>
        <ScheduleHistoryContainer {...props} />
      </Provider>
    ),
    () => ScheduleHistoryContainer
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
    "Slider",
    () => (props) => (
      <Provider store={store}>
        <SliderContainer {...props} />
      </Provider>
    ),
    () => SliderContainer
  );
  Navigation.registerComponent(
    "MedicineList",
    () => (props) => (
      <Provider store={store}>
        <MedicineListContainer {...props} />
      </Provider>
    ),
    () => MedicineListContainer
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
    "OrderMedicine",
    () => (props) => (
      <Provider store={store}>
        <OrderMedicineContainer {...props} />
      </Provider>
    ),
    () => OrderMedicineContainer
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
  Navigation.registerComponent(
    "DoctorAppointmentsList",
    () => (props) => (
      <Provider store={store}>
        <DoctorAppointmentsListContainer {...props} />
      </Provider>
    ),
    () => DoctorAppointmentsListContainer
  );
  Navigation.registerComponent(
    "MakeDoctorAppointment",
    () => (props) => (
      <Provider store={store}>
        <MakeDoctorAppointmentContainer {...props} />
      </Provider>
    ),
    () => MakeDoctorAppointmentContainer
  );
  Navigation.registerComponent(
    "LabAppointmentsList",
    () => (props) => (
      <Provider store={store}>
        <LabAppointmentsListContainer {...props} />
      </Provider>
    ),
    () => LabAppointmentsListContainer
  );
  Navigation.registerComponent(
    "MakeLabAppointment",
    () => (props) => (
      <Provider store={store}>
        <MakeLabAppointmentContainer {...props} />
      </Provider>
    ),
    () => MakeLabAppointmentContainer
  );
}
