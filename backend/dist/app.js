"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
<<<<<<< HEAD
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(user_routes_1.default);
=======
const user_routes_1 = __importDefault(require("@routes/user.routes"));
const service_routes_1 = __importDefault(require("@routes/service.routes"));
const order_routes_1 = __importDefault(require("@routes/order.routes"));
const orderdetail_routes_1 = __importDefault(require("@routes/orderdetail.routes"));
const rating_routes_1 = __importDefault(require("@routes/rating.routes"));
const admin_routes_1 = __importDefault(require("@routes/admin.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const payment_routes_1 = __importDefault(require("@routes/payment.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(user_routes_1.default);
app.use(service_routes_1.default);
app.use(order_routes_1.default);
app.use(orderdetail_routes_1.default);
app.use(rating_routes_1.default);
app.use(admin_routes_1.default);
app.use(payment_routes_1.default);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
exports.default = app;
