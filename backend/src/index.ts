import "reflect-metadata";
import "module-alias/register";
import { AppDataSource } from "@root/db";
import app from "@root/app";
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
