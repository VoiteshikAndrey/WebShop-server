const {buildSchema} = require('graphql');

const schema = buildSchema(`

    type Product { 
        id: ID
        category: String
        productname: String
        productbrand: String
        images: [String]
        price: Int
    }

    type Cart {
        id: ID
        productList:[ProductList]
        totalPrice: String
    }

    type ProductList {
        productId: String!
        count: Int!
    }

    type User {
        id: ID
        login: String!
        password: String!
        userName: String!
        role: String!
        avatar: String!
    }

    type ReturnedData {
        data: String
        errors: String
    }

    input UserInput {
        login: String!
        password: String!
        confirmPassword: String!
    }

    input ProductInput { 
        id: ID
        category: String!
        productname: String!
        productbrand: String!
        images: [String]!
        price: Int!
    }

    type Query {
        getAllProducts: [Product]
        getProduct(id: ID): Product
        getCart(id: ID): Cart
    }

    type Mutation {
        createProduct(input: ProductInput): Product
        createUser(input: UserInput): ReturnedData
        addProductToCart(productId: String, count: Int): Cart
    }
`);

module.exports = schema;
