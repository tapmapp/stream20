import assert from 'assert';
import MongoClient from 'mongodb';

export default class MongoDBClient {

    // MONGO DB
    url = 'mongodb://localhost:27017';

    // Database Name
    dbName = 'Stream20';

    client: MongoClient;

    constructor() {
        // Create a new MongoClient
        this.client = new MongoClient(this.url);
    }


    connectDB() {
        // Use connect method to connect to the Server
        this.client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
        
            const db = this.client.db(this.dbName);
    
            this.client.close();
        });
    
    };

}