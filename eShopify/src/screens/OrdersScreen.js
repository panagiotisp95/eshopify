import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

const orders = {};

export default class OrdersScreen extends React.Component {
	constructor(props) {
    	super(props);
    	Navigation.events().bindComponent(this);
  	}

  	navigationButtonPressed({ buttonId }) {
  		
	}

	emptyOrders(){
		return (
			<View style={styles.root, styles.container}>
				<Text>Your orders list is empty</Text>
			</View>
		);
	}

	hasOrders(){
		return (
			<View style={styles.root}>
				<Text>{this.props.show}</Text>
			</View>
		);
	}

	render() {
		if(Object.keys(orders).length == 0){
			return this.emptyOrders();
		}else{
			return this.hasOrders();
		}
	}
}

OrdersScreen.options = {
	topBar: {
		title: {
			text: 'Orders'
		}
	}
};
