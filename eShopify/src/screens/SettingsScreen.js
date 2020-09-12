import * as React from 'react';
import styles from "./styles/style";
import {
		Keyboard, Text,Button, 
		View, TextInput, 
		TouchableWithoutFeedback, 
		Alert, KeyboardAvoidingView
		} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class SettingsScreen extends React.Component {
	render() {
		return (
			<View style={styles.root}><View>
				
			</View></View>
		);
	}
}

SettingsScreen.options = {
	topBar: {
		title: {
			text: 'Settings'
		}
	}
};
