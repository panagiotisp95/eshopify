import * as React from 'react';
import styles from "./styles/style";
import { ListItem } from 'react-native-elements';
import { Navigation }  from "react-native-navigation"
import { getStoresForUser,getTotalEarnings } from '../database/realm';
import { 
		 Text,
		 Dimensions,
		 View,
		 SafeAreaView,
		 ScrollView
		} from 'react-native';

export default class DashboardScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			stores: getStoresForUser(this.props.email),
			total: getTotalEarnings(this.props.email)
		}
    	Navigation.events().bindComponent(this);
  	}

  	navigationButtonPressed({ buttonId }) {
  		if(buttonId == 'addStoreBtn'){
	  		Navigation.push(this.props.componentId, 
	  			{
					component: {
						name: 'AddEditStore',
					}
				}
			)
	  	}
  	}

  	handleStorePress(screenName, storeName, id){
  		Navigation.push(
  			this.props.componentId, 
  			{
				component: {
					name: screenName,
					options: {
				    	topBar: {
				    		title: {
				    			text: storeName
				        	}
				      	}
					},
					passProps:{
						storeid: id
					}
				    
				}
			}
		)
  	}

	render() {
		return (
			<SafeAreaView>
			<ScrollView style={styles.scrollView}>
			<View style={styles.root}>
				{
					this.state.stores.map((l, i) => (
						<ListItem
							key={i}
							title={l.name}
							subtitle={l.city}
							onPress={() => this.handleStorePress("OwnerStore", l.name, l.store_id)}
							bottomDivider
							chevron
						/>
					))
				}
				<View style={styles.chart}>
				  	<View><Text style={styles.chartTitle}>Earnings</Text></View>
					<Text>Total: {this.state.total}</Text>
				</View>
			</View>
			</ScrollView>
			</SafeAreaView>
		);
	}
}

DashboardScreen.options = {
	topBar: {
		title: {
			text: 'Dashboard'
		},
		rightButtonColor: '#ffffff',
		rightButtons: [
			{
				id: 'addStoreBtn',
				text: 'Add Store',
			},
		],
		
	}
};
