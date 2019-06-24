/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { AppRegistry, ActivityIndicator } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import LoginScreen from "./src/screens/LoginScreen";
import configureStore from "./src/store";
import { Provider } from "react-redux";
import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const stores = configureStore();
const persistor = persistStore(stores);

const createAppWithRedux = (Component, ...props) => {
  const AppComponent = class App extends React.Component {
    render() {
      return (
        <Provider store={stores}>
          <PersistGate
            loading={<ActivityIndicator size="large" />}
            persistor={persistor}
          >
            <Component
              {...{
                ...this.props,
                ...props
              }}
            />
          </PersistGate>
        </Provider>
      );
    }
  };
  AppComponent.options = Component.options;
  return AppComponent;
};

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () =>
  createAppWithRedux(LoginScreen)
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});
