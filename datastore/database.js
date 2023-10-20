import mongoose from "mongoose";

class Database {
    static connectDatabase(app) {
        const environment = app.get("env");
        let dbUrl;
        if (environment === "development") {
            dbUrl = process.env.LOCAL_DATABASE_URL;
        } else {
            dbUrl = process.env.REMOTE_DATABASE_URL;
        }
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const connection = mongoose.connection;
        connection.on('error', () => {
            console.error("Database connection error");
        })
        connection.once('open', () => {
            console.log(`Database connected in ${environment} mode`);
        });
        return connection;
    }
}

export default Database; 