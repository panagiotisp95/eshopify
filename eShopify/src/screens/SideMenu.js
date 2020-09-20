import * as React from 'react';
import styles from "./styles/style";
import { Button, View } from 'react-native';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { ListItem } from 'react-native-elements';
import { getUser } from '../database/realm';
import { loginRoot } from '../setup/index';
const { Navigation } = require('react-native-navigation');

export default class SideMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: getUser(this.props.email)
		}
	}

  	buttonpress(dest){
  		if(dest == 'Sign out'){
  			RNNDrawer.dismissDrawer();
  			Navigation.setRoot(loginRoot);
  		}else{
		    Navigation.push(this.props.parentComponentId, {
				component: {
					name: dest,
					passProps: {
						email:this.props.email
					}
				},
		    });
		    RNNDrawer.dismissDrawer();
		}
	}

  	render() {
		return (
			<View style={styles.root}>
			<View style={styles.top}>
				<ListItem
					key={1}
					leftAvatar={{ source: require('../icons/avatar.png') }}
					title={this.state.user.name}
					subtitle={this.state.user.surname}
					onPress={() => this.buttonpress('Profile')}
					bottomDivider
				/>
				<Button
					title='Dashboard'
					color='#710ce3'
					onPress={() => this.buttonpress('Dashboard')}
				/>
				<Button
					title='Profile'
					color='#710ce3'
					onPress={() => this.buttonpress('Profile')}
				/>
				<Button
					title='Orders'
					color='#710ce3'
					onPress={() => this.buttonpress('Orders')}
				/>
				<Button
					title='Sign Out'
					color='#710ce3'
					onPress={() => this.buttonpress('Sign out')}
				/>
			</View></View>
		);
  	}
}

