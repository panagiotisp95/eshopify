const React = require("react-native");

const { StyleSheet, PixelRatio } = React;

export default {
	containerPicture: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom:20,
	    marginLeft:20,
	},
	avatarContainer: {
	    borderColor: '#9B9B9B',
	    borderWidth: 1 / PixelRatio.get(),
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginLeft:20,
	},
	avatar: {
	    borderRadius: 5,
	    width: 150,
	    height: 150,
	},
	profilePicture: {
	    borderRadius: 5,
	    marginTop: 10,
	    width: 150,
	    height: 150,
	},
	scrollview: { 
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flexGrow: 1,
	    justifyContent: 'center',
	    alignItems: 'center'
	},
	button:{
		marginLeft:30
	},
	content: {
	    backgroundColor: 'white',
	    padding: 25,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
  	},
	contentTitle: {
		fontSize: 20,
		marginBottom: 12,
	},
	view: {
		justifyContent: 'flex-end',
		margin: 0,
	},
}