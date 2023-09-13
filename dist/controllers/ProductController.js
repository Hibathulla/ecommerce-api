"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = exports.getProduct = void 0;
const handlerFactory_1 = require("./handlerFactory");
const productModel_1 = require("../models/productModel");
exports.getProduct = (0, handlerFactory_1.GetOne)(productModel_1.Product, "product", {
    path: "size category",
    select: "category billboard billboardLabel name value",
});
exports.createProduct = (0, handlerFactory_1.CreateOne)(productModel_1.Product, "product", {
    path: "size category",
    select: "category billboard billboardLabel name value",
});
exports.getAllProducts = (0, handlerFactory_1.GetAll)(productModel_1.Product, "product", "name");
exports.updateProduct = (0, handlerFactory_1.UpdateOne)(productModel_1.Product, "product");
exports.deleteProduct = (0, handlerFactory_1.DeleteOne)(productModel_1.Product, "product");
//# sourceMappingURL=ProductController.js.map