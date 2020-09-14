import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

const list = [
	{
	    name: 'Product List',
	    dest: 'ProductList',
	    num: 0,
	},
	{
		name: 'Pending Orders',
		dest: 'Orders',
		num: 1
	},
	{
		name: 'Shipped Orders',
		dest: 'Orders',
		num: 2
	},
	{
		name: 'Completed Orders',
		dest: 'Orders',
		num: 3,
	},
	{
		name: 'Edit Store Details',
		dest: 'AddEditStore',
		num: 4,
	}
]

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props)
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		
	}

	handleStorePress(option){
		if(option.num == 4){
			Navigation.push(
	  			this.props.componentId, 
	  			{
					component: {
						name: option.dest,
						passProps: {
					    	show: option.num,
					    },
					    options: {
					    	topBar: {
					    		title: {
					    			text: option.name
					        	},
					        	rightButtonColor: '#ffffff',
								rightButtons: [
									{
										id: 'editbtn',
										text: 'Done',
									},
								],
					      	}
					    }
					}
				}
			)
		}else{
			Navigation.push(
	  			this.props.componentId, 
	  			{
					component: {
						name: option.dest,
						passProps: {
					    	show: option.num,
					    },
					    options: {
					    	topBar: {
					    		title: {
					    			text: option.name
					        	}
					      	}
					    }
					}
				}
			)
		}
  		
  	}

	render() {
		return (
			<View style={styles.root}><View>

				{
					list.map((l, i) => (
						<ListItem
							key={i}
							title={l.name}
							onPress={() => this.handleStorePress(l)}
							bottomDivider
							chevron
						/>
					))
				}
			</View></View>
		);
	}

	
}

HomeScreen.options = {
	topBar: {
		title: {
			text: 'Store Details'
		}
	}
};
