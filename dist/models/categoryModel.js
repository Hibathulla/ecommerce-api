"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: String,
        required: [true, "A category must have a name"],
        trim: true,
        unique: true,
    },
    billboard: String,
    billboardLabel: String,
    slug: String,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
categorySchema?.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this?.category, { lower: true, trim: true });
    next();
});
exports.Category = mongoose_1.default.model("Category", categorySchema);
//# sourceMappingURL=categoryModel.js.map