"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MERCADOPAGO_ACCESS_TOKEN = exports.PORT = exports.SALT_ROUNDS = exports.JWT_SECRET = void 0;
_a = process.env, _b = _a.JWT_SECRET, exports.JWT_SECRET = _b === void 0 ? "$wFP8Yc6j5T#9mdXukpNkFud4syaCF!mFjg8N4" : _b, _c = _a.SALT_ROUNDS, exports.SALT_ROUNDS = _c === void 0 ? 10 : _c, _d = _a.PORT, exports.PORT = _d === void 0 ? 3000 : _d, _e = _a.MERCADOPAGO_ACCESS_TOKEN, exports.MERCADOPAGO_ACCESS_TOKEN = _e === void 0 ? "APP_USR-5492280917637116-070310-6a377b39f5ed203f388ada56e98efe3e-1219752495" : _e;
