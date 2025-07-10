"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERNAME = exports.PASSWORD = exports.HOST = exports.DB_URL = exports.DB_PORT = exports.DB_NAME = void 0;
_a = process.env, _b = _a.DB_NAME, exports.DB_NAME = _b === void 0 ? "pagina_vuelos" : _b, _c = _a.DB_PORT, exports.DB_PORT = _c === void 0 ? 5432 : _c, _d = _a.DB_URL, exports.DB_URL = _d === void 0 ? "postgresql://prod:iup5zsU2s3kEljJaN6mAbOvaSgwv65wf@dpg-d1j9vg2li9vc739ie1sg-a.oregon-postgres.render.com/pagina_vuelos" : _d, _e = _a.HOST, exports.HOST = _e === void 0 ? "localhost" : _e, _f = _a.PASSWORD, exports.PASSWORD = _f === void 0 ? "admin" : _f, _g = _a.USERNAME, exports.USERNAME = _g === void 0 ? "postgres" : _g;
