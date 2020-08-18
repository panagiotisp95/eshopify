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

export default class AddEditStoreScreen extends React.Component {
  	constructor(props) {
    	super(props);
    	Navigation.events().bindComponent(this);
  	}

	render() {
		return (
			<View style={styles.root}><View>
				
			</View></View>
		);
	}
}

AddEditStoreScreen.options = {
	topBar: {
		title: {
			text: 'Store'
		}
	}
};
