"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Locationschema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    loc: {
        type: {
            type: String,
        },
        coordinates: [],
    },
    radius: {
        type: "Number",
    },
});
Locationschema.index({
    loc: "2dsphere",
});
exports.Location = mongoose_1.default.model("Location", Locationschema);
//# sourceMappingURL=locationModel.js.map