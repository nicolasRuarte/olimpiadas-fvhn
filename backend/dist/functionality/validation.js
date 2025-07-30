"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumberId = validateNumberId;
exports.validateStringId = validateStringId;
exports.validateUserData = validateUserData;
const v = __importStar(require("valibot"));
const messages = {
    string: "debe ser un string",
    nonEmpty: "debe ingresar el dato",
    minLength: "longitud debe ser de mínimo 8 caracteres",
    length: "debe tener longitud de 8 caracteres"
};
const dniLength = 8;
const passwordMinLength = 8;
const phoneNumberLength = 10;
const userLoginSchema = v.object({
    dni: v.pipe(v.string(messages.string), v.nonEmpty(), v.length(dniLength)),
    surname: v.pipe(v.string(messages.string)),
    names: v.pipe(v.string(messages.string), v.nonEmpty()),
    email: v.pipe(v.string(messages.string), v.email(), v.nonEmpty(messages.nonEmpty)),
    password: v.pipe(v.string(messages.string), v.nonEmpty(), v.minLength(passwordMinLength, messages.minLength)),
    phone_number: v.pipe(v.string(messages.string), v.nonEmpty(messages.nonEmpty), v.length(phoneNumberLength, messages.length))
});
function validateNumberId(id) {
    if (id === undefined || id === null || typeof id !== "number") {
        return false;
    }
    else {
        return true;
    }
}
function validateStringId(id) {
    if (id === undefined || id === null || typeof id !== "string") {
        return false;
    }
    else {
        return true;
    }
}
function validateUserData(loginData) {
    return v.parse(userLoginSchema, loginData);
}
