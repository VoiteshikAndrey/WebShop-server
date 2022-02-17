const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const {checkValidData} = require('./middleware/checkValidDate');

const root = {
    getAllProducts: () => {
        return Product.find()
    },

    getProduct: async ({id}) => {
        console.log(id);
        const pr = await Product.findById(id);
        return pr; 
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

    createUser: async ({input}) => {
        const errors = await checkValidData(input);

        if (errors.length) {
            return {data: JSON.stringify(null), errors:JSON.stringify(errors)}
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);
        
        const user = new User({
            login: input.login,
            password: hashedPassword,
            userName: input.login,
        })

        await user.save();

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        return {data: JSON.stringify(user), errors:JSON.stringify(null)};
    },

    loginUser: async ({input}) => {
        console.log(input);
        const user = await User.findOne({login: input.login});
        const errors = await checkLoginData(input, user);
        console.log('Errors',errors);
        if (errors) {
            return {data: JSON.stringify(null), errors:JSON.stringify(errors)}
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        return {data: JSON.stringify(user), errors:JSON.stringify(null)};
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


const checkLoginData = async (input, user) => {
    const login = input.login;
    const password = input.password;
    
    if(!user) {
        return "User is not found";
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return 'Wrong password';
    }

    return;
}


const checkValidData = async (input, user) => {
    const login = input.login;
    const password = input.password;
    const confirmPassword = input.confirmPassword;

    errors = [];

    const candidate = await User.findOne({login: login});

    if(candidate){
        errors.push("Login already exists");
        return errors;
    }

    // if(data) {
    //     errors.push("Login already exists");
    //     return errors;
    // }

    message = checkLogin(login);
    if(message){
        errors.push(message);
    }
    message = checkPassword(password, confirmPassword);
    if(message){
        errors.push(message);
    }
    
    return errors
}

// let checkUniqueLogin = new Promise((resolve, reject) => {
//     const candidate = User.findOne({login: login});
//     resolve(candidate);
// })

const checkLogin = (login) => {
    message = '';
    if(!/^[a-zA-Z0-9]*$/.test(login)){
        message = "Login can contain only Latin letters and numbers";
    }
    else if(login.length < 8 || login.length > 30){
        message = "Login length must be from 8 to 30 characters";
    }
    
    return message;
}

const checkPassword = (password, confirmPassword) => {
    message = '';
    if(!/^[a-zA-Z0-9]*$/.test(password)){
        message = "Password can contain only Latin letters and numbers";
    }
    else if(password !== confirmPassword){
        message = "Password and confirmed password do not match";
    }
    else if(password.length < 8 || password.length > 20){
        message = "Password length must be from 8 to 20 characters";
    }
    return message
}

module.exports = root;