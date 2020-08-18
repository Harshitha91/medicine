import { Navigation } from 'react-native-navigation';
import { moderateScale } from "util/sizes";


export const showInAppNotification = (notificationType, notificationMessage, autoDismissTimerSec ) => {
    Navigation.showOverlay({
        component: {
          name: 'InAppNotification',
          passProps: {
            notificationType,
            notificationMessage,
            autoDismissTimerSec
          },
          options: {
            overlay: {
              interceptTouchOutside: false
            }
          }
        }
      });
};

export const showLoader = (componentId, data) => {
  Navigation.push(componentId, {
    component: {
      name: 'LoaderOverlay',
      passProps: {
        data
      },
      options: {
        topBar: {
          visible: true,
          height: moderateScale(55),
          topMargin: 15,
          borderHeight: 0,
          elevation: 0,
          title: {
            alignment: 'center',
            text: '',
            fontSize: 25,
            fontFamily: 'Ubuntu-Bold'
          },
          drawBehind: true,
          backButton: {
            showTitle: false
          },
          background: {
            color: 'transparent'
          },
        },
      }
    }
  });
}