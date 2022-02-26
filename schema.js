const {buildSchema} = require('graphql');

const schema = buildSchema(`

    type Product { 
        id: ID
        category: String
        productname: String
        productbrand: String
        images: [String]
        price: Int
        characteristics: Characteristics
    }

    type Characteristics { 
        characteristicsName: String
        variants: [Variants]
    }

    type Variants { 
        variantName: String
        number: Int
        id: ID
    }

    type Cart {
        id: ID
        productList:[ProductList]
        totalPrice: String 
    }

    type ProductList {
        productId: String!
        characteristic: ID!
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

    input ProductListInput {
        productId: String!
        count: Int!
    }

    input LoginInput {
        login: String!
        password: String!
    }

    input CartInput {
        id: ID
        productList: String
        totalPrice: String 
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
        getProductsByCategory(category: String): [Product]
        getCart(id: ID): Cart
    }

    type Mutation {
        createProduct(input: ProductInput): Product
        createUser(input: RegisterInput): ReturnedData
        saveCartToDB(input: String): ReturnedData
        loginUser(input: LoginInput): ReturnedData
        addProductToCart(productId: String, count: Int): Cart
    }
`);

module.exports = schema;
