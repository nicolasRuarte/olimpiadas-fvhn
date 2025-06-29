"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const OrderDetail_1 = require("./OrderDetail");
const Rating_1 = require("./Rating");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "names", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Order_1.Order, (order) => order.dni),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Order_1.Order)
], User.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderDetail_1.OrderDetail, (orderDetail) => orderDetail.user),
    __metadata("design:type", Array)
], User.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rating_1.Rating, (rating) => rating.user),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
