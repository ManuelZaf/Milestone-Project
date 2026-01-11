const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore(){
    const MongoDBStore =  mongoDbStore(expressSession);
    //instead of session as a parameter value, we use this imported
    //expressSession package here. Because that is the session provider, which we will use
    // for creating a session later

    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27018',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig(){
    return{
secret:'super-secret', //as an example, it should be longer and random
resave: false,
saveUninitialized: false,
store: createSessionStore(),
cookie:{
    maxAge: 2 * 24 * 60 * 60 * 1000
}
    };
}

module.exports = createSessionConfig;