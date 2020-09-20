import * as React from 'react';
import styles from "./styles/style";
import { ListItem, SearchBar } from 'react-native-elements';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Navigation }  from "react-native-navigation"
import { sideMenuOptions } from "../setup/index"
import { searchProducts,getRecomendedProducts } from '../database/realm';
import { SafeAreaView,ScrollView,Text,View } from 'react-native';


export default class HomeScreen extends React.Component {
	state = {
		search: null,
		isLoading: false,
		searchResults: {},
		products: getRecomendedProducts()
	}
  	constructor(props) {
		super(props)
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		RNNDrawer.showDrawer(sideMenuOptions(this.props.email, this.props.componentId));
	}
	
	updateSearch = (search) => {
		console.log(search)
		if(search.length>0){
			this.setState({isLoading: true})
			this.setState({searchResults: searchProducts(search)}) 
		}else{
			this.setState({isLoading: false})
		}
		this.setState({search: search});
	};

	viewProduct(product){
		Navigation.push(this.props.componentId, {
			component: {
				name: 'ProductView',
				options: {
			    	topBar: {
			    		title: {
			    			text: product.name
			        	}
			      	}
			    }
			}
		})
	}

	whatToShow(){
		if(this.state.isLoading){
			return this.loadingResults();
		}else{
			return this.normalView();
		}
	}

	normalView(){
		return(
			<View style={styles.homeViews}>
				<Text>Recommended products</Text>
				{
					this.state.products.map((l, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: l.picture } }}
							title={l.name}
							subtitle={l.price}
							onPress={() => this.viewProduct(l)}
							bottomDivider
						/>
					))
				}
			</View>
		)
	}

	loadingResults(){
		return(
			<View style={styles.homeViews}>
				<Text>Products</Text>
				{
					this.state.searchResults.products.map((l, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: l.picture } }}
							title={l.name}
							subtitle={l.price}
							onPress={() => this.viewProduct(l)}
							bottomDivider
						/>
					))
				}
				<Text>Stores</Text>
				{
					this.searchResults(this.state.searchResults.stores)
				}
			</View>
		)
	}

	searchResults(results){
		if(results.length>0){
			return (
				this.state.searchResults.stores.map((l, i) => (
					<ListItem
						key={i}
						leftAvatar={{ source: { uri: l.picture } }}
						title={l.name}
						subtitle={l.city}
						onPress={() => this.viewProduct(l)}
						bottomDivider
					/>
				))
			)
		}else{
			return ( <Text>    No results</Text> )
		}
	}

	render() {
		const { search } = this.state;
		return (
			<SafeAreaView style={styles.containerse}>
			<ScrollView style={styles.scrollView}>
			<View style={styles.root}>
				<SearchBar
					placeholder="Type Here..."
					showLoading={this.state.isLoading}
					lightTheme={true}
					round={true}
					onChangeText={this.updateSearch}
					value={search}
				/>
				{this.whatToShow()}
			</View>
			</ScrollView>
			</SafeAreaView>
		);
	}
}

HomeScreen.options = {
	topBar: {
		title: {
			text: 'Home'
		},
		leftButtons: [
			{
				id: 'sideMenubtn',
				icon: require('../icons/menuIcon.png'),
			},
		],
	}
};
