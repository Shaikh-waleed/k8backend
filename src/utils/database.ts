import { connect, set } from 'mongoose';


interface DatabaseConnection {
    connectDatabase(connectionURL: string, dbName: string, options?: object): void
}

export default class MongoDBConnection implements DatabaseConnection {

    private options = {
        useNewUrlParser: true,
        autoIndex: true,
    }

    async connectDatabase(connectionURL: string): Promise<void> {
        try {
            set('strictQuery', true)
            await connect(connectionURL, this.options);
            console.info("✔️ MongoDb Database Safely Connected DB URL => " + connectionURL);

        } catch (error) {
            console.error("❗️ Could not connect to mongodb database...", error);
            process.exit();
        }
    }
}