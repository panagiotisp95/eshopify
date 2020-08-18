// In index.js of a new project
const { Navigation } = require('react-native-navigation');
const React = require('react');
const { View, Text, Button, StyleSheet } = require('react-native');
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SettingsScreen from"./screens/SettingsScreen"
import RegisterScreen from"./screens/RegisterScreen"
import ConfirmScreen from"./screens/ConfirmAccountScreen"
import ForgotPasswordScreen from"./screens/ForgotPasswordScreen"
import SideMenu from"./screens/SideMenu"

Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Register', () => RegisterScreen);
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);
Navigation.registerComponent('Confirm', () => ConfirmScreen);
Navigation.registerComponent('ForgotPassword', () => ForgotPasswordScreen);
Navigation.registerComponent('SideMenu', () => RNNDrawer.create(SideMenu));



const loginRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            id: 'apoel',
            name: 'Login'
          }
        },
      ]
    }
  }
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#f58f2a'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#f58f2a'
    }
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14
  }
});
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(loginRoot);
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});