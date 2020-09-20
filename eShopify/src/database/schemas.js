export const PRODUCTS_SCHEMA = 'Products';
export const ProductsSchema = {
  name: PRODUCTS_SCHEMA,
  primaryKey: 'product_id',
  properties: {
    product_id: 'int',
    name: 'string',
    condition: 'string',
    brand: 'string',
    price: 'double',
    quantity: 'int',
    category: 'string',
    description: 'string',
    reviews: 'Reviews[]',
    picture: 'string',
    store: {type: 'linkingObjects', objectType: 'Stores', property: 'products'}
    
  }
};

export const ORDERS_SCHEMA = 'Orders';
export const OrdersSchema = {
  name: ORDERS_SCHEMA,
  primaryKey: 'order_id',
  properties: {
    order_id: 'int',
    product_id: 'int',
    store: {type: 'linkingObjects', objectType: 'Stores', property: 'orders'},
    user: {type: 'linkingObjects', objectType: 'Users', property: 'orders'},
    status: 'int',
    payment_method: 'string',
    date: 'date'
  }
};

export const STORES_SCHEMA = 'Stores';
export const StoresSchema = {
  name: STORES_SCHEMA,
  primaryKey: 'store_id',
  properties: {
    store_id: 'int',
    name: 'string',
    phone: 'string',
    address: 'string',
    postalCode: 'string',
    city: 'string',
    country: 'string',
    description: 'string',
    products: 'Products[]',
    orders: 'Orders[]',
    owner: {type: 'linkingObjects', objectType: 'Users', property: 'stores'},
    picture: 'string',
    reviews: 'Reviews[]'
  }
};

export const USERS_SCHEMA = 'Users';
export const UsersSchema = {
  name: USERS_SCHEMA,
  primaryKey: 'email',
  properties: {
    email: 'string',
    password: 'string',
    name: 'string',
    surname: 'string',
    phone: 'string',
    address: 'string',
    postalCode: 'string',
    city: 'string',
    country: 'string',
    confirmed: 'string',
    confirmCode: 'string',
    orders: 'Orders[]',
    stores: 'Stores[]',
    picture: 'string',
    reviews: 'Reviews[]'
  }
};

export const REVIEWS_SCHEMA = 'Reviews';
export const ReviewsSchema = {
  name: REVIEWS_SCHEMA,
  primaryKey: 'reviewId',
  properties: {
    reviewId: 'int',
    description: 'string',
    rating: 'int',
    reviewer: {type: 'linkingObjects', objectType: 'Users', property: 'reviews'},
    product: {type: 'linkingObjects', objectType: 'Products', property: 'reviews'},
  }
};