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

export default class HomeScreen extends React.Component {
  	constructor(props) {
    	super(props);
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

HomeScreen.options = {
	topBar: {
		title: {
			text: 'Store'
		}
	}
};
