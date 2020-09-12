import * as React from 'react';
import styles from "./styles/style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class ConfirmAccountScreen extends React.Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		return (
			<View style={styles.root}><View>
				<Text style={styles.textForgotText}> One more step to set you up </Text>
				<Text style={styles.textForgotText}> Please enter the code we send you from your email: </Text>
				<TextInput 
					placeholder="Code"
					placeholderColor="#c4c3cb" 
					style={{...styles.textInputNormal}} 
					onChangeText = {this.handleCode} 
				/>
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

const mainRoot = {
	root: {
		stack: {
			children: [
				{
					component: {
						name: 'Home'
					}
				},
			]
		}
	}
};