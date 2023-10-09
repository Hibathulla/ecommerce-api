"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const errorController_1 = require("./controllers/errorController");
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sizeRoutes_1 = __importDefault(require("./routes/sizeRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const couponRoutes_1 = __importDefault(require("./routes/couponRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json({ limit: "10kb" }));
exports.app.use(express_1.default.static("public"));
exports.app.use((0, express_mongo_sanitize_1.default)());
exports.app.use((0, xss_clean_1.default)());
// app.use(hpp()); use this when implementing products
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)({
    credentials: true,
}));
console.log("Hello Node");
//Development logging
if (process.env.NODE_ENV === "development") {
    exports.app.use((0, morgan_1.default)("dev"));
}
exports.app.get("/hi", (req, res) => {
    res.status(200).json({
        message: "hello user",
    });
});
const limiter = (0, express_rate_limit_1.default)({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests. Please try again later",
});
//security
exports.app.use("/api", (0, helmet_1.default)());
// app.use("/api", limiter);
exports.app.use("/api/users", userRoutes_1.default);
exports.app.use("/api/product", productRoutes_1.default);
exports.app.use("/api/category", categoryRoutes_1.default);
exports.app.use("/api/review", reviewRoutes_1.default);
exports.app.use("/api/size", sizeRoutes_1.default);
exports.app.use("/api/coupon", couponRoutes_1.default);
exports.app.use("/api/image", imageRoutes_1.default);
exports.app.use("/api/location", locationRoutes_1.default);
exports.app.use("/api/settings", settingsRoutes_1.default);
exports.app.use("/api/payment", paymentRoutes_1.default);
exports.app.use("/api/order", orderRoutes_1.default);
exports.app.use(errorController_1.GlobalError);
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     "hello"
//   });
// });
//# sourceMappingURL=app.js.map