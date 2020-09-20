import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { ListItem } from 'react-native-elements';
import { getOrdersForUser } from '../database/realm';

import { Keyboard, SafeAreaView, ScrollView,
		 Text,
		 Button, 
		 View
		} from 'react-native';

const orders = {};

export default class OrdersScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ordersList: getOrdersForUser(this.props.email)
		}
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

	viewProduct(product){
		Navigation.push(this.props.componentId, {
			component: {
				name: 'ProductView',
				options: {
			    	topBar: {
			    		title: {
			    			text: product.name
			        	}
			      	}
			    }
			}
		})
	}

	hasOrders(){
		return (
			<SafeAreaView style={styles.containerse}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.root}>
						<Text>Orders</Text>
						{
							this.state.ordersList.map((l, i) => (
								<ListItem
									key={i}
									leftAvatar={{ source: { uri: l.picture } }}
									title={l.name}
									subtitle={l.price}
									onPress={() => this.viewProduct(l)}
									bottomDivider
								/>
							))
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	render() {
		if(this.state.ordersList.length == 0){
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
