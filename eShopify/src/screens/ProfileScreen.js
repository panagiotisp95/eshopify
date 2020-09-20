import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { View,Image,TextInput } from 'react-native';
import { getUser,updateUser } from '../database/realm';


export default class ProfileScreen extends React.Component {
	details = getUser(this.props.email)
  	constructor(props) {
		super(props)
		this.handleEdit = this.handleEdit.bind(this);
    	this.state = {
			editable: false,
			picture: this.details.picture,
			email: this.details.email,
			name: this.details.name,
			surname: this.details.surname,
			address: this.details.address,
			phone: this.details.phone,
			postalCode: this.details.postalCode,
			city: this.details.city
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
			updateUser(this.state)
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

	handleEdit = (from,text) => {
		if(from == 'email'){
			this.setState({email: text})
		}else if(from == 'name'){
			this.setState({name: text})
		}else if(from == 'surname'){
			this.setState({surname: text})
		}else if(from == 'phone'){
			this.setState({phone: text})
		}else if(from == 'address1'){
			addresses = this.state.details.address.split('~')
			this.setState({name: text+"~"+addresses[1]})
		}else if(from == 'address2'){
			addresses = this.state.details.address.split('~')
			this.setState({name: addresses[0]+"~"+text})
		}else if(from == 'postCode'){
			this.setState({postalCode: text})
		}else if(from == 'city'){
			this.setState({city: text})
		}
		console.log(this.details)
	}

	render() {
		var picture = { uri: this.state.picture }
		if(this.state.picture == ''){
			picture = require('../icons/avatar.png')
		}
		addresses = this.state.address.split('~')
		return (
			<View style={styles.root}>
			<View style={styles.container}>
				<Image style={styles.profilePicture} source={ picture } />	
			</View>
			<View style={styles.loginScreenContainer}>
					<TextInput 
			        	textContentType="emailAddress" 
			        	placeholder="Email"
			        	defaultValue={this.state.email}
			        	editable={false}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.emailInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit('email',text)}  />
			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name"
			        	editable={this.state.editable}
			        	defaultValue={this.state.name}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.nameInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("name",text)}/>
			        <TextInput 
			        	textContentType="familyName" 
			        	placeholder="Surname"
			        	defaultValue={this.state.surname}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.surnameInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("surname",text)}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="telephoneNumber" 
			        	placeholder="Phone"
			        	defaultValue={this.state.phone}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.phoneInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("phone",text)}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="streetAddressLine1" 
			        	placeholder="Address Line 1" 
			        	defaultValue={addresses[0]}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address1Input = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("address",text)}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="streetAddressLine2" 
			        	placeholder="Address Line 2" 
			        	defaultValue={addresses[1]}
			        	placeholderColor="#c4c3cb" 
			        	ref={(input) => { this.address2Input = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("address",text)}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="postalCode" 
			        	placeholder="Postal Code" 
			        	placeholderColor="#c4c3cb"
			        	defaultValue={this.state.postalCode}
			        	ref={(input) => { this.postalCodeInput = input; }}
			        	style={{...styles.textInputNormal}}
			        	onChangeText = {(text) => this.handleEdit("postCode",text)}
			        	editable={this.state.editable}/>
			        <TextInput 
			        	textContentType="addressCity" 
			        	placeholder="City" 
			        	placeholderColor="#c4c3cb" 
			        	defaultValue={this.state.city}
			        	ref={(input) => { this.cityInput = input; }}
			        	style={{...styles.textInputNormal}} 
			        	onChangeText = {(text) => this.handleEdit("city",text)}
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
