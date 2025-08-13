import "reflect-metadata";
<<<<<<< HEAD
import app from "./app";
import { AppDataSource } from "./db";
import { PORT } from "./config";
=======
import "module-alias/register";
import app from "@root/app";
import { AppDataSource } from "@root/db";
import { PORT } from "@root/config";

>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72

async function main(){
    try {
        await AppDataSource.initialize()
        console.log("Database intialized");
        app.listen(PORT || 4000);
        console.log("Server up on port ", PORT);
    } catch (error) {
        console.error(error);
    }
}

main();
