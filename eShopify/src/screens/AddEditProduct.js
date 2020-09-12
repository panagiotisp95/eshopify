import * as React from 'react';
import styles from "./styles/style";
import productStyles from "./styles/AddEditProductStyle";
import RNCountry from "react-native-countries";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import {Chevron} from 'react-native-shapes'
import {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {
			PixelRatio,Image,Animated,StyleSheet,Dimensions,
			Pressable,Switch,SafeAreaView,ScrollView,
			TouchableOpacity,Keyboard,Text,Button,View,TextInput,
			TouchableWithoutFeedback,Alert,KeyboardAvoidingView
		} from 'react-native';

const { Navigation } = require('react-native-navigation');
const standardBorderColor = '#eaeaea';
const errorBorderColor = '#f51b07';
const okBorderColor = '#5eeb34';

conditions = [
	{
		value:'',
		label:'Brand New'
	},
	{
		value:'',
		label:'Used'
	},
	{
		value:'',
		label:'Used, like new'
	},
	{
		value:'',
		label:'Used, bad condition'
	},
	{
		value:'',
		label:'Used, for parts'
	},
]

export default class AddEditProduct extends React.Component {
  	state = {};
	name = {text: '', borderColor: standardBorderColor};
	address = {text:['',''], borderColor: standardBorderColor};
	postalCode = {text: '', borderColor: standardBorderColor};
	city = {text: '', borderColor: standardBorderColor};
	country = {text: '', borderColor: standardBorderColor};
	category = {text: '', borderColor: standardBorderColor};
	list =[];

	constructor(props) {
		super(props)
		let countryNamesWithCodes = RNCountry.getCountryNamesWithCodes;
		countryNamesWithCodes.sort((a, b) => a.name.localeCompare(b.name));
		Navigation.events().bindComponent(this);

		this.handlePhotoTapped = this.handlePhotoTapped.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleAddress1 = this.handleAddress1.bind(this);
		this.handleAddress2 = this.handleAddress2.bind(this);
		this.handlePostalCode = this.handlePostalCode.bind(this);
		this.handleCity = this.handleCity.bind(this);
		this.handleCountry = this.handleCountry.bind(this);
		this.handleCategory = this.handleCategory.bind(this);

		this.state = {
			list: this.list,
			name: this.name,
			phone: this.phone,
			address: this.address,
			postalCode: this.postalCode,
			city: this.city,
			country: this.country,
			validEmail: true,
			isFocusStyle: false,
			validPassword: true,
			isModalVisible: false,
			countryNameListWithCode: countryNamesWithCodes
		}
	}

	toggleModal = () => {
	    this.setState({isModalVisible: !this.state.isModalVisible});
	};

	handleName(str){
		this.name.text = str;
		this.name.borderColor = standardBorderColor;
		this.setState({ name: this.name });
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

	handleCondition(value,index){
		this.country.text = value;
		this.country.borderColor = standardBorderColor;
		this.setState({ country: this.country });
	}

	handlePhotoTapped(num) {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true,
			},
		};
		if(this.list[num] != null){
			this.toggleModal();
		}else{
			ImagePicker.showImagePicker(options, response => {
				//console.log('Response = ', response);

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
					
					temp = num;
					while(this.list[temp-1] === null){
						temp--;
					}
					this.list[temp]=source;
					this.setState({ list: this.list, });
				}
			});
		}
	}

	onRegisterPress() {
		this.list.push(null);
		this.setState({list: this.list})
		//Navigation.setRoot(mainRoot)
	}

	navigationButtonPressed({ buttonId }) {
		if(buttonId === 'doneAddProductbtn'){
			Toast.show('This is a toast.');
			Navigation.pop(this.props.componentId);
		}
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

		const conditionPlaceholder = {
			label: 'Select a Condition...',
			value: null,
		};

		return (
			<SafeAreaView style={styles.containerse}>
			<ScrollView style={styles.scrollView}>
			<KeyboardAvoidingView style={styles.containerView} behavior="padding">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			    <View style={styles.loginScreenContainer}>
			      <View style={styles.loginFormView}>
			      	<Modal
				        isVisible={this.state.isModalVisible}
				        onSwipeComplete={this.toggleModal}
				        swipeDirection={['up', 'left', 'right', 'down']}
				        style={productStyles.view}>
						<View style={productStyles.content}>
							<Button testID={'close-button'} onPress={this.toggleModal} title="View current photo" />
							<Button testID={'close-button'} onPress={this.toggleModal} title="Change photo" />
						</View>
					</Modal>
			        <View style={styles.containerPicture}>
			        	<ScrollView horizontal={true} contentContainerStyle={productStyles.scrollview}>
			        		{this.state.list.map((l, i) => (
								<Pressable key={i} onPress={this.handlePhotoTapped.bind(this,i)}>
						            <View style={[productStyles.avatar, productStyles.avatarContainer]}>
										{this.state.list[i] === null ? (
											<Text>Select a Photo</Text>
										) : (
											<Image style={productStyles.avatar} source={this.state.list[i]} />
										)}
						            </View>
					          	</Pressable>
							))}
							{Object.keys(this.list).length == 0 ? (
								<Icon.Button
									name="plus"
									color="#656566"
									backgroundColor="#ffffff"
									onPress={() => this.onRegisterPress()}
								>Add Photo</Icon.Button>
							) : (
								<Icon.Button
									name="plus"
									color="#656566"
									backgroundColor="#ffffff"
									onPress={() => this.onRegisterPress()}
									style={productStyles.button}
								></Icon.Button>
							)}
						</ScrollView>
			        </View>
			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name"
			        	defaultValue={this.props.name}
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
					<RNPickerSelect 
			        	placeholder={conditionPlaceholder}
			          	items={conditions}
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
			        	placeholder="Brand" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address1Input = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.address.borderColor }} 
			        	onChangeText = {this.handleAddress1}/>
			        <TextInput 
			        	placeholder="Price" 
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address1Input = input; }}
			        	style={{...styles.textInputNormal, borderColor: this.state.address.borderColor }} 
			        	onChangeText = {this.handleAddress1}/>
			        <RNPickerSelect 
			        	placeholder={conditionPlaceholder}
			          	items={conditions}
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

AddEditProduct.options = {
	topBar: {
		title: {
			text: 'Edit Product'
		},
    	rightButtonColor: '#ffffff',
		rightButtons: [
			{
				id: 'doneAddProductbtn',
				text: 'Done',
			},
		],
	}
};












