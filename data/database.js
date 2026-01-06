const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
 const client = await MongoClient.connect('mongodb://127.0.0.1:27018');
 database = client.db('online-shop');
 //with connect, we connect to a MongoDB server - NOT to a single database.
 //That happens with help of the db method.
 //This establishes a connection to a specific database on the server
}


function getDb(){
    if (!database){
        throw new Error('You must connect first'); 
        //Error is a build-in class in Javascript
        //MDN: The Error() constructor creates Error objects
        //The throw statement throws a user-defined exception. 
        //Execution of the current function will stop (the statements after throw won't be executed), 
        // and control will be passed to the first catch block in the call stack. 
        // If no catch block exists among caller functions, the program will terminate.
    }
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};