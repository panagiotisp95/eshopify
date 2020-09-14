import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { ListItem } from 'react-native-elements';
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput,
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

const products = [{
	    name: 'iPhone 11 pro',
	    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
	    
	},
	{
		name: 'iPhone 11 Pro Max',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		
	}];

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props)
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
					    }
					}
				}
			)
		}
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
			<View style={styles.root}><View>
				{
						products.map((l, i) => (
							<ListItem
							key={i}
							leftAvatar={{ source: require('./icons/iphone.jpeg')}}
							title={l.name}
							subtitle={l.subtitle}
							onPress={() => this.editProduct(l)}
							bottomDivider
						/>
						))
					}
			</View></View>
		);
	}

	editProduct(product){
		Navigation.push(this.props.componentId, 
  			{
				component: {
					name: 'AddEditProduct',
					passProps: {
				    	name: product.name,
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
		if(Object.keys(products).length == 0){
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
