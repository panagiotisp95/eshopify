import * as React from 'react';
import styles from "./styles/style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { ListItem } from 'react-native-elements';

const { Navigation } = require('react-native-navigation');

export default class SideMenu extends React.Component {
  	buttonpress(dest){
	    Navigation.push(this.props.parentComponentId, {
			component: {
				name: dest,
			},
	    });
	    RNNDrawer.dismissDrawer();
	}

  	render() {
		return (
			<View style={styles.root}>
			<View style={styles.top}>
				<ListItem
					key={1}
					leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
					title={'Kokos kokou'}
					subtitle={'LOKO'}
					onPress={() => this.buttonpress('Dashboard')}
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
					title='Settings'
					color='#710ce3'
					onPress={() => this.buttonpress('Settings')}
				/>
			</View></View>
		);
  	}
}
