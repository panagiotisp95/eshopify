import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { storeOwnerOptions } from '../setup/index'


export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props)
    	Navigation.events().bindComponent(this);
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
							storeid: this.props.storeid,
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
					storeOwnerOptions.map((l, i) => (
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
