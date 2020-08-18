// In index.js of a new project

import * as React from 'react';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Navigation }  from "react-native-navigation"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SettingsScreen from"./screens/SettingsScreen"
import RegisterScreen from"./screens/RegisterScreen"
import ConfirmScreen from"./screens/ConfirmAccountScreen"
import ForgotPasswordScreen from"./screens/ForgotPasswordScreen"
import SideMenu from"./screens/SideMenu"
import DashboardScreen from"./screens/DashboardScreen"
import EditStoreScreen from"./screens/AddEditStoreScreen"
import ProfileScreen from"./screens/ProfileScreen"
import StoreScreen from"./screens/StoreScreen"
import OrdersScreen from"./screens/StoreScreen"

import { 
		View,
		Text,
		Button,
		StyleSheet
		} from 'react-native';

Navigation.registerComponent('SideMenu', () => RNNDrawer.create(SideMenu));
Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Register', () => RegisterScreen);
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);
Navigation.registerComponent('Confirm', () => ConfirmScreen);
Navigation.registerComponent('ForgotPassword', () => ForgotPasswordScreen);
Navigation.registerComponent('Dashboard', () => DashboardScreen);
Navigation.registerComponent('EditStore', () => EditStoreScreen);
Navigation.registerComponent('Profile', () => ProfileScreen);
Navigation.registerComponent('Store', () => StoreScreen);
Navigation.registerComponent('Orders', () => OrdersScreen);


const loginRoot = {
	root: {
		stack: {
			children: [
				{
					component: {
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