import * as React from 'react';
import styles from "./styles/LoginStyles";
import { Navigation }  from "react-native-navigation"

const assert = require('assert');
const Realm = require('realm');
import { 
    PRODUCTS_SCHEMA,
    ProductsSchema,  
    ORDERS_SCHEMA, 
    OrdersSchema, 
    STORES_SCHEMA, 
    StoresSchema, 
    USERS_SCHEMA, 
    UsersSchema} from '../allSchemas';

const databaseOptions = {
  schema: [ProductsSchema, OrdersSchema, UsersSchema, StoresSchema],
  schemaVersion: 0
};

const standardBorderColor = '#eaeaea';
const errorBorderColor = '#f51b07';
const okBorderColor = '#5eeb34';

import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

export default class LoginScreen extends React.Component {
	state = {};
	email = {text: '', borderColor: standardBorderColor, isValid: false};
	password = {text:'', borderColor: standardBorderColor, isValid: false};

	constructor(props) {
		super(props)
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);

		this.state = {
			email: this.email,
			password: this.password
		}
	}

	handleEmail = (text) => {
		this.email.text = text;
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (reg.test(text) === false) {
			this.email.isValid = false;
		}else {
			this.email.isValid = true;
		}
		this.setState({ email: this.email });
	}

	handlePassword = (str) => {
		this.password.text = str;

		if (str.length > 9){
			this.password.isValid = true;
			this.password.borderColor = okBorderColor;
		}else if(str.length == 0){
			this.password.borderColor = standardBorderColor;
			this.password.isValid = false;
		}else{
			this.password.borderColor = errorBorderColor;
			this.password.isValid = false;
		}
		this.setState({ password: this.password })
	}

	onForgotPasswordPress(){
	    Navigation.push(this.props.componentId, {
			component: {
				name: 'ForgotPassword'
			}
		})
	}

	onLoginPress() {
		isCorrect = true;
		if(this.state.password.text[0]==''){
			isCorrect = false;
			this.password.borderColor = errorBorderColor;
			this.setState({password: this.password});
			this.passwordInput.focus();
			this.password.clear();
		}
		if(this.state.email.text==''){
			isCorrect = false;
			this.email.borderColor = errorBorderColor;
			this.setState({email: this.email});
			this.emailInput.focus();
		}
		if(isCorrect){
			if(this.authenticateUser(this.state.email.text,this.state.password.text)){
				Navigation.setRoot(mainRoot)
			}
		}
		
	}

	showAlert(title, msg){
		Alert.alert(
	      	title,
	      	msg,
			[
				{ text: "OK", onPress: () => (console.log("OK Pressed")) }
			],
			{ cancelable: false }
	    );
	}

	authenticateUser(email, password){
		Realm.open(databaseOptions).then(realm => {
		    const res = realm.objects(USERS_SCHEMA).filtered('email="${email}" AND password="${password}"')
		    if(Object.keys(res).length === 0){
		    	this.showAlert("Account not found","Please check your credentials or if you are new, register!")
		    	return false
		    }
		    return true
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.containerView} behavior="padding">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.loginScreenContainer}>
				<View style={styles.loginFormView}>
					<Text style={styles.logoText}> eShopify </Text>
					<TextInput  textContentType="emailAddress" 
								placeholder="Email" 
								placeholderColor="#c4c3cb" 
								ref={(input) => { this.emailInput = input; }}
								style={{...styles.textInputNormal, borderColor: this.state.email.borderColor }} 
								onChangeText = {this.handleEmail} 
					/>
					<TextInput  textContentType="password" 
							 	placeholder="Password" 
								placeholderColor="#c4c3cb" 
								style={{...styles.textInputNormal, borderColor: this.state.password.borderColor }} 
								ref={(input) => { this.passwordInput = input; }}
								secureTextEntry={true} 
								onChangeText = {this.handlePassword}
					/>
					<Button
						title="Login"
						disabled={!this.state.email.isValid || !this.state.password.isValid}
						accessibilityLabel="Login button"
						onPress={() => this.onLoginPress()}
					/>
					<Button
						title="Register"
						accessibilityLabel="Register button"
						onPress={() => Navigation.push(this.props.componentId, {
							component: {
								name: 'Register'
							}
						})}
					/>
					<Button
						title="Forgot Password"
						accessibilityLabel="Forgot password button"
						onPress={() => this.onForgotPasswordPress()}
					/>
				</View>
				</View>
			</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
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
				}
			]
		}
	}
};

