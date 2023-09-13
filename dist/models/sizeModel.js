"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sizeSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    name: {
        type: String,
        required: [true, "A size must have a name"],
        trim: true,
        unique: true,
    },
    value: {
        type: String,
        required: [true, "A size must have a value"],
        trim: true, // exclude the white spaces
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.Size = mongoose_1.default.model("Size", sizeSchema);
//# sourceMappingURL=sizeModel.js.map