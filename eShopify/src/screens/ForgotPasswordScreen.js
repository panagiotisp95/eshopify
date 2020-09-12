import * as React from 'react';
import styles from "./styles/style";
import {
        Keyboard,Text,Button, 
        View, TextInput, 
        TouchableWithoutFeedback, 
        Alert, KeyboardAvoidingView
        } from 'react-native';

const { Navigation } = require('react-native-navigation');
const standardBorderColor = '#eaeaea';
const errorBorderColor = '#f51b07';
const okBorderColor = '#5eeb34';

export default class ForgotPasswordScreen extends React.Component {
	email = {text: '', borderColor: standardBorderColor, isValid: false};
	code = {text: '', borderColor: standardBorderColor, isValid: false};

	constructor(props) {
		super(props)
		this.handleEmail = this.handleEmail.bind(this);
		this.state = {
			email: this.email,
			code: this.code,
			isSent: false
		}
	}

	handleEmail = (text) => {
		this.email.text = text;
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (reg.test(text) === false) {
			this.email.borderColor = errorBorderColor;
			this.email.isValid = false;
		}else {
			this.email.borderColor = okBorderColor;
			this.email.isValid = true;
		}
		if(text == ''){
			this.email.borderColor = standardBorderColor;
		}
		this.setState({ email: this.email });
	}

	handleCode = (text) => {
		this.code.text = text;
		let reg = /^\w+([\.-]?\w+)*#\w+([\.-]?\w+)*(\$\w{2,3})+$/;

		if (reg.test(text) === false) {
			this.code.borderColor = errorBorderColor;
			this.code.isValid = false;
		}else {
			this.code.borderColor = okBorderColor;
			this.code.isValid = true;
		}
		if(text == ''){
			this.code.borderColor = standardBorderColor;
		}
		this.setState({ code: this.code });
	}

	sendEmail(str){
		this.emailInput.clear();
		this.email.borderColor = standardBorderColor;
		this.setState({email: this.email});
		this.setState({isSent: true});
	}

	confirmPasswordChange(str){

	}

	sendAgain(str){

	}

	done(){
		if(!this.state.isSent){
			return (
				<View><View>
					<Text style={styles.textForgotText}> Enter your email to send you a unique code: </Text>
					<TextInput 
						textContentType="emailAddress" 
						placeholder="Email" 
						placeholderColor="#c4c3cb" 
						ref={(input) => { this.emailInput = input; }}
						style={{...styles.textInputNormal, borderColor: this.state.email.borderColor }} 
						onChangeText = {this.handleEmail}
					/>
					<Button
						title="Send"
						disabled={!this.state.email.isValid}
						accessibilityLabel="send button"
						onPress={() => this.sendEmail()} 
					/>
				</View></View>
			);
		}else{
			return (
				<View><View>
					<Text style={styles.textForgotText}> Enter the unique code we sent you: </Text>
					<TextInput 
						placeholder="Code"
						placeholderColor="#c4c3cb" 
						style={{...styles.textInputNormal, borderColor: this.state.code.borderColor }} 
						onChangeText = {this.handleCode} 
					/>
					<Button
						title="Done"
						disabled={!this.state.code.isValid}
						accessibilityLabel="done button"
						onPress={() => this.confirmPasswordChange()} 
					/>
					<Button
						title="Send again"
						accessibilityLabel="done button"
						onPress={() => this.sendAgain()} 
					/>
				</View></View>
			);
		}
	}

	render() {
		return (
			<View style={styles.root}>
				<Text style={styles.logoText}> eShopify </Text>
				{this.done()}
			</View>
		);
	}
}

ForgotPasswordScreen.options = {
	topBar: {
		title: {
			text: 'Forgot Password'
		}
	}
};