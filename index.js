import { Navigation } from "react-native-navigation";
import { registerScreens } from './js/screens';
import { Provider } from "react-redux";
import rootSaga from "./js/sagas";
import configureStore from "./js/store";

const store = configureStore();
store.runSaga(rootSaga);

registerScreens(store, Provider);
Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'Initializing',
            passProps: {
              text: 'stack with one child'
            }
          }
        }],
        options: {
          topBar: {
            visible: false,
            height: 0
          }
        }

      }
    }
  });
});
