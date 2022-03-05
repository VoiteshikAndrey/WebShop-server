const express  = require('express');
const config = require('config');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors');
const schema = require('./schema')
const root = require('./root');
const jwt = require('jsonwebtoken');
const helmet = require("helmet");

const app = express();

app.set('views', './public');
app.use(express.static(__dirname + '/public'));
app.get('/*', (req, res) => {
    res.sendFile('./public/index.html', {root: __dirname});
});

app.use(cors());
app.use(helmet());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
})) 

const PORT = config.get('port') || 3000;

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {

        });
        app.listen(PORT);
        console.log(`Server started on port:${PORT}`);

    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

module.exports = app;