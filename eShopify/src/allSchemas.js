export const PRODUCTS_SCHEMA = 'Products';
export const ProductsSchema = {
  name: PRODUCTS_SCHEMA,
  primaryKey: 'product_id',
  properties: {
    product_id: 'int',
    product_name: 'string',
    condition: 'string',
    brand: 'string',
    price: 'double',
    quantity: 'int',
    description: 'string',
    store: {type: 'linkingObjects', objectType: 'Stores', property: 'products'}
  }
};

export const ORDERS_SCHEMA = 'Orders';
export const OrdersSchema = {
  name: ORDERS_SCHEMA,
  primaryKey: 'order_id',
  properties: {
    order_id: 'int',
    products_id: 'int',
    store_id: 'int',
    user_id: 'int',
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
    owner: {type: 'linkingObjects', objectType: 'Users', property: 'stores'},
    picture: 'data?'
  }
};

export const USERS_SCHEMA = 'Users';
export const UsersSchema = {
  name: USERS_SCHEMA,
  primaryKey: 'user_id',
  properties: {
    user_id: 'int',
    email: 'string',
    password: 'string',
    name: 'string',
    surname: 'string',
    phone: 'string',
    address: 'string',
    postalCode: 'string',
    city: 'string',
    country: 'string',
    stores: 'Stores[]',
    picture: 'data?'
  }
};
