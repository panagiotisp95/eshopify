import * as React from 'react';
import styles from "./styles/style";
import { ListItem } from 'react-native-elements';
import { Navigation }  from "react-native-navigation"
import { Keyboard, 
		 Text,
		 Dimensions,
		 Button, 
		 View, 
		 TextInput,
		 TouchableWithoutFeedback,
		 SafeAreaView,
		 ScrollView,
		 Alert, 
		 KeyboardAvoidingView
		} from 'react-native';
import {
		LineChart,
		BarChart,
		PieChart,
		ProgressChart,
		ContributionGraph,
		StackedBarChart
		} from "react-native-chart-kit";

const list = [
	{
	    name: 'New Story 1',
	    subtitle: 'Protaras',
	    dest: 'OwnerStore',
	},
	{
		name: 'New Story 2',
		subtitle: 'Larnaca',
		dest: 'OwnerStore',
	}
]

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Month Earnings"] // optional
};
const screenWidth = Dimensions.get("window").width-30;
const chartConfig = {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    };

export default class DashboardScreen extends React.Component {
	constructor(props) {
    	super(props);
    	Navigation.events().bindComponent(this);
  	}

  	navigationButtonPressed({ buttonId }) {
  		if(buttonId == 'addStoreBtn'){
	  		Navigation.push(this.props.componentId, 
	  			{
					component: {
						name: 'AddEditStore',
					}
				}
			)
	  	}
  	}

  	handleStorePress(screenName, storeName){
  		Navigation.push(
  			this.props.componentId, 
  			{
				component: {
					name: screenName,
					options: {
				    	topBar: {
				    		title: {
				    			text: storeName
				        	}
				      	}
				    },
				    
				}
			}
		)
  	}

	render() {
		return (
			<SafeAreaView>
			<ScrollView style={styles.scrollView}>
			<View style={styles.root}>
				{
					list.map((l, i) => (
						<ListItem
							key={i}
							title={l.name}
							subtitle={l.subtitle}
							onPress={() => this.handleStorePress(l.dest, l.name)}
							bottomDivider
							chevron
						/>
					))
				}
				<View style={styles.chart}>
				  	<View><Text style={styles.chartTitle}>Earnings</Text></View>
				  	<LineChart
						data={data}
						width={screenWidth}
						height={220}
						chartConfig={chartConfig}
						bezier
					    style={{
					      marginVertical: 8,
					      borderRadius: 16
					    }}
					/>
				</View>
			</View>
			</ScrollView>
			</SafeAreaView>
		);
	}
}

DashboardScreen.options = {
	topBar: {
		title: {
			text: 'Dashboard'
		},
		rightButtonColor: '#ffffff',
		rightButtons: [
			{
				id: 'addStoreBtn',
				text: 'Add Store',
			},
		],
		
	}
};