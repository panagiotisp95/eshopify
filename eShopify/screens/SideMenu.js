import * as React from 'react';
import styles from "./style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { RNNDrawer } from "react-native-navigation-drawer-extension";

const { Navigation } = require('react-native-navigation');

export default class SideMenu extends React.Component {
  buttonpress(){
    Navigation.push(this.props.parentComponentId, {
      component: {
        name: "Settings",
      },
    });
    RNNDrawer.dismissDrawer();
  }
  render() {
    return (
      <View style={styles.root}>
      <View style={styles.top}>
      <Button
        title='APOEL'
        color='#710ce3'
        onPress={() => this.buttonpress()}
      />
      <Button
        title='lolo'
        color='#710ce3'
        onPress={() => this.buttonpress()}
      />
      <Button
        title='exoxo'
        color='#710ce3'
        onPress={() => this.buttonpress()}
      />
      <Button
        title='popo'
        color='#710ce3'
        onPress={() => this.buttonpress()}
      />
    </View></View>
      
    );
  }


}
