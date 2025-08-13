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
exports.OrderDetail = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
<<<<<<< HEAD
=======
const Service_1 = require("./Service");
const class_validator_1 = require("class-validator");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
let OrderDetail = class OrderDetail extends typeorm_1.BaseEntity {
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderDetail.prototype, "order_number", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
<<<<<<< HEAD
    __metadata("design:type", Date)
], OrderDetail.prototype, "emittedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetail.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orderDetails),
    __metadata("design:type", User_1.User)
], OrderDetail.prototype, "user", void 0);
=======
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OrderDetail.prototype, "emittedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orderDetails),
    __metadata("design:type", User_1.User)
], OrderDetail.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Service_1.Service),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], OrderDetail.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDetail.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "pending" }),
    __metadata("design:type", String)
], OrderDetail.prototype, "status", void 0);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
exports.OrderDetail = OrderDetail = __decorate([
    (0, typeorm_1.Entity)()
], OrderDetail);
