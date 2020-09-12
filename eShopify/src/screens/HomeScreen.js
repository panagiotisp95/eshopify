import * as React from 'react';
import styles from "./styles/style";
import { ListItem } from 'react-native-elements';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Navigation }  from "react-native-navigation"
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

const list = [
	{
	    name: 'iPhone 11 pro',
	    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
	    
	},
	{
		name: 'iPhone 11 Pro Max',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		
	}
]


const list1 = [
	{
	    name: 'Samsung s20',
	    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
	    
	},
	{
		name: 'Samsung s20',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		
	}
]

export default class HomeScreen extends React.Component {
  	constructor(props) {
    	super(props);
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		RNNDrawer.showDrawer({
			component: {
				name: "SideMenu",
				passProps: {
					animationOpenTime: 300,
					animationCloseTime: 300,
					direction: "left",
					dismissWhenTouchOutside: true,
					fadeOpacity: 0.6,
					drawerScreenWidth: "70%" || 445,
					drawerScreenHeight: "100%" || 700,
					style: {
						backgroundColor: "#dcdee0",
					},
					parentComponentId: this.props.componentId,
				},
			}
		});
	}

	searchBarOnChange(text){

	}

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

	render() {
		return (
			<View style={styles.root}><View>
				

			    <View style={styles.homeViews}>
					<Text>Top products</Text>
					{
						list.map((l, i) => (
							<ListItem
							key={i}
							leftAvatar={{ source: require('./icons/iphone.jpeg')}}
							title={l.name}
							subtitle={l.subtitle}
							onPress={() => this.viewProduct(l)}
							bottomDivider
						/>
						))
					}
				</View>
				<View style={styles.homeViews}>
					<Text>Recommended products</Text>
					{
						list1.map((l, i) => (
							<ListItem
							key={i}
							leftAvatar={{ source: require('./icons/samsung.jpeg') }}
							title={l.name}
							subtitle={l.subtitle}
							onPress={() => this.viewProduct(l)}
							bottomDivider
						/>
						))
					}
				</View>
				
			</View></View>
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
				icon: require('./icons/menuIcon.png'),
			},
		],
	}
};