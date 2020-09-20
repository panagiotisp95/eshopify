import * as React from 'react';
import styles from "./styles/style";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import Loader from '../modules/loader';
import { Chevron } from 'react-native-shapes';
import { sendEmail } from '../services/notifications';
import { registerUser } from '../database/realm';
import { showAlert, showTwoButtonAlert } from '../modules/alert';
import { standardBorderColor, errorBorderColor, okBorderColor } from "./styles/style";
import { countries } from "../setup/data" 
import { listPickerStyling } from "../setup/index"
import { Navigation } from 'react-native-navigation';
import {
			Image,Pressable,SafeAreaView,ScrollView,Keyboard,
			Text,Button,View,TextInput,TouchableWithoutFeedback,
			KeyboardAvoidingView
		} from 'react-native';
const randomString  = require('random-string');


export default class RegisterScreen extends React.Component {
	state = {};
	email = {text: '', borderColor: standardBorderColor, isValid: false};
	password = {text:['',''], borderColor: [standardBorderColor,standardBorderColor], isValid: [false,false]};
	name = {text: '', borderColor: standardBorderColor};
	surname = {text: '', borderColor: standardBorderColor};
	phone = {text: '', borderColor: standardBorderColor, isValid: false};
	address = {text:['',''], borderColor: standardBorderColor};
	postalCode = {text: '', borderColor: standardBorderColor};
	city = {text: '', borderColor: standardBorderColor};
	country = {text: '', borderColor: standardBorderColor};

	constructor(props) {
		super(props)
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePhotoTapped = this.handlePhotoTapped.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleSurname = this.handleSurname.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.handleAddress1 = this.handleAddress1.bind(this);
		this.handleAddress2 = this.handleAddress2.bind(this);
		this.handlePostalCode = this.handlePostalCode.bind(this);
		this.handleCity = this.handleCity.bind(this);
		this.handleCountry = this.handleCountry.bind(this);

		this.state = {
			loading: false,
			avatarSource: '',
			email: this.email,
			password: this.password,
			name: this.name,
			surname: this.surname,
			phone: this.phone,
			address: this.address,
			postalCode: this.postalCode,
			city: this.city,
			country: this.country,
			validEmail: true,
			isFocusStyle: false,
			validPassword: true,
			code: null,
			countryNameListWithCode: countries
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

	handlePassword(str, index){
		this.password.text[index] = str;

		if (str.length > 9){
			this.password.isValid[index] = true;
			this.password.borderColor[index] = okBorderColor;
			if(this.password.text[0] != this.password.text[1]){
				this.password.borderColor[1] = errorBorderColor;
			}
		}else if(str.length == 0){
			this.password.borderColor[index] = standardBorderColor;
			this.password.isValid[index] = false;
		}else{
			this.password.borderColor[index] = errorBorderColor;
			this.password.isValid[index] = false;
		}
		this.setState({ password: this.password })
	}

	handlePassword1 = (str) => {
		this.handlePassword(str,0);
	}

	handlePassword2 = (str) => {
		this.handlePassword(str,1);
	}

	handleName(str){
		this.name.text = str;
		this.name.borderColor = standardBorderColor;
		this.setState({ name: this.name });
	}
	
	handleSurname(str){
		this.surname.text = str;
		this.surname.borderColor = standardBorderColor;
		this.setState({ surname: this.surname });
	}

	handlePhone(str){
		this.phone.text = str;
		this.phone.borderColor = standardBorderColor;
		this.setState({ phone: this.phone });
	}

	handleAddress1(str){
		this.address.text[0] = str;
		this.address.borderColor = standardBorderColor;
		this.setState({ address: this.address });
	}

	handleAddress2(str){
		this.address.text[1] = str;
		this.address.borderColor = standardBorderColor;
		this.setState({ address: this.address });
	}

	handlePostalCode(str){
		this.postalCode.text = str;
		this.postalCode.borderColor = standardBorderColor;
		this.setState({ postalCode: this.postalCode });
	}

	handleCity(str){
		this.city.text = str;
		this.city.borderColor = standardBorderColor;
		this.setState({ city: this.city });
	}

	handleCountry(value,index){
		this.country.text = value;
		this.country.borderColor = standardBorderColor;
		this.setState({ country: this.country });
	}

	handlePhotoTapped() {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true,
			},
		};

		ImagePicker.showImagePicker(options, response => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled photo picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				let source = {uri: response.uri};
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				this.setState({ avatarSource: source, });
			}
		});
	}

	onRegisterPress() {
		isCorrect = true;
		if(this.state.country.text==''){
			isCorrect = false;
			this.country.borderColor = errorBorderColor;
			this.setState({country: this.country});
		}
		if(this.state.city.text==''){
			isCorrect = false;
			this.city.borderColor = errorBorderColor;
			this.setState({city: this.city});
			this.cityInput.focus();
		}
		if(this.state.postalCode.text==''){
			isCorrect = false;
			this.postalCode.borderColor = errorBorderColor;
			this.setState({postalCode: this.postalCode});
			this.postalCodeInput.focus();
		}
		if(this.state.address.text[0]=='' && this.state.address.text[1]==''){
			isCorrect = false;
			this.address.borderColor = errorBorderColor;
			this.setState({address: this.address});
			this.address1Input.focus();
		}
		if(this.state.phone.text==''){
			isCorrect = false;
			this.phone.borderColor = errorBorderColor;
			this.setState({phone: this.phone});
			this.phoneInput.focus();
		}
		if(this.state.surname.text==''){
			isCorrect = false;
			this.surname.borderColor = errorBorderColor;
			this.setState({surname: this.surname});
			this.surnameInput.focus();
		}
		if(this.state.name.text==''){
			isCorrect = false;
			this.name.borderColor = errorBorderColor;
			this.setState({surname: this.surname});
			this.nameInput.focus();
		}
		if(this.state.password.text[0]=='' || this.state.password.text[1]==''){
			isCorrect = false;
			this.password.borderColor[0] = errorBorderColor;
			this.password.borderColor[1] = errorBorderColor;
			this.setState({password: this.password});
			this.password1.clear();
			this.password2.clear();
			this.password1.focus();
		}
		if(this.state.email.text==''){
			isCorrect = false;
			this.email.borderColor = errorBorderColor;
			this.setState({email: this.email});
			this.emailInput.focus();
		}
		if(isCorrect){
			var str = randomString();
			var user = this.state;
			this.setState({ code: str })
			user.code = str;
			if(registerUser(user)){
				this.sendCodeEmail(this)
			}else{
				showAlert('Account Exists', 'Account with the email provided already exists')
			}
		}
	}

	sendCodeEmail(component){
		component.setState({loading: true});
		sendEmail(component.state.email.text, component.state.code).then((response) => {
			if( 'status' in response && response.status == 'SUCCESS'){
				component.setState({loading: false})
				Navigation.push(component.props.componentId, {
					component: {
						name: 'Confirm',
						passProps: {
							code: component.state.code,
							email: component.state.email.text
						  }
					}
				})
			}else{
				showTwoButtonAlert('Error', 'We experienced an error sending the email, check internet connection. Try Again?', component.sendCodeEmail, component.alertCallback, component)
			}
		})
	}

	alertCallback(component){
		component.setState({loading: false});
	}

	render() {
		const placeholder = {
			label: 'Select a Country...',
			value: null,
		};

		return (
			<SafeAreaView style={styles.containerse}>
			<ScrollView style={styles.scrollView}>
			<KeyboardAvoidingView style={styles.containerView} behavior="padding">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			    <View style={styles.loginScreenContainer}>
			      <View style={styles.loginFormView}>
			        <View style={styles.containerPicture}>
			          <Pressable onPress={this.handlePhotoTapped.bind(this)}>
			            <View style={[styles.avatar, styles.avatarContainer]}>
			              {this.state.avatarSource === null ? (
			                <Text>Select a Photo</Text>
			              ) : (
			                <Image style={styles.avatar} source={this.state.avatarSource} />
			              )}
			            </View>
			          </Pressable>
			        </View>
					<Loader loading={this.state.loading} />
			        <TextInput 
			        	textContentType="emailAddress" 
						placeholder="Email" 
						autoCapitalize = 'none'
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.emailInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.email.borderColor }} 
			        	onChangeText = {this.handleEmail} />
			        <TextInput textContentType="newPassword" 
			        	placeholder="Password" 
			        	placeholderColor="#c4c3cb"
			        	ref={(input) => { this.password1 = input; }} 
			        	style={{...styles.textInputNormal, borderColor: this.state.password.borderColor[0] }} 
			        	secureTextEntry={true} 
			        	onChangeText = {this.handlePassword1}/>
			        <TextInput 
			        	textContentType="newPassword" 
			        	placeholder="Re-enter Password" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.password2 = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.password.borderColor[1] }} 
			        	secureTextEntry={true} 
			        	onChangeText = {this.handlePassword2}/>
			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.nameInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.name.borderColor }} 
			        	onChangeText = {this.handleName}/>
			        <TextInput 
			        	textContentType="familyName" 
			        	placeholder="Surname" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.surnameInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.surname.borderColor }} 
			        	onChangeText = {this.handleSurname}/>
			        <TextInput 
			        	textContentType="telephoneNumber" 
			        	placeholder="Phone" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.phoneInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.phone.borderColor }} 
			        	onChangeText = {this.handlePhone}/>
			        <TextInput 
			        	textContentType="streetAddressLine1" 
			        	placeholder="Address Line 1" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address1Input = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.address.borderColor }} 
			        	onChangeText = {this.handleAddress1}/>
			        <TextInput 
			        	textContentType="streetAddressLine2" 
			        	placeholder="Address Line 2" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address2Input = input; }}
			        	style={{...styles.textInputNormal, borderColor: standardBorderColor }} 
			        	onChangeText = {this.handleAddress2}/>
			        <TextInput 
			        	textContentType="postalCode" 
			        	placeholder="Postal Code" 
			        	placeholderColor="#c4c3cb"
			        	ref={(input) => { this.postalCodeInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.postalCode.borderColor }} 
			        	onChangeText = {this.handlePostalCode}/>
			        <TextInput 
			        	textContentType="addressCity" 
			        	placeholder="City" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.cityInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.city.borderColor }} 
			        	onChangeText = {this.handleCity}/>
			        <RNPickerSelect 
			        	placeholder={placeholder}
			          	items={this.state.countryNameListWithCode}
			          	onValueChange={(value,index) => {this.handleCountry(value,index)}}
			          	style={listPickerStyling(this.state.country.borderColor)}
						textInputProps={{ underlineColorAndroid: 'cyan' }}
						Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
			        <Button
						title="Register"
						disabled={!this.state.validEmail || !this.state.validPassword}
						accessibilityLabel="Register button"
						onPress={() => this.onRegisterPress()}
			        />
			      </View>
			    </View>
			</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			</ScrollView>
			</SafeAreaView>
		);
	}
}

RegisterScreen.options = {
	topBar: {
		title: {
			text: 'Register'
		}
	}
};
