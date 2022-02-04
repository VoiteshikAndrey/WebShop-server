const {Schema, model} =  require('mongoose');

const productSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    productbrand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    images: {type: [String]}
});

module.exports = model('Product', productSchema);