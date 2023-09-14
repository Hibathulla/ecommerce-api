"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.createOrder = exports.getAllOrders = void 0;
const orderModel_1 = require("../models/orderModel");
const handlerFactory_1 = require("./handlerFactory");
exports.getAllOrders = (0, handlerFactory_1.GetAll)(orderModel_1.Order, "order", "name");
exports.createOrder = (0, handlerFactory_1.CreateOne)(orderModel_1.Order, "order");
exports.getOrder = (0, handlerFactory_1.GetOne)(orderModel_1.Order, "order", { path: "user" });
//# sourceMappingURL=orderController.js.map