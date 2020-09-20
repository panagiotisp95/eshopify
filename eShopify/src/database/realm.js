const Realm = require('realm');
import { Navigation } from 'react-native-navigation';
import { dbData } from '../setup/data'
import { date } from '../modules/date'
import { 
    PRODUCTS_SCHEMA,
    ProductsSchema,  
    ORDERS_SCHEMA, 
    OrdersSchema, 
    STORES_SCHEMA, 
    StoresSchema, 
    USERS_SCHEMA, 
	UsersSchema,
	REVIEWS_SCHEMA,
	ReviewsSchema} from './schemas';

export const databaseOptions = {
  schema: [ProductsSchema, OrdersSchema, UsersSchema, StoresSchema, ReviewsSchema],
  schemaVersion: 0
};

let realm;

export function setupRealm(){
    if (realm == undefined){
        Realm.open(databaseOptions).then(real => {
            realm=real
        })   
    }
    return realm
}

export function setupDB(){
    users = dbData.users
    if(users){
        users.forEach(item => {
            const res = realm.objects(USERS_SCHEMA).filtered(`email="${item.email}"`)
            if(Object.keys(res).length === 0){
                realm.write(() => {
                    realm.create(USERS_SCHEMA, 
                    {
                        email: item.email, 
                        password: item.password,
                        name: item.name,
                        surname: item.surname,
                        phone: item.phone,
                        address: item.address+'~',
                        postalCode: item.postalCode,
                        city: item.city,
                        confirmed: '1',
                        confirmCode: 'vyuijhWe',
                        country: item.country,
                        picture: item.picture
                    });
                });
            }
        })
    }

    stores = dbData.stores
    if (stores){
        stores.forEach(item => {
            const res = realm.objects(STORES_SCHEMA).filtered(`store_id="${item.store_id}"`)
            if(Object.keys(res).length === 0){
                realm.write(() => {
                    realm.create(STORES_SCHEMA, 
                    {
                        store_id: item.store_id,
                        name: item.name,
                        phone: item.name,
                        address: item.address,
                        postalCode: item.postalCode,
                        city: item.city,
                        country: item.country,
                        description: item.description,
                        picture: item.picture,
                    });
                });
                var store = realm.objects(STORES_SCHEMA).filtered(`store_id="${item.store_id}"`)
                var person = realm.objects(USERS_SCHEMA).filtered(`email="${item.owner}"`)
                var storeslist = person[0].stores
                realm.write(() => {
                    storeslist.push(store[0]);
                    store.owner = person[0]
                });
            }
        })
    }

    products = dbData.products
    if (products){
        products.forEach(item => {
            const res = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${item.product_id}"`)
            if(Object.keys(res).length === 0){
                realm.write(() => {
                    realm.create(PRODUCTS_SCHEMA, 
                    {
                        product_id: item.product_id,
                        name: item.name,
                        condition: item.condition,
                        brand: item.brand,
                        price: item.price,
                        quantity: item.quantity,
                        category: item.category,
                        description: item.description,
                        picture: item.picture
                    });
                });
                var product = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${item.product_id}"`)
                var store = realm.objects(STORES_SCHEMA).filtered(`store_id="${item.store}"`)
                realm.write(() => {
                    store[0].products.push(product[0]);
                    product.store = store[0]
                });
            }
        })
    }
    
    orders = dbData.orders
    if (orders){
        orders.forEach(item => {
            const res = realm.objects(ORDERS_SCHEMA).filtered(`order_id="${item.order_id}"`)
            if(Object.keys(res).length === 0){
                realm.write(() => {
                    realm.create(ORDERS_SCHEMA, 
                    {
                        order_id: item.order_id,
                        status: item.status,
                        product_id: item.product,
                        payment_method: item.payment_method,
                        date: item.date
                    });
                });
                var order = realm.objects(ORDERS_SCHEMA).filtered(`order_id="${item.order_id}"`)
                var person = realm.objects(USERS_SCHEMA).filtered(`email="${item.user}"`)
                var product = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${item.product}"`)
                realm.write(() => {
                    person[0].orders.push(order[0]);
                    product[0].store[0].orders.push(order[0]);
                    
                    order.store = product[0].store[0];
                    order.user = person[0];
                });
            }
        })
    }

    reviews = dbData.reviews
    if (reviews){
        reviews.forEach(item => {
            const res = realm.objects(REVIEWS_SCHEMA).filtered(`reviewId="${item.reviewId}"`)
            if(Object.keys(res).length === 0){
                realm.write(() => {
                    realm.create(REVIEWS_SCHEMA, 
                    {
                        reviewId: item.reviewId,
                        description: item.description,
                        rating: item.rating
                    });
                });
                var review = realm.objects(REVIEWS_SCHEMA).filtered(`reviewId="${item.reviewId}"`)
                var person = realm.objects(USERS_SCHEMA).filtered(`email="${item.reviewer}"`)
                var product = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${item.product}"`)
                realm.write(() => {
                    person[0].reviews.push(review[0]);
                    product[0].reviews.push(review[0]);
                    review.reviewer = person[0];
                    review.product = product[0];
                });
            }
        })
    }
}

export function printDB(){
    console.log("\n");
    console.log(realm.objects(USERS_SCHEMA))
    console.log("\n");
    console.log(realm.objects(ORDERS_SCHEMA))
    console.log("\n");
    console.log(realm.objects(STORES_SCHEMA))
    console.log("\n");
    console.log(realm.objects(REVIEWS_SCHEMA))
    console.log("\n");
    console.log(realm.objects(PRODUCTS_SCHEMA))
    console.log("\n");
}

export function authenticateUser(email,password, componentId){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}" && password="${password}" && confirmed="1"`)
    
    if(Object.keys(res).length < 1){
        const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}" && password="${password}"`)
        if(Object.keys(res).length > 0){
            Navigation.push(componentId, {
				component: {
                    name: 'Confirm',
                    passProps: {
                        code: res[0].confirmCode,
                        email: res[0].email
                    }
				}
            })
            return 2
        }else{
            return 0
        }   
    }
    return 1
}

export function registerUser(user){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${user.email.text}"`)
    if(Object.keys(res).length === 0){
        size = realm.objects(USERS_SCHEMA).length
        realm.write(() => {
            realm.create(USERS_SCHEMA, 
            {
                email: user.email.text, 
                password: user.password.text[0],
                name: user.name.text,
                surname: user.surname.text,
                phone: user.phone.text,
                address: user.address.text[0]+'~'+user.address.text[1],
                postalCode: user.postalCode.text,
                city: user.city.text,
                confirmed: '0',
                confirmCode: user.code,
                country: user.country.text,
                picture: user.avatarSource
            });
        });
        return true
    }else{
        return false
        
    }
}

export function updateProduct(product){
    const res = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${product.id}"`)
    if(Object.keys(res).length > 0){
        size = realm.objects(USERS_SCHEMA).length
        realm.write(() => {
            res[0].name = product.name.text
            res[0].condition = product.condition.text
            res[0].brand = product.brand.text
            res[0].price = parseFloat(product.price.text)
            res[0].category = product.category.text
            res[0].quantity = product.quantity.text
            res[0].description = product.description.text
        });
        return true
    }else{
        return false
        
    }
}

export function updateUser(user){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${user.email}"`)
    if(Object.keys(res).length > 0){
        size = realm.objects(USERS_SCHEMA).length
        realm.write(() => {
                res[0].name = user.name
                res[0].surname = user.surname
                res[0].phone = user.phone
                res[0].address = user.address
                res[0].postalCode = user.postalCode
                res[0].city = user.city
        });
        return true
    }else{
        return false
        
    }
}

export function getOrdersForUser(email){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}"`)
    if(Object.keys(res).length > 0){
        products =[];
        res[0].orders.map((l,i) => (
            products.push(realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${l.product_id}"`)[0])
            
        ));
        console.log(products)
        return products;
    }else{
        return []
        
    }
}

export function getStoresForUser(email){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}"`)
    if(Object.keys(res).length > 0){
        return res[0].stores;
    }else{
        return []
        
    }
}

export function getTotalEarnings(email){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}"`)
    if(Object.keys(res).length > 0){
        total = 0.0;
        res[0].stores.map(item => {
            item.orders.map(item => {
                total+=realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${item.product_id}"`)[0].price;
            })
        })
        return total.toString();
    }else{
        return 0.0.toString();
        
    }
}

export function getProductsForStore(storeid){
    const res = realm.objects(STORES_SCHEMA).filtered(`store_id="${storeid}"`)
    if(Object.keys(res).length > 0){
        return res[0].products;
    }else{
        return []
    }
}

export function confirmEmail(email){
    const res = realm.objects(USERS_SCHEMA).filtered(`email="${email}"`)
    if(res[0].confirmed == '0'){
        realm.write(() => {
            res[0].confirmed = '1';
        });
    }
}

export function addProduct(product){
    const res = realm.objects(PRODUCTS_SCHEMA).filtered(`name="${product.name.text}"`)
    if(Object.keys(res).length === 0){
        size = realm.objects(PRODUCTS_SCHEMA).length
        realm.write(() => {
            realm.create(PRODUCTS_SCHEMA, 
            {
                product_id: size+1,
                name: product.name.text,
                condition: product.condition.text,
                brand: product.brand.text,
                price: parseFloat(product.price.text),
                category: product.category.text,
                quantity: parseInt(product.quantity.text,10),
                description: product.description.text,
                picture: product.picture
            });
        });
        var producto = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${size+1}"`)
        var store = realm.objects(STORES_SCHEMA).filtered(`store_id="${product.id}"`)
        realm.write(() => {
            store[0].products.push(producto[0]);
            producto[0].store = store[0]
        });
        return true
    }else{
        return false
        
    }
}

export function addStore(store){
    const res = realm.objects(STORES_SCHEMA).filtered(`email="${user.email.text}"`)
    if(Object.keys(res).length === 0){
        size = realm.objects(STORES_SCHEMA).length
        realm.write(() => {
            realm.create(STORES_SCHEMA, 
            {
                store_id: size+1,
                name: store.name,
                phone: store.name,
                address: store.address,
                postalCode: store.postalCode,
                city: store.city,
                country: store.country,
                description: store.description,
                picture: null,
            });
        });
        let r = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${size+1}"`)
        res = realm.objects(USERS_SCHEMA).filtered(`email="${store.email}"`)
        let storeslist = res[0].stores
        realm.write(() => {
            storeslist.push(r);
            r.owner = product.store
        });
        return true
    }else{
        return false
        
    }
}

export function getUser(email){
    res = realm.objects(USERS_SCHEMA).filtered(`email="${email}"`)
    if(Object.keys(res).length > 0){
        return res[0];
    }
    return {}
}

export function getProduct(product_id){
    res = realm.objects(PRODUCTS_SCHEMA).filtered(`product_id="${product_id}"`)
    if(Object.keys(res).length > 0){
        return res[0];
    }
    return {}
}

export function getRecomendedProducts(){
    result = realm.objects(PRODUCTS_SCHEMA).filtered('price < 50')
    if(Object.keys(result).length > 0){
        return result;
    }
    return {}
}

export function searchProducts(text){
    name_result = realm.objects(PRODUCTS_SCHEMA).filtered(`name CONTAINS "${text}"`)
    description_result = realm.objects(PRODUCTS_SCHEMA).filtered(`description CONTAINS "${text}"`)
    name_result1 = realm.objects(STORES_SCHEMA).filtered(`name CONTAINS "${text}"`)
    description_result1 = realm.objects(STORES_SCHEMA).filtered(`description CONTAINS "${text}"`)

    products_result = []
    store_result = []
    name_result.map((l, i) => (
        products_result.push(l)
    ))
    description_result.map((l, i) => (
        products_result.push(l)
    ))
    name_result1.map((l, i) => (
        store_result.push(l)
    ))
    description_result1.map((l, i) => (
        store_result.push(l)
    ))
    return {stores: store_result, products: products_result}
}