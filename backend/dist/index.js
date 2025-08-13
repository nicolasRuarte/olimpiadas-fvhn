"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
<<<<<<< HEAD
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
=======
require("module-alias/register");
const app_1 = __importDefault(require("@root/app"));
const db_1 = require("@root/db");
const config_1 = require("@root/config");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.AppDataSource.initialize();
            console.log("Database intialized");
<<<<<<< HEAD
            app_1.default.listen(3000);
            console.log("Server up on port ", 3000);
=======
            app_1.default.listen(config_1.PORT || 4000);
            console.log("Server up on port ", config_1.PORT);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
