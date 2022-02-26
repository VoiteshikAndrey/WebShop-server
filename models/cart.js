const {Schema, model} =  require('mongoose');
const Product = require('./product');


const cartSchema = new Schema({
    productList: [{
        productId: {
            type: String
        },
        count: {
            type: Number,
            default: 1
        },
        characteristic: {
            type: String
        }
    }],
    totalPrice: {
        type: Number, 
        default: 0
    },
});

module.exports = model('Cart', cartSchema);