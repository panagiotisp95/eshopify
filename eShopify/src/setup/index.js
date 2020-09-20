export const loginRoot = {
	root: {
		stack: {
			children: [
				{
					component: {
						name: 'Login'
					}
				},
			]
		}
	}
};

export const storeOwnerOptions = [
	{
	    name: 'Product List',
	    dest: 'ProductList',
	    num: 0,
	},
	{
		name: 'Pending Orders',
		dest: 'Orders',
		num: 1
	},
	{
		name: 'Shipped Orders',
		dest: 'Orders',
		num: 2
	},
	{
		name: 'Completed Orders',
		dest: 'Orders',
		num: 3,
	},
	{
		name: 'Edit Store Details',
		dest: 'AddEditStore',
		num: 4,
	}
]

export function homeRoot(email) {
    mainRoot = {
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Home',
                            passProps: {
                                email: email
                              }
                        }
                    }
                ]
            }
        }
    };
    return mainRoot;
}

export function quantity() {
	q = [];
	var i;
	for (i = 0; i < 10000; i++) { 
		q.push({
			value:i,
			label:i.toString()
		})
	}
    return q;
}

export const conditions = [
	{
		value:'0',
		label:'Brand New'
	},
	{
		value:'1',
		label:'Used'
	},
	{
		value:'2',
		label:'Used, like new'
	},
	{
		value:'3',
		label:'Used, bad condition'
	},
	{
		value:'4',
		label:'Used, for parts'
	},
]

export function sideMenuOptions(email, componentId) {
    side = {
        component: {
            name: "SideMenu",
            passProps: {
                animationOpenTime: 300,
                email: email,
                animationCloseTime: 300,
                direction: "left",
                dismissWhenTouchOutside: true,
                fadeOpacity: 0.6,
                drawerScreenWidth: "70%" || 445,
                drawerScreenHeight: "100%" || 700,
                style: {
                    backgroundColor: "#dcdee0",
                },
                parentComponentId: componentId,
            },
        }
    }
    return side;
}

export function listPickerStyling(borderColor) {
    response = {
            inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: borderColor,
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
                ontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'purple',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,
                    backgroundColor: 'transparent',
            },
            iconContainer: {
                top: 25,
                right: 30,
            },
        }
    return response;
}

export function getCategoryByName(name){
	var i;
	for (i=0; i<categories.length; i++){
		if(categories[i].label == name){
			return i.toString();
		}
	}
	return (i-1).toString();
}

export function getConditionByName(name){
	var i;
	for (i=0; i<conditions.length; i++){
		if(conditions[i].label == name){
			return i.toString();
		}
	}
	return (i-1).toString();
}

export const categories = [
	{
		value:'0',
		label:'Art'
	},
	{
		value:'1',
		label:'Books, Comics & Magazines'
	},
	{
		value:'2',
		label:'Cameras & Photography'
	},
	{
		value:'3',
		label:'Clothes, Shoes & Accessories'
	},
	{
		value:'4',
		label:'Collectables'
	},
	{
		value:'5',
		label:'Computers/Tablets & Networking'
	},
	{
		value:'6',
		label:'Crafts'
	},
	{
		value:'7',
		label:'Dolls & Bears'
	},
	{
		value:'8',
		label:'DVDs, Films & TV'
	},
	{
		value:'9',
		label:'Events Tickets'
	},
	{
		value:'10',
		label:'Garden & Patio'
	},
	{
		value:'11',
		label:'Health & Beauty'
	},
	{
		value:'12',
		label:'Holidays & Travel'
	},
	{
		value:'13',
		label:'Home, Furniture & DIY'
	},
	{
		value:'14',
		label:'Jewellery & Watches'
	},
	{
		value:'15',
		label:'Mobile Phones & Communication'
	},
	{
		value:'16',
		label:'Musical Instruments'
	},
	{
		value:'17',
		label:'Pet Supplies'
	},
	{
		value:'18',
		label:'Pottery, Porcelain & Glass'
	},
	{
		value:'19',
		label:'Property'
	},
	{
		value:'20',
		label:'Sound & Vision'
	},
	{
		value:'21',
		label:'Sporting Goods'
	},
	{
		value:'22',
		label:'Sports Memorabilia'
	},
	{
		value:'23',
		label:'Stamps'
	},
	{
		value:'24',
		label:'Toys & Games'
	},
	{
		value:'25',
		label:'Vehicle Parts & Accessories'
	},
	{
		value:'26',
		label:'Video Games & Consoles'
	},
	{
		value:'27',
		label:'Wholesale & Job Lots'
	},
	{
		value:'28',
		label:'Everything Else'
	}
]