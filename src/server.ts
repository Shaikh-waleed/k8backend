import dotenv from 'dotenv';
import http from 'http'
import MongoDBConnection from './utils/database';
import App from './app';

const init = async () => {
    dotenv.config();
    
    const port = process.env.PORT || 4000;
    const connectionURL = `${process.env.URL}?retryWrites=true&w=majority`
    const db = new MongoDBConnection()
    await db.connectDatabase(connectionURL)

    const app = new App()
    app.configureApp()

    const server = http.createServer(app.instance)
    server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })

}

init()