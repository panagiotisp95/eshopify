import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { Keyboard, 
		 Text,
		 Button, 
		 View,
		 Image,
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';


const details = {
	email:'johnsmith@gmail.com',
	name: 'John',
	surname: 'Smith',
	phone: '+44 76879865',
	address: '3/2 Maryhill Road',
	address2: '',
	postalCode: 'G208BP',
	city: 'Glasgow',
}

export default class ProfileScreen extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
    		editable: false,
    		details: details
    	}

    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		if(buttonId === 'editbtn' ){
			this.setState({editable: true})
			Navigation.mergeOptions(this.props.componentId, {
			  	topBar: {
					rightButtons: [
						{
							id: 'donebtn',
							text: 'Done',
						},
					],
			  	},
			});
		}else if(buttonId === 'donebtn' ){
			this.setState({editable: false})
			Navigation.mergeOptions(this.props.componentId, {
			  	topBar: {
					rightButtons: [
						{
							id: 'editbtn',
							text: 'Edit',
						},
					],
			  	},
			});
		}
	}

	render() {
		return (
			<View style={styles.root}>
			<View style={styles.container}>
				<Image style={styles.profilePicture} source={ { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />	
			</View>
			<View style={styles.loginScreenContainer}>
					<TextInput 
			        	textContentType="emailAddress" 
			        	placeholder="Email"
			        	defaultValue={this.state.details.email}
			        	editable={this.state.editable}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.emailInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handleEmail} />
			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name"
			        	editable={this.state.editable}
			        	defaultValue={this.state.details.name}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.nameInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handleName}/>
			        <TextInput 
			        	textContentType="familyName" 
			        	placeholder="Surname"
			        	defaultValue={this.state.details.surname}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.surnameInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handleSurname}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="telephoneNumber" 
			        	placeholder="Phone"
			        	defaultValue={this.state.details.phone}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.phoneInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handlePhone}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="streetAddressLine1" 
			        	placeholder="Address Line 1" 
			        	defaultValue={this.state.details.address}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address1Input = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handleAddress1}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="streetAddressLine2" 
			        	placeholder="Address Line 2" 
			        	defaultValue={this.state.details.address2}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address2Input = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handleAddress2}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="postalCode" 
			        	placeholder="Postal Code" 
			        	placeholderColor="#c4c3cb"
			        	defaultValue={this.state.details.postalCode}
			        	ref={(input) => { this.postalCodeInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {this.handlePostalCode}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="addressCity" 
			        	placeholder="City" 
			        	placeholderColor="#c4c3cb" 
			        	defaultValue={this.state.details.city}
			        	ref={(input) => { this.cityInput = input; }}
			        	style={{...styles.textInputNormal}} 
			        	onChangeText = {this.handleCity}
			        	editable={this.state.editable}/>
			</View></View>
		);
	}
}

ProfileScreen.options = {
	topBar: {
		title: {
			text: 'Profile'
		},
		rightButtonColor: '#ffffff',
		rightButtons: [
			{
				id: 'editbtn',
				text: 'Edit',
			},
		],
	}
};
