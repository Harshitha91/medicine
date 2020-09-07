import { Navigation } from "react-native-navigation";
import { moderateScale } from "../util/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";

export const navigate = (componentId, name, props = {}, label = "") => {
  Navigation.push(componentId, {
    component: {
      name,
      passProps: {
        data: props,
      },
      options: {
        topBar: {
          visible: true,
          height: moderateScale(55),
          topMargin: 15,
          borderHeight: 0,
          elevation: 0,
          title: {
            alignment: "center",
            text: label,
            fontSize: 25,
            fontFamily: "Ubuntu-Bold",
          },
          background: {
            color: "#FFFFFF",
          },
        },
      },
    },
  });
};

export const navigateWithCustomBackBtn = async (
  componentId,
  name,
  props = {},
  label = ""
) => {
  const backIcon = await Icon.getImageSource("arrow-back", 24, "#000");
  Navigation.push(componentId, {
    component: {
      name,
      passProps: {
        data: props,
        fromNotification: true,
      },
      options: {
        topBar: {
          visible: true,
          height: moderateScale(55),
          topMargin: 15,
          borderHeight: 0,
          elevation: 0,
          title: {
            alignment: "center",
            text: label,
            fontSize: 25,
            fontFamily: "Ubuntu-Bold",
          },
          background: {
            color: "#FFFFFF",
          },
          leftButtons: [
            {
              id: "backButton",
              icon: backIcon,
            },
          ],
        },
      },
    },
  });
};

export const goToSignIn = async () =>
  await Navigation.setRoot({
    root: {
      stack: {
        id: "authSignIn",
        children: [
          {
            component: {
              id: "signIn",
              name: "SignIn",
              options: {
                layout: {
                  backgroundColor: "white",
                },
                topBar: {
                  visible: false,
                  height: 0,
                },
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In",
                  icon: require("images/signin.png"),
                },
              },
            },
          },
        ],
      },
    },
  });

export const goToSignUp = async () =>
  await Navigation.setRoot({
    root: {
      stack: {
        id: "authSignUp",
        children: [
          {
            component: {
              id: "signUp",
              name: "SignUp",
              options: {
                topBar: {
                  visible: false,
                  height: 0,
                },
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In",
                  icon: require("images/signin.png"),
                },
              },
            },
          },
        ],
      },
    },
  });

export const goHome = async (currentTabIndex = 0) =>
  await Navigation.setRoot({
    root: {
      ////////////////////////////
      sideMenu: {
        id: "sideMenu",
        left: {
          component: {
            id: "Drawer",
            name: "Slider",
          },
        },
        ////////////////////////////
        center: {
          stack: {
            id: "CenterStack",
            children: [
              {
                bottomTabs: {
                  children: [
                    {
                      stack: {
                        id: "scheduleHistory",
                        children: [
                          {
                            component: {
                              id: "scheduleHistoryComponent",
                              name: "ScheduleHistory",
                              borderColor: "red",
                              options: {
                                layout: {
                                  backgroundColor: "white",
                                },
                                topBar: {
                                  visible: true,
                                  height: 55,
                                  topMargin: 15,
                                  borderHeight: 0.5,
                                  elevation: 0,
                                  title: {
                                    alignment: "center",
                                    text: "Schedule History",
                                    fontSize: 25,
                                    fontFamily: "Ubuntu-Bold",
                                  },
                                  background: {
                                    color: "#FFFFFF",
                                  },
                                },
                              },
                            },
                          },
                        ],
                        options: {
                          bottomTab: {
                            text: "Schedule History",
                            icon: require("images/complain.png"),
                            selectedIconColor: "#032DFF",
                          },
                        },
                      },
                    },
                    {
                      stack: {
                        id: "home",
                        children: [
                          {
                            component: {
                              id: "homeComponent",
                              name: "Home",
                              options: {
                                topBar: {
                                  visible: true,
                                  height: 55,
                                  topMargin: 15,
                                  borderHeight: 0.5,
                                  elevation: 0,
                                  title: {
                                    alignment: "center",
                                    text: "Home",
                                    fontSize: 25,
                                    fontFamily: "Ubuntu-Bold",
                                  },
                                  background: {
                                    color: "#FFFFFF",
                                  },
                                },
                              },
                            },
                          },
                        ],
                        options: {
                          bottomTab: {
                            text: "Home",
                            icon: require("images/property.png"),
                            selectedIconColor: "#032DFF",
                          },
                        },
                      },
                    },
                    {
                      stack: {
                        id: "medicine",
                        children: [
                          {
                            component: {
                              id: "medicineComponent",
                              name: "MedicineList",
                              borderColor: "red",
                              options: {
                                layout: {
                                  backgroundColor: "white",
                                },
                                topBar: {
                                  visible: true,
                                  height: 55,
                                  topMargin: 15,
                                  borderHeight: 0.5,
                                  elevation: 0,
                                  title: {
                                    alignment: "center",
                                    text: "Medicine Inventory",
                                    fontSize: 25,
                                    fontFamily: "Ubuntu-Bold",
                                  },
                                  background: {
                                    color: "#FFFFFF",
                                  },
                                },
                              },
                            },
                          },
                        ],
                        options: {
                          bottomTab: {
                            text: "Medicine",
                            icon: require("images/complain.png"),
                            selectedIconColor: "#032DFF",
                          },
                        },
                      },
                    },
                    {
                      stack: {
                        id: "profile",
                        children: [
                          {
                            component: {
                              id: "userProfile",
                              name: "UserProfile",
                              options: {
                                topBar: {
                                  visible: true,
                                  height: 55,
                                  topMargin: 15,
                                  borderHeight: 0.5,
                                  elevation: 0,
                                  title: {
                                    alignment: "center",
                                    text: "User Profile",
                                    fontSize: 25,
                                    fontFamily: "Ubuntu-Bold",
                                  },
                                  background: {
                                    color: "#FFFFFF",
                                  },
                                },
                              },
                            },
                          },
                        ],
                        options: {
                          bottomTab: {
                            text: "Profile",
                            icon: require("images/more_horiz.png"),
                            selectedIconColor: "#032DFF",
                          },
                        },
                      },
                    },
                    // {
                    //   stack: {
                    //     id: "notifications",
                    //     children: [
                    //       {
                    //         component: {
                    //           id: "notificationsComponent",
                    //           name: "Notifications",
                    //           options: {
                    //             topBar: {
                    //               visible: true,
                    //               height: 75,
                    //               topMargin: 20,
                    //               borderHeight: 0,
                    //               elevation: 0,
                    //               title: {
                    //                 alignment: "center",
                    //                 text: "Notifications",
                    //                 fontSize: 25,
                    //                 fontFamily: "Ubuntu-Bold",
                    //               },
                    //             },
                    //           },
                    //         },
                    //       },
                    //     ],
                    //     options: {
                    //       bottomTab:
                    //         Platform.OS === "android"
                    //           ? {
                    //               text: "Notifications",
                    //               icon: require("images/ic_notifications.png"),
                    //               selectedIconColor: "red",
                    //             }
                    //           : {
                    //               text: "Notifications",
                    //               icon: require("images/ic_notifications.png"),
                    //               selectedIconColor: "red",
                    //               iconInsets: {
                    //                 top: 0,
                    //                 left: 0,
                    //                 bottom: 0,
                    //                 right: 0,
                    //               },
                    //               disableIconTint: true,
                    //             },
                    //     },
                    //   },
                    // },
                  ],
                  options: {
                    bottomTabs: {
                      currentTabIndex,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
