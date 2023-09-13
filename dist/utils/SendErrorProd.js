"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorProd = void 0;
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!💥",
        });
    }
};
exports.sendErrorProd = sendErrorProd;
//# sourceMappingURL=SendErrorProd.js.map