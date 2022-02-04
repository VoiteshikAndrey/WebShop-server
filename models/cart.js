const {Schema, model} =  require('mongoose');
const Product = require('./product');


const cartSchema = new Schema({
    productList: [{
        productId: {type: String},
        count: {type: String, default: "1"}
    }],
});

module.exports = model('Cart', cartSchema);