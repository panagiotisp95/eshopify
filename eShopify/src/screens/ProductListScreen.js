import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { ListItem } from 'react-native-elements';
import { getProductsForStore } from '../database/realm';

import { Keyboard, SafeAreaView, ScrollView,
		 Text,
		 Button, 
		 View, 
		 TextInput,
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props)
		this.state = {
			products: getProductsForStore(this.props.storeid)
		}
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		if(buttonId === 'addProductbtn'){
			Navigation.push(this.props.componentId, 
	  			{
					component: {
						name: 'AddEditProduct',
						options: {
					    	topBar: {
								title: {
									text: 'Add Product'
								}
							}
						},
						passProps:{
							storeid: this.props.storeid,
							screenName: 'Add'
						}
					}
				}
			)
		}
	}

	componentDidMount() {

		this.forceUpdate()
	
	}

	emptyProducts(){
		return (
			<View style={styles.root, styles.container}>
				<Text>Your products list is empty</Text>
			</View>
		);
	}

	hasProducts(){
		return (
			<SafeAreaView style={styles.containerse}>
			<ScrollView style={styles.scrollView}>
			<View style={styles.root}>
				{
					this.state.products.map((l, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: l.picture } }}
							title={l.name}
							subtitle={l.price}
							onPress={() => this.editProduct(l.product_id)}
							bottomDivider
						/>
					))
				}
			</View>
			</ScrollView>
			</SafeAreaView>
		);
	}

	editProduct(product_id){
		Navigation.push(this.props.componentId, 
  			{
				component: {
					name: 'AddEditProduct',
					passProps: {
						id: product_id,
						screenName: 'Edit'
				    },
					options: {
				    	topBar: {
							title: {
								text: 'Edit Product'
							}
						}
				    }
				}
			}
		)
	}

	render() {
		if(this.state.products.length == 0){
			return this.emptyProducts();
		}else{
			return this.hasProducts();
		}
	}

	
}

HomeScreen.options = {
	topBar: {
		title: {
			text: 'Store'
		},
    	rightButtonColor: '#ffffff',
		rightButtons: [
			{
				id: 'addProductbtn',
				text: 'Add',
			},
		],
	}
};
