"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    paymentId: String,
    orderId: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ["success", "shipped", "delivered"],
        default: "success",
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    total: Number,
    discount: Number,
    products: [
        {
            name: String,
            category: String,
            size: String,
            id: mongoose_1.default.Schema?.Types?.ObjectId,
            images: [String],
            description: String,
            price: Number,
        },
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// orderSchema.pre(/^findById/, function (next) {
//   next();
// });
exports.Order = mongoose_1.default.model("Order", orderSchema);
//# sourceMappingURL=orderModel.js.map