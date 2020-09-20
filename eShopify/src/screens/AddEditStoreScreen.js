import * as React from 'react';
import styles from "./styles/style";
import RNCountry from "react-native-countries";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import {Chevron} from 'react-native-shapes'
import {useState} from 'react'
import {Picker} from '@react-native-community/picker';
import  { categories } from '../setup/index'
import {
			PixelRatio,Image,Animated,StyleSheet,Dimensions,
			Pressable,Switch,Modal,SafeAreaView,ScrollView,
			TouchableOpacity,Keyboard,Text,Button,View,TextInput,
			TouchableWithoutFeedback,Alert,KeyboardAvoidingView
		} from 'react-native';

const { Navigation } = require('react-native-navigation');
const standardBorderColor = '#eaeaea';
const errorBorderColor = '#f51b07';
const okBorderColor = '#5eeb34';


export default class AddEditStoreScreen extends React.Component {
	state = {};
	name = {text: '', borderColor: standardBorderColor};
	phone = {text: '', borderColor: standardBorderColor, isValid: false};
	address = {text:['',''], borderColor: standardBorderColor};
	postalCode = {text: '', borderColor: standardBorderColor};
	city = {text: '', borderColor: standardBorderColor};
	country = {text: '', borderColor: standardBorderColor};
	category = {text: '', borderColor: standardBorderColor};

	constructor(props) {
		super(props)
		let countryNamesWithCodes = RNCountry.getCountryNamesWithCodes;
		countryNamesWithCodes.sort((a, b) => a.name.localeCompare(b.name));
		Navigation.events().bindComponent(this);

		this.handlePhotoTapped = this.handlePhotoTapped.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.handleAddress1 = this.handleAddress1.bind(this);
		this.handleAddress2 = this.handleAddress2.bind(this);
		this.handlePostalCode = this.handlePostalCode.bind(this);
		this.handleCity = this.handleCity.bind(this);
		this.handleCountry = this.handleCountry.bind(this);
		this.handleCategory = this.handleCategory.bind(this);

		this.state = {
			avatarSource: null,
			name: this.name,
			phone: this.phone,
			address: this.address,
			postalCode: this.postalCode,
			city: this.city,
			country: this.country,
			validEmail: true,
			isFocusStyle: false,
			validPassword: true,
			countryNameListWithCode: countryNamesWithCodes
		}
	}

	handleName(str){
		this.name.text = str;
		this.name.borderColor = standardBorderColor;
		this.setState({ name: this.name });
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

	handleCategory(value,index){
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
		if(this.state.country.text==''){
			this.country.borderColor = errorBorderColor;
			this.setState({country: this.country});
		}
		if(this.state.city.text==''){
			this.city.borderColor = errorBorderColor;
			this.setState({city: this.city});
			this.cityInput.focus();
		}
		if(this.state.postalCode.text==''){
			this.postalCode.borderColor = errorBorderColor;
			this.setState({postalCode: this.postalCode});
			this.postalCodeInput.focus();
		}
		if(this.state.address.text[0]=='' && this.state.address.text[1]==''){
			this.address.borderColor = errorBorderColor;
			this.setState({address: this.address});
			this.address1Input.focus();
		}
		if(this.state.phone.text==''){
			this.phone.borderColor = errorBorderColor;
			this.setState({phone: this.phone});
			this.phoneInput.focus();
		}
		if(this.state.name.text==''){
			this.name.borderColor = errorBorderColor;
			this.setState({surname: this.surname});
			this.nameInput.focus();
		}
		//Navigation.setRoot(mainRoot)
	}

	navigationButtonPressed({ buttonId }) {
		Alert.alert(
			'Alert Title',
			'My Alert Msg',
			[
				{
					text: 'Ask me later',
					onPress: () => console.log('Ask me later pressed')
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ 	text: 'OK', 
					onPress: () => console.log('OK Pressed') 
				}
			],
			{ cancelable: false }
		);
	}

	render() {
		var result = [];
		this.state.countryNameListWithCode.forEach(function(item) {
			var k = {};
			k['label'] = item.name;
			k['value'] = item.code;
			result.push(k);
		});

		const countryPlaceholder = {
			label: 'Select a Country...',
			value: null,
		};

		const categoryPlaceholder = {
			label: 'Select a Category...',
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

			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.nameInput = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.name.borderColor }} 
			        	onChangeText = {this.handleName}/>
			        <RNPickerSelect 
			        	placeholder={categoryPlaceholder}
			          	items={categories}
			          	onValueChange={(value,index) => {this.handleCategory(value,index)}}
			          	style={{inputIOS: {
			              			fontSize: 16,
								    paddingVertical: 12,
								    paddingHorizontal: 10,
								    borderWidth: 1,
								    borderColor: this.state.country.borderColor,
								    backgroundColor: '#fafafa',
								    borderRadius: 4,
								    color: 'black',
								    paddingRight: 30,
								    marginLeft: 15,
								    marginRight: 15,
								    marginTop: 5,
								    marginBottom: 5,
								},
								inputAndroid: {
									ontSize: 16,
								    paddingHorizontal: 10,
								    paddingVertical: 8,
								    borderWidth: 0.5,
								    borderColor: 'purple',
								    borderRadius: 8,
								    color: 'black',
								    paddingRight: 30,
			  						backgroundColor: 'transparent',
								},
								iconContainer: {
				                  top: 25,
				                  right: 30,
				                },
				              }}
							textInputProps={{ underlineColorAndroid: 'cyan' }}
							Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
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
			        	placeholder={countryPlaceholder}
			          	items={result}
			          	onValueChange={(value,index) => {this.handleCountry(value,index)}}
			          	style={{inputIOS: {
			              			fontSize: 16,
								    paddingVertical: 12,
								    paddingHorizontal: 10,
								    borderWidth: 1,
								    borderColor: this.state.country.borderColor,
								    backgroundColor: '#fafafa',
								    borderRadius: 4,
								    color: 'black',
								    paddingRight: 30,
								    marginLeft: 15,
								    marginRight: 15,
								    marginTop: 5,
								    marginBottom: 5,
								},
								inputAndroid: {
									ontSize: 16,
								    paddingHorizontal: 10,
								    paddingVertical: 8,
								    borderWidth: 0.5,
								    borderColor: 'purple',
								    borderRadius: 8,
								    color: 'black',
								    paddingRight: 30,
			  						backgroundColor: 'transparent',
								},
								iconContainer: {
				                  top: 25,
				                  right: 30,
				                },
				              }}
							textInputProps={{ underlineColorAndroid: 'cyan' }}
							Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
					<TextInput
					    multiline={true}
					    style={{...styles.textInputNormal, borderColor: this.state.city.borderColor, height: 100 }} 
					    placeholder='Description'
					    numberOfLines={4}
					    onChangeText={(text) => this.setState({text})}
					    value={this.state.text}/>
			      </View>
			    </View>
			</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			</ScrollView>
			</SafeAreaView>
		);
	}
}









