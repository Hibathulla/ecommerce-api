"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSize = exports.editSize = exports.createSize = exports.getSize = exports.getAllSizes = void 0;
const handlerFactory_1 = require("./handlerFactory");
const sizeModel_1 = require("../models/sizeModel");
exports.getAllSizes = (0, handlerFactory_1.GetAll)(sizeModel_1.Size, "size", "name");
exports.getSize = (0, handlerFactory_1.GetOne)(sizeModel_1.Size, "size");
exports.createSize = (0, handlerFactory_1.CreateOne)(sizeModel_1.Size, "size");
exports.editSize = (0, handlerFactory_1.UpdateOne)(sizeModel_1.Size, "size");
exports.deleteSize = (0, handlerFactory_1.DeleteOne)(sizeModel_1.Size, "size");
//# sourceMappingURL=sizeController.js.map