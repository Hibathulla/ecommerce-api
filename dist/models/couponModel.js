"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    couponCode: {
        type: String,
        required: [true, "A coupon must have a code"],
        trim: true,
        unique: true,
    },
    discountType: {
        type: String,
        enum: ["percentage", "flat"],
    },
    value: Number,
});
exports.Coupon = mongoose_1.default.model("Coupon", couponSchema);
//# sourceMappingURL=couponModel.js.map