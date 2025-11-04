import { createPool } from 'mysql2/promise';

export async function connect() {

    const connection = await createPool({
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'bc4c3bce367ad2',
        password: '86f4f379',
        database: 'heroku_bbe604a93c2e2cf',
        connectionLimit: 10
    });
    
    return connection;

}