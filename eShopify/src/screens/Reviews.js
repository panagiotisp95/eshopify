import * as React from 'react';
import styles from "./styles/style";
import { Navigation }  from "react-native-navigation"
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Keyboard, 
		 Text,
		 Button, 
		 View, 
		 TextInput, 
		 TouchableWithoutFeedback, 
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';

export default class ReviewsScreen extends React.Component {
	state = {}
  	constructor(props) {
		super(props)
    	Navigation.events().bindComponent(this);
  	}

	navigationButtonPressed({ buttonId }) {
		
	}

	ratingCompleted(rating) {
		console.log("Rating is: " + rating)
	  }

	render() {
		return (
			<View style={styles.root}>
				<Rating
					showRating
					startingValue={1}
					onFinishRating={this.ratingCompleted}
					ratingCount={5}
					style={{ paddingVertical: 10 }}
				/>
				<TextInput
					multiline={true}
					numberOfLines={4}
					onChangeText={(text) => this.setState({text:text})}
					style={styles.textarea} 
					value={this.state.text}
				/>
			</View>
		);
	}

	
}

