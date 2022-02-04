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
        count: String
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
        addProductToCart(productId: String, count: String): Cart
    }
`);

module.exports = schema;
