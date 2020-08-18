import * as React from 'react';
import styles from "./style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';

const { Navigation } = require('react-native-navigation');

export default class SettingsScreen extends React.Component {

  render() {
    return (
      <View style={styles.root}>
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={() => Navigation.push(this.props.componentId, {
          component: {
            name: 'Home'
          }
        })} />
    </View>
      
    );
  }
}

SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings'
    }
  }
};
