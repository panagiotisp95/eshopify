import * as React from 'react';
import styles from "./styles/style";
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from 'react-native-elements';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
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
const list = [
	{
	    name: 'Amy Farha',
	    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
	    subtitle: 'Vice President'
	},
	{
		name: 'Chris Jackson',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		subtitle: 'Vice Chairman'
	}
]

export default class HomeScreen extends React.Component {
  	state = {
    	email: '',
    	password: '',
    	validEmail: false,
    	validPassword: false,
    	isVisible :false,
  	}

  	constructor(props) {
    	super(props);
    	Navigation.events().bindComponent(this);
  	}

	handleEmail = (text) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		this.setState({ email: text })

		if (reg.test(text) === false) {
			this.setState({ validEmail: false })
			return false;
		}
		else {
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
	}

	render() {
		return (
			<View style={styles.root}><View>
				{
					list.map((l, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: l.avatar_url } }}
							title={l.name}
							subtitle={l.subtitle}
							onPress={() => Navigation.push(this.props.componentId, {
								component: {
									name: 'Settings'
								}
							})}
							bottomDivider
						/>
					))
				}
			</View></View>
		);
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
}

const mainRoot = {
	root: {
		children: [
			{
				stack: {
					children: [
						{
							component: {
								name: 'Home'
							}
						},
					]
				}
			},
			{
				stack: {
					children: [
						{
							component: {
								name: 'Settings'
							}
						}
					]
				}
			}
		]
	}
};

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
