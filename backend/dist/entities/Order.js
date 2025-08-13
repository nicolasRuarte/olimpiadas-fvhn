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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
<<<<<<< HEAD
const User_1 = require("./User");
=======
const Service_1 = require("./Service");
const class_validator_1 = require("class-validator");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
let Order = class Order extends typeorm_1.BaseEntity {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
<<<<<<< HEAD
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.order),
    __metadata("design:type", String)
], Order.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
=======
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Service_1.Service),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
