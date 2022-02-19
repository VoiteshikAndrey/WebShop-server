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
        cartId: String!
        userName: String!
        role: String!
        avatar: String!
    }

    type ReturnedData {
        data: String
        errors: String
    }

    input RegisterInput {
        login: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        login: String!
        password: String!
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
        createUser(input: RegisterInput): ReturnedData
        loginUser(input: LoginInput): ReturnedData
        addProductToCart(productId: String, count: Int): Cart
    }
`);

module.exports = schema;
