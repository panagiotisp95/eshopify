import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { View } from 'react-native';

export default class OrdersList extends React.Component {
  	constructor(props) {
		super(props)
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		
	}

	render() {
		return (
			<View style={styles.root}><View>
				
			</View></View>
		);
	}

	
}

OrdersList.options = {
	topBar: {
		title: {
			text: 'Orders'
		}
	}
};
