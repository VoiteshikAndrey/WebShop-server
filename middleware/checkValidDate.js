const User = require('../models/user');

const checkValidData = async (input) => {
    const login = input.login;
    const password = input.password;
    const confirmPassword = input.confirmPassword;
    const candidate = await User.findOne({login: login});
    
    errors = [];

    if(candidate) {
        errors.push("Login already exists");
        return errors;
    }

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


module.export = checkValidData;