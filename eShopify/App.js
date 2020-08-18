import * as React from 'react';
import styles from "./style";
import {Keyboard, Text,Button, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';



class LoginScreen extends React.Component {

  state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false
   }
   handleEmail = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.setState({ email: text })

      if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        this.setState({ validEmail: false })
        return false;
      }
      else {
        console.log("Email is Correct");
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
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}> eShopify </Text>
            <TextInput textContentType="emailAddress" placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText = {this.handleEmail} />
            <TextInput textContentType="password" placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText = {this.handlePassword}/>
            <Button
              title="Login"
              disabled={!this.state.validEmail || !this.state.validPassword}
              accessibilityLabel="Login button"
              onPress={() => this.onLoginPress(this.state.email,this.state.password)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress(email, password) {
    if(email=="aa@gg.cc"){
      alert("authenticated")
    }
  }
}

class HomeScreen extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...component={HomeScreen}} extraData={"someData"} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...component={LoginScreen}} extraData={"dd"} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
