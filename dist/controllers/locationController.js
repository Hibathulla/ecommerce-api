"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocation = void 0;
const locationModel_1 = require("../models/locationModel");
const handlerFactory_1 = require("./handlerFactory");
exports.createLocation = (0, handlerFactory_1.CreateOne)(locationModel_1.Location, "location");
//# sourceMappingURL=locationController.js.map