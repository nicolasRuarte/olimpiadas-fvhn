"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rating_controllers_1 = require("@controllers/rating.controllers");
const router = (0, express_1.Router)();
// URL para hacer rating es /rating?uId=(id de usuario)&sId=(id de servicio)&r=(rating)
router.post("/rating", rating_controllers_1.createRating);
router.get("/rating", rating_controllers_1.readRatings);
router.put("/rating", rating_controllers_1.updateRating);
router.delete("/rating", rating_controllers_1.deleteRating);
exports.default = router;
