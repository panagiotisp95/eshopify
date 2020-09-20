// In index.js of a new project
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Navigation }  from "react-native-navigation"
import LoginScreen from "./src/screens/LoginScreen"
import HomeScreen from "./src/screens/HomeScreen"
import RegisterScreen from"./src/screens/RegisterScreen"
import ConfirmScreen from"./src/screens/ConfirmAccountScreen"
import ForgotPasswordScreen from"./src/screens/ForgotPasswordScreen"
import SideMenu from"./src/screens/SideMenu"
import DashboardScreen from"./src/screens/DashboardScreen"
import EditStoreScreen from"./src/screens/AddEditStoreScreen"
import Reviews from"./src/screens/Reviews"
import ProfileScreen from"./src/screens/ProfileScreen"
import StoreScreen from"./src/screens/StoreScreen"
import OrdersScreen from"./src/screens/OrdersScreen"
import OwnerStoreScreen from"./src/screens/OwnerStoreScreen"
import ProductListScreen from"./src/screens/ProductListScreen"
import AddEditProductScreen from"./src/screens/AddEditProduct"
import ProductViewScreen from"./src/screens/ProductViewScreen"
import { StyleSheet } from 'react-native';
import { setupRealm } from "./src/database/realm"

Navigation.registerComponent('SideMenu', () => RNNDrawer.create(SideMenu));
Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Register', () => RegisterScreen);
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Confirm', () => ConfirmScreen);
Navigation.registerComponent('ForgotPassword', () => ForgotPasswordScreen);
Navigation.registerComponent('Dashboard', () => DashboardScreen);
Navigation.registerComponent('Reviews', () => Reviews);
Navigation.registerComponent('AddEditStore', () => EditStoreScreen);
Navigation.registerComponent('Profile', () => ProfileScreen);
Navigation.registerComponent('Store', () => StoreScreen);
Navigation.registerComponent('Orders', () => OrdersScreen);
Navigation.registerComponent('OwnerStore', () => OwnerStoreScreen);
Navigation.registerComponent('ProductList', () => ProductListScreen);
Navigation.registerComponent('AddEditProduct', () => AddEditProductScreen);
Navigation.registerComponent('ProductView', () => ProductViewScreen);

setupRealm()

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

