import * as React from 'react';
import styles from "./styles/LoginStyles";
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class LoginScreen extends React.Component {
	state = {
		email: '',
		password: '',
		validEmail: true,
		validPassword: true
	}

	handleEmail = (text) => {
		console.log(text);
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		this.setState({ email: text })

		if (reg.test(text) === false) {
			console.log("Email is Not Correct");
			this.setState({ validEmail: false })
			return false;
		}else {
			console.log("Email is Correct");
			this.setState({ validEmail: true })
		}
	}

	handlePassword = (text) => {
		if (text.length > 10){
			this.setState({validPassword: true})
		}else{
			this.setState({validPassword: false})
		}
		this.setState({ password: text })
	}

	onLoginPress(email, password) {
		if(email=="aa@gg.cc"){
			Navigation.setRoot(mainRoot)
		}
		Navigation.setRoot(mainRoot)
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
								style={styles.textInputNormal} 
								onChangeText = {this.handleEmail} 
					/>
					<TextInput  textContentType="password" 
							 	placeholder="Password" 
								placeholderColor="#c4c3cb" 
								style={styles.textInputNormal} 
								secureTextEntry={true} 
								onChangeText = {this.handlePassword}
					/>
					<Button
						title="Login"
						disabled={!this.state.validEmail || !this.state.validPassword}
						accessibilityLabel="Login button"
						onPress={() => this.onLoginPress(this.state.email,this.state.password)}
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
						onPress={() => Navigation.push(this.props.componentId, {
							component: {
								name: 'ForgotPassword'
							}
						})}
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

