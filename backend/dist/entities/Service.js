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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const Rating_1 = require("./Rating");
<<<<<<< HEAD
=======
const class_validator_1 = require("class-validator");
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
let Service = class Service extends typeorm_1.BaseEntity {
};
exports.Service = Service;
__decorate([
<<<<<<< HEAD
    (0, typeorm_1.PrimaryColumn)(),
=======
    (0, typeorm_1.PrimaryGeneratedColumn)(),
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
<<<<<<< HEAD
=======
    (0, class_validator_1.IsString)(),
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
<<<<<<< HEAD
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
=======
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    (0, class_validator_1.IsInt)(),
>>>>>>> f50acc086a4f6d45916c379a0f63e53e12bd7c72
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rating_1.Rating, (rating) => rating.service),
    __metadata("design:type", Array)
], Service.prototype, "ratings", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)()
], Service);
