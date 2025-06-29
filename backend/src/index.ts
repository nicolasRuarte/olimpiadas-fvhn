import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";

async function main(){
    try {
        await AppDataSource.initialize()
        console.log("Database intialized");
        app.listen(3000);
        console.log("Server up on port ", 3000);
    } catch (error) {
        console.error(error);
    }
}

main();
