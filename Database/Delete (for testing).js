const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://Shaked:shaked123@serversidecoursecluster.1hljluk.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true });

delete_db = async () => {
    try {
        await client.connect();
        const db = client.db("Main");
        await db.dropDatabase();
        console.log('Deleted main db');
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
};
delete_db();