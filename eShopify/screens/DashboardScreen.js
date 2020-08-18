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

export default class DashboardScreen extends React.Component {
	render() {
		return (
			<View style={styles.root}>
				<Text>koko</Text>
			</View>
		);
	}
}

DashboardScreen.options = {
	topBar: {
		title: {
			text: 'Dashboard'
		},
		rightButtons: [
			{
				id: 'addStoreBtn',
				text: 'Add Store',
			},
		],
	}
};
