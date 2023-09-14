"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const settingsSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    storeName: {
        type: String,
        required: [true, "Please enter a store name"],
    },
    billboard: {
        type: String,
    },
    billboardLabel: {
        type: String,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.Settings = mongoose_1.default.model("Settings", settingsSchema);
//# sourceMappingURL=settingsModel.js.map