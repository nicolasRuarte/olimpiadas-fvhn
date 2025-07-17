import "reflect-metadata";
import "module-alias/register";
import app from "@root/app";
import { AppDataSource } from "@root/db";
import { PORT } from "@root/config";


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
