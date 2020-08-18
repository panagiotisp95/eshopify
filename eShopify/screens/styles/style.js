const React = require("react-native");

const { StyleSheet, PixelRatio } = React;

export default {
	//picker in register
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center'
	},
	picker: {
	    height: 200,
	    width: 200
	},
	chart: {
		marginTop:15,
		marginBottom:15,
		marginLeft:15,
		marginRight:15,
		justifyContent: 'center',
	    alignItems: 'center',
	},
	chartTitle: {
		fontSize: 30,
	    fontWeight: "600",
	    textAlign: 'center',
	},
	// for modal in register
	registerFormCountryInput: {
	    height: 43,
	    fontSize: 14,
	    borderRadius: 5,
	    borderWidth: 1,
	    borderColor: '#eaeaea',
	    backgroundColor: '#fafafa',
	    paddingLeft: 10,
	    marginLeft: 15,
	    marginRight: 15,
	    marginTop: 5,
	    marginBottom: 5,
	},

	// register picture
	containerPicture: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom:20,
	},
	avatarContainer: {
	    borderColor: '#9B9B9B',
	    borderWidth: 1 / PixelRatio.get(),
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	avatar: {
	    borderRadius: 50,
	    width: 150,
	    height: 150,
	},

	// register safearea
	containerse: {
	    flex: 1,
	    marginTop: 20,
	},
	inputIOS: {
	    fontSize: 16,
	    paddingVertical: 12,
	    paddingHorizontal: 10,
	    borderWidth: 1,
	    borderColor: '#eaeaea',
	    backgroundColor: '#fafafa',
	    borderRadius: 4,
	    color: 'black',
	    paddingRight: 30,
	    marginLeft: 15,
	    marginRight: 15,
	    marginTop: 5,
	    marginBottom: 5,
	},
	inputAndroid: {
	    fontSize: 16,
	    paddingHorizontal: 10,
	    paddingVertical: 8,
	    borderWidth: 0.5,
	    borderColor: 'purple',
	    borderRadius: 8,
	    color: 'black',
	    paddingRight: 30, // to ensure the text is never behind the icon
	},


	//login screen
	containerView: {
	    flex: 1,
	},
	top: {
	    marginTop: 100,
	},
	loginScreenContainer: {
	    flex: 1,
	},
	logoText: {
	    fontSize: 40,
	    fontWeight: "800",
	    marginTop: 150,
	    marginBottom: 30,
	    textAlign: 'center',
	},

	loginFormView: {
	    flex: 1
	},
	textForgotText: {
	    marginLeft: 15,
	},
	textInputNormal: {
	    height: 43,
	    fontSize: 14,
	    borderRadius: 5,
	    borderWidth: 1,
	    borderColor: '#eaeaea',
	    backgroundColor: '#fafafa',
	    paddingLeft: 10,
	    marginLeft: 15,
	    marginRight: 15,
	    marginTop: 5,
	    marginBottom: 5,
	},
	loginButton: {
	    backgroundColor: '#3897f1',
	    borderRadius: 5,
	    height: 45,
	    marginTop: 10,
	},
	fbLoginButton: {
	    height: 45,
	    marginTop: 10,
	    backgroundColor: 'transparent',
	},
};
