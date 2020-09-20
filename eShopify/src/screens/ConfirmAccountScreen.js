import * as React from 'react';
import styles from "./styles/style";
import {Text,Button, View, TextInput} from 'react-native';
import { showAlert } from '../modules/alert'
import { confirmEmail } from '../database/realm'
import { loginRoot } from '../setup/index';

const { Navigation } = require('react-native-navigation');

export default class ConfirmAccountScreen extends React.Component {
	state={}
	constructor(props) {
		super(props)
		state = {code:null};
    	Navigation.events().bindComponent(this);
  	}

	handleCode = (str) => {
		this.setState({code: str})
	};

	checkCode(){
		if(this.props.code == this.state.code){
			confirmEmail(this.props.email)
			Navigation.setRoot(loginRoot)
		}else{
			showAlert('Codes Doesn’t match', 'The code provided is does not match with the email')
		}
	}

	render() {
		return (
			<View style={styles.root,styles.confirmRoot}>
				<Text style={styles.textForgotText}> One more step to set you up </Text>
				<Text style={styles.textForgotText}> Please enter the code we send you from your email: </Text>
				<TextInput 
					placeholder="Code" 
					placeholderColor="#c4c3cb"
					style={styles.textInputNormal} 
					autoCapitalize = 'none'
					onChangeText = {this.handleCode}/>
				<Button
					title='Done'
					color='#710ce3'
					onPress={() => this.checkCode()}
				/>
			</View>
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