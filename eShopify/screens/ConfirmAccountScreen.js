import * as React from 'react';
import styles from "./styles/style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class ConfirmAccountScreen extends React.Component {
	state = {
		email: '',
		password: '',
		validEmail: false,
		validPassword: false
	}

	render() {
		return (
			<View style={styles.root}><View>
				<Button
					title='Push Settings Screen'
					color='#710ce3'
					onPress={() => Navigation.push(this.props.componentId, {
						component: {
							name: 'Settings'
						}
					})} 
				/>
			</View></View>
		);
	}
}

