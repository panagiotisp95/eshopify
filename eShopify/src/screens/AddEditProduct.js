import * as React from 'react';
import styles from "./styles/style";
import productStyles from "./styles/AddEditProductStyle";
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import {Chevron} from 'react-native-shapes'
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { standardBorderColor } from "./styles/style";
import  { categories,quantity,listPickerStyling, conditions, getCategoryByName,getConditionByName } from '../setup/index'
import { addProduct, updateProduct, getProduct } from '../database/realm'
import {
			Image,Pressable,SafeAreaView,ScrollView,
			Keyboard,Text,Button,View,TextInput,
			TouchableWithoutFeedback,KeyboardAvoidingView
		} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class AddEditProduct extends React.Component {
  	state = {};
	name = {text: '', borderColor: standardBorderColor};
	brand = {text:'', borderColor: standardBorderColor};
	condition = {text: '', borderColor: standardBorderColor};
	quantity = {text: '', borderColor: standardBorderColor};
	price = {text: '', borderColor: standardBorderColor};
	category = {text: '', borderColor: standardBorderColor};
	description = {text: '', borderColor: standardBorderColor};
	list =[];

	constructor(props) {
		super(props)
		if(this.props.screenName == 'Edit'){
			var product = getProduct(this.props.id)
			this.id = this.props.id;
			this.name.text = product.name;
			this.category.text = product.category;
			this.brand.text = product.brand;
			this.quantity.text = product.quantity;
			this.condition.text = product.condition;
			this.price.text = product.price.toString();
			this.description.text = product.description;
		}else{
			this.id = this.props.storeid
		}
		console.log(this.id)
		Navigation.events().bindComponent(this);

		this.handlePhotoTapped = this.handlePhotoTapped.bind(this);
		this.handleProductName = this.handleProductName.bind(this);
		this.handleProductBrand = this.handleProductBrand.bind(this);
		this.handleProductPrice = this.handleProductPrice.bind(this);
		this.handleProductCategory = this.handleProductCategory.bind(this);
		this.handleProductDescription = this.handleProductDescription.bind(this);
		this.handleProductCondition = this.handleProductCondition.bind(this);
		this.handleProductQuantity = this.handleProductQuantity.bind(this);

		this.state = {
			list: this.list,
			name: this.name,
			category: this.category,
			brand: this.brand,
			quantity: this.quantity,
			condition: this.condition,
			price: this.price,
			description: this.description,
			isFocusStyle: false,
			validPassword: true,
			isModalVisible: false,
			picture: '',
			id:this.id
		}
	}

	toggleModal = () => {
	    this.setState({isModalVisible: !this.state.isModalVisible});
	};

	handleProductName(str){
		this.name.text = str;
		this.name.borderColor = standardBorderColor;
		this.setState({ name: this.name });
	}

	handleProductBrand(str){
		this.brand.text = str;
		this.brand.borderColor = standardBorderColor;
		this.setState({ brand: this.brand });
	}

	handleProductPrice(str){
		this.price.text = str;
		this.price.borderColor = standardBorderColor;
		this.setState({ price: this.price });
	}

	handleProductDescription(str){
		this.description.text = str;
		this.description.borderColor = standardBorderColor;
		this.setState({ description: this.description });
	}

	handleProductCategory(value,index){
		this.category.text = value;
		this.category.borderColor = standardBorderColor;
		this.setState({ category: this.category });
	}

	handleProductCondition(value,index){
		this.condition.text = value;
		this.condition.borderColor = standardBorderColor;
		this.setState({ condition: this.condition });
	}

	handleProductQuantity(value,index){
		this.quantity.text = value;
		this.quantity.borderColor = standardBorderColor;
		this.setState({ quantity: this.quantity });
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

	onPhotoAddPress() {
		this.list.push(null);
		this.setState({list: this.list})
	}

	navigationButtonPressed({ buttonId }) {
		if(buttonId === 'doneAddProductbtn'){
			if(this.props.screenName == 'Edit'){
				updateProduct(this.state);
				Toast.show('Edited Successfully');
			}else{
				addProduct(this.state);
				Toast.show('Added Successfully');
			}
			Navigation.pop(this.props.componentId);
		}
	}

	render() {
		const categoryPlaceholder = {
			label: 'Select a Category...',
			value: null,
		};

		const conditionPlaceholder = {
			label: 'Select a Condition...',
			value: null,
		};
		const quantityPlaceholder = {
			label: 'Select Quantity...',
			value: null,
		};
		const quant = quantity()
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
									onPress={() => this.onPhotoAddPress()}
								>Add Photo</Icon.Button>
							) : (
								<Icon.Button
									name="plus"
									color="#656566"
									backgroundColor="#ffffff"
									onPress={() => this.onPhotoAddPress()}
									style={productStyles.button}
								></Icon.Button>
							)}
						</ScrollView>
			        </View>
			        <TextInput 
			        	textContentType="name" 
			        	placeholder="Name"
			        	defaultValue={this.state.name.text}
			        	placeholderColor="#c4c3cb" 
			        	style={{...styles.textInputNormal, borderColor: this.state.name.borderColor }} 
			        	onChangeText = {this.handleProductName}/>
					<TextInput 
			        	placeholder="Brand" 
						placeholderColor="#c4c3cb" 
						defaultValue={this.state.brand.text}
			        	style={{...styles.textInputNormal, borderColor: this.state.brand.borderColor }} 
			        	onChangeText = {this.handleProductBrand}/>
			        <TextInput 
			        	placeholder="Price" 
						placeholderColor="#c4c3cb" 
						defaultValue={this.state.price.text}
			        	style={{...styles.textInputNormal, borderColor: this.state.price.borderColor }} 
			        	onChangeText = {this.handleProductPrice}/>
			        <TextInput
					    multiline={true}
					    style={{...styles.textInputNormal, borderColor: this.state.description.borderColor, height: 100 }} 
					    placeholder='Description'
						numberOfLines={4}
						defaultValue={this.state.description.text}
					    onChangeText={this.handleProductDescription}
					    value={this.state.text}/>
					<RNPickerSelect 
			        	placeholder={categoryPlaceholder}
						items={categories}
						value={getCategoryByName(this.state.category.text)}
			          	onValueChange={(value,index) => {this.handleProductCategory(value,index)}}
			          	style={listPickerStyling(this.state.category.borderColor)}
						textInputProps={{ underlineColorAndroid: 'cyan' }}
						Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
					<RNPickerSelect 
			        	placeholder={quantityPlaceholder}
						items={quant}
						value={parseInt(this.state.quantity.text,10)}
			          	onValueChange={(value,index) => {this.handleProductQuantity(value,index)}}
			          	style={listPickerStyling(this.state.quantity.borderColor)}
						textInputProps={{ underlineColorAndroid: 'cyan' }}
						Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
					<RNPickerSelect 
			        	placeholder={conditionPlaceholder}
						items={conditions}
						value={getConditionByName(this.state.condition.text)}
			          	onValueChange={(value,index) => {this.handleProductCondition(value,index)}}
			          	style={listPickerStyling(this.state.condition.borderColor)}
						textInputProps={{ underlineColorAndroid: 'cyan' }}
						Icon={() => {return <Chevron size={1.5} color="gray" />;}}/>
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












