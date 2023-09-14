"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSettings = exports.getSettingsDetail = exports.updateSettingsDetail = exports.createSettingsDetail = void 0;
const settingsModel_1 = require("../models/settingsModel");
const handlerFactory_1 = require("./handlerFactory");
exports.createSettingsDetail = (0, handlerFactory_1.CreateOne)(settingsModel_1.Settings, "settings");
exports.updateSettingsDetail = (0, handlerFactory_1.UpdateOne)(settingsModel_1.Settings, "settings");
exports.getSettingsDetail = (0, handlerFactory_1.GetOne)(settingsModel_1.Settings, "settings");
exports.getAllSettings = (0, handlerFactory_1.GetAll)(settingsModel_1.Settings, "settings");
//# sourceMappingURL=settingsController.js.map