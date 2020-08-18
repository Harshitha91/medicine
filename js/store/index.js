// @flow
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import { createLogger, END } from "redux-logger";
import createSagaMiddleware from "redux-saga";
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent; // eslint-disable-line
const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    applyMiddleware(
      sagaMiddleware, // saga midleware
      logger // neat middleware that logs actions
    )
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("../reducers/index").default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
