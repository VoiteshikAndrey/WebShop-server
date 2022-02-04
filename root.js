const Product = require('./models/product');
const Cart = require('./models/cart');
const { stripComments } = require('config/parser');


const root = {
    getAllProducts: () => {
        return Product.find()
    },

    getProduct: async ({id}) => {
        console.log(id);
        const pr = await Product.findById(id);
        return pr; 
    },

    getProductPrice: ({id}) => {
        return Product.findById(id);
    },

    createProduct: ({input}) => {
        const product = new Product({
            productname: input.productname,
            productbrand: input.productbrand,
            price: input.price,
            category: input.category,
            images: input.images,
         });
        product.save();
        return product;
    },

    getCart: ({id}) => {
        console.log(id);
        return Cart.findById(id);
    },

    getImage: (imagePath) => {
        const fileName = './files/product-images' + imagePath;
        return send;
    },

    addProductToCart: async ({productId, count}) => {
        const cart = await Cart.findOneAndUpdate({_id: "61efcf05599eca673ae3cf24"},
         {$push: {productList: {productId: productId, count: count}}});
        return cart;
    },
}

module.exports = root;