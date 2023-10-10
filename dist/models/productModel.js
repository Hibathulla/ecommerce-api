"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "A product must have a name"],
        trim: true, // exclude the white spaces
    },
    price: {
        type: Number,
        required: [true, "A product must have a price"],
    },
    discountPrice: {
        type: Number,
        // validate: {
        //   validator: function (val) {
        //     // console.log(val, pr, "val");
        //     return val < (this as any).price;
        //   },
        //   message: "Discount price {VALUE} should be less than actual price",
        // },
    },
    description: {
        type: String,
    },
    slug: String,
    images: [String],
    category: String,
    size: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Size",
        },
    ],
    isFeatured: Boolean,
    outOfStock: Boolean,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// productSchema.pre("validate", function (next) {
//   if (this.discountPrice! > this.price) {
//     this.invalidate(
//       "discountPrice",
//       `Discount price ${this.discountPrice!} should be less than actual price ${
//         this.price
//       }`,
//       this.price
//     );
//   }
//   next();
// });
// virtual properties
productSchema?.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this?.name, { lower: true, trim: true });
    next();
});
productSchema?.pre(/^find/, function (next) {
    this.populate({
        path: "size",
        select: "category billboard billboardLabel name value",
    });
    next();
});
productSchema?.pre(/^find/, function (next) {
    console.log(this.category, "cat");
    next();
});
exports.Product = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=productModel.js.map